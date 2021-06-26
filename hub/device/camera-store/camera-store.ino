//local header
#include "camerawifi.h";
#include "cameraconfig.h";
#include "SDcard.h";

//
// Writes an uint32_t in Big Endian at current file position
//
static void inline print_quartet(unsigned long i, FILE *fd){
    uint8_t x[1];

    x[0] = i % 0x100;
    size_t i1_err = fwrite(x, 1, 1, fd);
    i = i >> 8;
    x[0] = i % 0x100;
    size_t i2_err = fwrite(x, 1, 1, fd);
    i = i >> 8;
    x[0] = i % 0x100;
    size_t i3_err = fwrite(x, 1, 1, fd);
    i = i >> 8;
    x[0] = i % 0x100;
    size_t i4_err = fwrite(x, 1, 1, fd);
}

void startCameraServer();
httpd_handle_t camera_httpd = NULL;

char the_page[3000];
char localip[20];

void setup() {
  //WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); //disable brownout detector  // creates other problems

  Serial.begin(115200);

  Serial.setDebugOutput(true);
  
  print_local_address();

  pinMode(33, OUTPUT);    // little red led on back of chip

  digitalWrite(33, LOW);           // turn on the red LED on the back of chip
  
  if (init_wifi())
  { // Connected to WiFi
    internet_connected = true;
    Serial.println("Internet connected");
    init_time();
    time(&now);
    //setenv("TZ", "GMT0BST,M3.5.0/01,M10.5.0/02", 1);
    // zzz
    setenv("TZ", "MST7MDT,M3.2.0/2:00:00,M11.1.0/2:00:00", 1); // mountain time zone
    tzset();
  }

  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  //init with high specs to pre-allocate larger buffers
  if (psramFound())
  {
    config.frame_size = FRAMESIZE_UXGA;
    config.jpeg_quality = 1;
    config.fb_count = 2;
  }
  else
  {
    config.frame_size = FRAMESIZE_SVGA; // svga 12 fails due to jpg 60000
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

  // camera init
  // config 추가
  cam_err = esp_camera_init(&config);
  if (cam_err != ESP_OK)
  {
    Serial.printf("Camera init failed with error 0x%x", cam_err);
    major_fail();
    return;
  }

  // SD camera init
  card_err = init_sdcard();
  if (card_err != ESP_OK)
  {
    Serial.printf("SD Card init failed with error 0x%x", card_err);
    major_fail();
    return;
  }

  // 200 ms x 150 frames = 30 seconds     is 3 MB indoors
  // 200 ms x 300 frames = 1 minute       is about 6MD indoor
  // 20 ms x 3000 frames = 10 minute      is 60 MB indoor
  // burst 1000 frames gives 8 fps rather than 5, so 2 minutues 20 MB indoor

  startCameraServer();

  Serial.print("Camera Ready! Use 'http://");
  Serial.print(WiFi.localIP());
  Serial.println("' to connect");

  sprintf(localip, "%s", WiFi.localIP().toString().c_str());
  Serial.print("localip ");
  Serial.println(localip);

  // zzz username and password for ftp server

  ftpSrv.begin("esp", "esp");
  digitalWrite(33, HIGH);

  //
  //  startup defaults  -- EDIT HERE
  //  zzz

  sensor_t *s = esp_camera_sensor_get();
  s->set_framesize(s, FRAMESIZE_VGA);
  s->set_quality(s, 10);
  do_fb(); // do a couple captures to make sure camera has new config
  do_fb();

  framesize = 6; // vga
  repeat = 100;  // 100 videos
  xspeed = 1;    // playback at 1 x realtime
  gray = 0;      // not gray

  quality = 10;           // quality 10 - pretty good.  Goes from 0..63, but 0-5 sometimes fails on bright scenery (jpg too big for ESP32CAM system)
  capture_interval = 200; // 200 milli-secconds per frame
  total_frames = 9000;    // 9000 frames x 200 ms = 1800 sec = 30 min

  xlength = total_frames * capture_interval / 1000;

  newfile = 0;   // no file is open  // don't fiddle with this!
  recording = 1; // start recording on reboot without sending a command
}

//
// if we have no camera, or sd card, then flash rear led on and off to warn the human SOS - SOS
//
// 카메라 or SD card 등이 연결되지 않음을 감지하면 major_fail 상태로 돌입(깜빡거리는 신호)
void major_fail()
{
  while (1)
  {
    digitalWrite(33, LOW);
    delay(500);
    digitalWrite(33, HIGH);
    delay(500);
  }
}

void init_time()
{

  sntp_setoperatingmode(SNTP_OPMODE_POLL);
  sntp_setservername(0, "pool.ntp.org");
  sntp_setservername(1, "time.windows.com");
  sntp_setservername(2, "time.nist.gov");

  sntp_init();

  // wait for time to be set
  // 현재 오류가 나는 부분
  time_t now = 0;
  timeinfo = {0};
  int retry = 0;
  const int retry_count = 10;
  while (timeinfo.tm_year < (2016 - 1900) && ++retry < retry_count)
  {
    Serial.printf("Waiting for system time to be set... (%d/%d) -- %d\n", retry, retry_count, timeinfo.tm_year);
    delay(2000);
    time(&now);
    localtime_r(&now, &timeinfo);
  }

  if (timeinfo.tm_year < (2016 - 1900))
  {
    major_fail();
  }
}

//////////////////////////////////////////////////////////////
// save photo stuff not currently used

//사진을 캡쳐해서 저장
static esp_err_t save_photo_numbered()
{
  file_number++;
  Serial.print("Taking picture: ");
  Serial.print(file_number);
  camera_fb_t *fb = esp_camera_fb_get();

  char *filename = (char *)malloc(21 + sizeof(int));
  sprintf(filename, "/sdcard/capture_%d.jpg", file_number);

  Serial.println(filename);
  FILE *file = fopen(filename, "w");
  if (file != NULL)
  {
    size_t err = fwrite(fb->buf, 1, fb->len, file);
    Serial.printf("File saved: %s\n", filename);
  }
  else
  {
    Serial.println("Could not open file");
  }
  fclose(file);
  esp_camera_fb_return(fb);
  free(filename);
}

//사진을 찍은 일시 저장
static esp_err_t save_photo_dated()
{
  Serial.println("Taking a picture...");
  camera_fb_t *fb = esp_camera_fb_get();

  time(&now);
  localtime_r(&now, &timeinfo);
  strftime(strftime_buf, sizeof(strftime_buf), "%F__%H%M%S", &timeinfo);

  char fname[100];

  if (framesize == 6)
  {
    sprintf(fname, "/sdcard/%s_vga_%d.jpg", strftime_buf, quality);
  }
  else if (framesize == 7)
  {
    sprintf(fname, "/sdcard/%s_svga_%d.jpg", strftime_buf, quality);
  }
  else if (framesize == 10)
  {
    sprintf(fname, "/sdcard/%s_uxga_%d.jpg", strftime_buf, quality);
  }
  else if (framesize == 5)
  {
    sprintf(fname, "/sdcard/%s_cif_%d.jpg", strftime_buf, quality);
  }
  else
  {
    Serial.println("Wrong framesize");
    sprintf(fname, "/sdcard/%s_xxx_%d.jpg", strftime_buf, quality);
  }

  FILE *file = fopen(fname, "w");
  if (file != NULL)
  {
    size_t err = fwrite(fb->buf, 1, fb->len, file);
    Serial.printf("File saved: %s\n", fname);
  }
  else
  {
    Serial.println("Could not open file");
  }
  fclose(file);
  esp_camera_fb_return(fb);
}

//위의 두 함수를 이용해 사진을 동시 저장
void save_photo()
{
  if (timeinfo.tm_year < (2016 - 1900) || internet_connected == false)
  {                        // if no internet or time not set
    save_photo_numbered(); // filenames in numbered order
  }
  else
  {
    save_photo_dated(); // filenames with date and time
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// Make the avi move in 4 pieces
//
// make_avi() called in every loop, which calls below, depending on conditions
//   start_avi() - open the file and write headers
//   another_pic_avi() - write one more frame of movie
//   end_avi() - write the final parameters and close the file

// global variable used by these pieces

char str[20];
uint16_t n;
uint8_t buf[BUFFSIZE];

static int i = 0;
uint8_t temp = 0, temp_last = 0;
unsigned long fileposition = 0;
uint16_t frame_cnt = 0;
uint16_t remnant = 0;
uint32_t length = 0;
uint32_t startms;
uint32_t elapsedms;
uint32_t uVideoLen = 0;
bool is_header = false;
long bigdelta = 0;

camera_fb_t *fb = NULL;

FILE *avifile = NULL;
FILE *idxfile = NULL;

void make_avi()
{

  // we are recording, but no file is open

  if (newfile == 0 && recording == 1)
  { // open the file: recording 신호가 들어오면 start_avi 함수를 실행시킴

    //save_photo_dated();

    start_avi();

    digitalWrite(33, HIGH);
    newfile = 1;
    totalp = 0;
    totalw = 0;
    frame_cnt = 0;
    frames_so_far = 0;
  }
  else
  {

    // we have a file open, but not recording

    if (newfile == 1 && recording == 0)
    { // got command to close file: reconrding=0이면 녹화를 종료
      digitalWrite(33, LOW);

      end_avi();

      Serial.println("Done capture due to command");

      frames_so_far = total_frames;

      newfile = 0;   // file is closed
      recording = 0; // DO NOT start another recording
    }
    else
    {

      if (newfile == 1 && recording == 1)
      { // regular recording

        if (frames_so_far == total_frames)
        { // we are done the recording

          Serial.println("Done capture for total frames!");

          digitalWrite(33, LOW); // close the file
          end_avi();

          frames_so_far = 0;
          newfile = 0; // file is closed

          if (repeat > 0)
          {
            recording = 1; // start another recording
            repeat = repeat - 1;
          }
          else
          {
            recording = 0;
          }
        }
        else if ((millis() - startms) > (total_frames * capture_interval))
        {

          Serial.println(" ");
          Serial.println("Done capture for time");
          Serial.print("Time Elapsed: ");
          Serial.print(millis() - startms);
          Serial.print(" Frames: ");
          Serial.println(frame_cnt);
          Serial.print("Config:       ");
          Serial.print(total_frames * capture_interval);
          Serial.print(" (");
          Serial.print(total_frames);
          Serial.print(" x ");
          Serial.print(capture_interval);
          Serial.println(")");

          digitalWrite(33, LOW); // close the file

          end_avi();

          frames_so_far = 0;
          newfile = 0; // file is closed
          if (repeat > 0)
          {
            recording = 1; // start another recording
            repeat = repeat - 1;
          }
          else
          {
            recording = 0;
          }
        }
        else
        { // regular

          current_millis = millis();

          if (current_millis - last_capture_millis > capture_interval)
          { // Take another picture - fixed interval

            //if ((current_millis - startms) > (frame_cnt * capture_interval)) {                   // Take another picture - with catch up

            last_capture_millis = millis();

            frames_so_far = frames_so_far + 1;
            frame_cnt++;
          }
        }
      }
    }
  }
}

static esp_err_t start_avi()
{

  //Serial.println("Starting an avi ");

  do_fb(); // start the camera ... warm it up
  delay(1000);
  do_fb();
  delay(1000);
  do_fb();

  time(&now);
  localtime_r(&now, &timeinfo);

  strftime(strftime_buf, sizeof(strftime_buf), "%F__%H-%M-%S", &timeinfo);

  char fname[100];

  if (framesize == 6)
  {
    sprintf(fname, "/sdcard/%s_vga_Q%d_I%d_L%d_S%d.avi", strftime_buf, quality, capture_interval, xlength, xspeed);
  }
  else if (framesize == 7)
  {
    sprintf(fname, "/sdcard/%s_svga_Q%d_I%d_L%d_S%d.avi", strftime_buf, quality, capture_interval, xlength, xspeed);
  }
  else if (framesize == 10)
  {
    sprintf(fname, "/sdcard/%s_uxga_Q%d_I%d_L%d_S%d.avi", strftime_buf, quality, capture_interval, xlength, xspeed);
  }
  else if (framesize == 5)
  {
    sprintf(fname, "/sdcard/%s_cif_Q%d_I%d_L%d_S%d.avi", strftime_buf, quality, capture_interval, xlength, xspeed);
  }
  else
  {
    Serial.println("Wrong framesize");
    sprintf(fname, "/sdcard/%s_xxx_Q%d_I%d_L%d_S%d.avi", strftime_buf, quality, capture_interval, xlength, xspeed);
  }

  Serial.print("\nFile name will be >");
  Serial.print(fname);
  Serial.println("<");

  avifile = fopen(fname, "w");
  idxfile = fopen("/sdcard/idx.tmp", "w");

  if (avifile != NULL)
  {

    //Serial.printf("File open: %s\n", fname);
  }
  else
  {
    Serial.println("Could not open file");
    major_fail();
  }

  if (idxfile != NULL)
  {

    //Serial.printf("File open: %s\n", "/sdcard/idx.tmp");
  }
  else
  {
    Serial.println("Could not open file");
    major_fail();
  }

  // -- open large file and initialize  -- doesn't help much

  //fseek(avifile, 1 * 1024 * 1024, SEEK_SET);              // start with 1 MB file
  //size_t ze_err = fwrite(zero_buf, 1, 4, avifile);
  //fseek(avifile, 0, SEEK_SET);

  for (i = 0; i < AVIOFFSET; i++)
  {
    char ch = pgm_read_byte(&avi_header[i]);
    buf[i] = ch;
  }

  size_t err = fwrite(buf, 1, AVIOFFSET, avifile);

  if (framesize == 6)
  {

    fseek(avifile, 0x40, SEEK_SET);
    err = fwrite(vga_w, 1, 2, avifile);
    fseek(avifile, 0xA8, SEEK_SET);
    err = fwrite(vga_w, 1, 2, avifile);
    fseek(avifile, 0x44, SEEK_SET);
    err = fwrite(vga_h, 1, 2, avifile);
    fseek(avifile, 0xAC, SEEK_SET);
    err = fwrite(vga_h, 1, 2, avifile);
  }
  else if (framesize == 10)
  {

    fseek(avifile, 0x40, SEEK_SET);
    err = fwrite(uxga_w, 1, 2, avifile);
    fseek(avifile, 0xA8, SEEK_SET);
    err = fwrite(uxga_w, 1, 2, avifile);
    fseek(avifile, 0x44, SEEK_SET);
    err = fwrite(uxga_h, 1, 2, avifile);
    fseek(avifile, 0xAC, SEEK_SET);
    err = fwrite(uxga_h, 1, 2, avifile);
  }
  else if (framesize == 7)
  {

    fseek(avifile, 0x40, SEEK_SET);
    err = fwrite(svga_w, 1, 2, avifile);
    fseek(avifile, 0xA8, SEEK_SET);
    err = fwrite(svga_w, 1, 2, avifile);
    fseek(avifile, 0x44, SEEK_SET);
    err = fwrite(svga_h, 1, 2, avifile);
    fseek(avifile, 0xAC, SEEK_SET);
    err = fwrite(svga_h, 1, 2, avifile);
  }
  else if (framesize == 5)
  {

    fseek(avifile, 0x40, SEEK_SET);
    err = fwrite(cif_w, 1, 2, avifile);
    fseek(avifile, 0xA8, SEEK_SET);
    err = fwrite(cif_w, 1, 2, avifile);
    fseek(avifile, 0x44, SEEK_SET);
    err = fwrite(cif_h, 1, 2, avifile);
    fseek(avifile, 0xAC, SEEK_SET);
    err = fwrite(cif_h, 1, 2, avifile);
  }

  fseek(avifile, AVIOFFSET, SEEK_SET);

  Serial.print(F("\nRecording "));
  Serial.print(total_frames);
  Serial.println(F(" video frames ...\n"));

  startms = millis();
  bigdelta = millis();
  totalp = 0;
  totalw = 0;
  overtime_count = 0;
  jpeg_size = 0;
  movi_size = 0;
  uVideoLen = 0;
  idx_offset = 4;

} // end of start avi

/////another_pic_avi 삭제

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

static esp_err_t end_avi()
{

  unsigned long current_end = 0;

  current_end = ftell(avifile);

  Serial.println("End of avi - closing the files");

  elapsedms = millis() - startms;
  float fRealFPS = (1000.0f * (float)frame_cnt) / ((float)elapsedms) * xspeed;
  float fmicroseconds_per_frame = 1000000.0f / fRealFPS;
  uint8_t iAttainedFPS = round(fRealFPS);
  uint32_t us_per_frame = round(fmicroseconds_per_frame);

  //Modify the MJPEG header from the beginning of the file, overwriting various placeholders

  fseek(avifile, 4, SEEK_SET);
  print_quartet(movi_size + 240 + 16 * frame_cnt + 8 * frame_cnt, avifile);

  fseek(avifile, 0x20, SEEK_SET);
  print_quartet(us_per_frame, avifile);

  unsigned long max_bytes_per_sec = movi_size * iAttainedFPS / frame_cnt;

  fseek(avifile, 0x24, SEEK_SET);
  print_quartet(max_bytes_per_sec, avifile);

  fseek(avifile, 0x30, SEEK_SET);
  print_quartet(frame_cnt, avifile);

  fseek(avifile, 0x84, SEEK_SET);
  print_quartet((int)iAttainedFPS, avifile);

  fseek(avifile, 0xe8, SEEK_SET);

  print_quartet(movi_size + frame_cnt * 8 + 4, avifile);

  Serial.println(F("\n*** Video recorded and saved ***\n"));
  Serial.print(F("Recorded "));
  Serial.print(elapsedms / 1000);
  Serial.print(F("s in "));
  Serial.print(frame_cnt);
  Serial.print(F(" frames\nFile size is "));
  Serial.print(movi_size + 12 * frame_cnt + 4);
  Serial.print(F(" bytes\nActual FPS is "));
  Serial.print(fRealFPS, 2);
  Serial.print(F("\nMax data rate is "));
  Serial.print(max_bytes_per_sec);
  Serial.print(F(" byte/s\nFrame duration is "));
  Serial.print(us_per_frame);
  Serial.println(F(" us"));
  Serial.print(F("Average frame length is "));
  Serial.print(uVideoLen / frame_cnt);
  Serial.println(F(" bytes"));
  Serial.print("Average picture time (ms) ");
  Serial.println(totalp / frame_cnt);
  Serial.print("Average write time (ms) ");
  Serial.println(totalw / frame_cnt);
  Serial.print("Frames 25%+ late % ");
  Serial.println(100.0 * overtime_count / frame_cnt, 1);

  Serial.println("Writing the index");

  fseek(avifile, current_end, SEEK_SET);

  fclose(idxfile);

  size_t i1_err = fwrite(idx1_buf, 1, 4, avifile);

  print_quartet(frame_cnt * 16, avifile);

  idxfile = fopen("/sdcard/idx.tmp", "r");

  if (idxfile != NULL)
  {

    //Serial.printf("File open: %s\n", "/sdcard/idx.tmp");
  }
  else
  {
    Serial.println("Could not open file");
    //major_fail();
  }

  char *AteBytes;
  AteBytes = (char *)malloc(8);

  for (int i = 0; i < frame_cnt; i++)
  {

    size_t res = fread(AteBytes, 1, 8, idxfile);
    size_t i1_err = fwrite(dc_buf, 1, 4, avifile);
    size_t i2_err = fwrite(zero_buf, 1, 4, avifile);
    size_t i3_err = fwrite(AteBytes, 1, 8, avifile);
  }

  free(AteBytes);

  fclose(idxfile);
  fclose(avifile);

  Serial.println("---");
  WiFi.printDiag(Serial);
  Serial.println("---");

  //do_time();
}

//~~~~~~~~~~~~~~~~~~
static esp_err_t do_fb()
{

  camera_fb_t *fb = esp_camera_fb_get();

  Serial.print("Pic, len=");
  Serial.println(fb->len);

  esp_camera_fb_return(fb);
}

////////////////////////////////////////////////////////////////////////////////////
//
// some globals for the loop()
//

//루프가 지속되면서 신호를 받으면 영상을 찍음
void loop()
{
  if (WiFi.status() != WL_CONNECTED)
  {
    init_wifi();
    Serial.println("***** WiFi reconnect *****");
  }

  ftpSrv.handleFTP();

  make_avi();
}

////////////////////////////////////////////////////////////////////////////////////
static esp_err_t capture_handler(httpd_req_t *req)
{

  camera_fb_t *fb = NULL;
  esp_err_t res = ESP_OK;
  char fname[100];

  fb = esp_camera_fb_get();
  if (!fb)
  {
    Serial.println("Camera capture failed");
    httpd_resp_send_500(req);
    return ESP_FAIL;
  }

  file_number++;

  sprintf(fname, "inline; filename=capture_%d.jpg", file_number);

  httpd_resp_set_type(req, "image/jpeg");
  httpd_resp_set_hdr(req, "Content-Disposition", fname);

  size_t out_len, out_width, out_height;
  size_t fb_len = 0;
  fb_len = fb->len;
  res = httpd_resp_send(req, (const char *)fb->buf, fb->len);
  esp_camera_fb_return(fb);

  return res;
}

////////////////////////////////////////////////////////////////////////////////////
static esp_err_t stop_handler(httpd_req_t *req)
{

  esp_err_t res = ESP_OK;

  recording = 0;
  Serial.println("stopping recording");

  do_stop("Stopping previous recording");

  httpd_resp_send(req, the_page, strlen(the_page));
  return ESP_OK;
}

////////////////////////////////////////////////////////////////////////////////////
static esp_err_t start_handler(httpd_req_t *req)
{

  esp_err_t res = ESP_OK;

  char buf[80];
  size_t buf_len;
  char new_res[20];

  if (recording == 1)
  {
    const char *resp = "You must Stop recording, before starting a new one.  Start over ...";
    httpd_resp_send(req, resp, strlen(resp));

    return ESP_OK;
    return res;
  }
  else
  {
    recording = 1;
    Serial.println("starting recording");

    sensor_t *s = esp_camera_sensor_get();

    int new_interval = capture_interval;
    int new_length = capture_interval * total_frames;

    int new_framesize = s->status.framesize;
    int new_quality = s->status.quality;
    int new_repeat = 0;
    int new_xspeed = 1;
    int new_xlength = 3;
    int new_gray = 0;

    Serial.println("");
    Serial.println("Current Parameters :");
    Serial.print("  Capture Interval = ");
    Serial.print(capture_interval);
    Serial.println(" ms");
    Serial.print("  Length = ");
    Serial.print(capture_interval * total_frames / 1000);
    Serial.println(" s");
    Serial.print("  Quality = ");
    Serial.println(new_quality);
    Serial.print("  Framesize = ");
    Serial.println(new_framesize);
    Serial.print("  Repeat = ");
    Serial.println(repeat);
    Serial.print("  Speed = ");
    Serial.println(xspeed);

    buf_len = httpd_req_get_url_query_len(req) + 1;
    if (buf_len > 1)
    {
      if (httpd_req_get_url_query_str(req, buf, buf_len) == ESP_OK)
      {
        ESP_LOGI(TAG, "Found URL query => %s", buf);
        char param[32];
        /* Get value of expected key from query string */
        Serial.println(" ... parameters");
        if (httpd_query_key_value(buf, "length", param, sizeof(param)) == ESP_OK)
        {

          int x = atoi(param);
          if (x > 1 && x <= 3600)
          {
            new_length = x;
          }

          ESP_LOGI(TAG, "Found URL query parameter => length=%s", param);
        }
        if (httpd_query_key_value(buf, "repeat", param, sizeof(param)) == ESP_OK)
        {
          int x = atoi(param);
          if (x >= 0)
          {
            new_repeat = x;
          }

          ESP_LOGI(TAG, "Found URL query parameter => repeat=%s", param);
        }
        if (httpd_query_key_value(buf, "framesize", new_res, sizeof(new_res)) == ESP_OK)
        {
          if (strcmp(new_res, "UXGA") == 0)
          {
            new_framesize = 10;
          }
          else if (strcmp(new_res, "SVGA") == 0)
          {
            new_framesize = 7;
          }
          else if (strcmp(new_res, "VGA") == 0)
          {
            new_framesize = 6;
          }
          else if (strcmp(new_res, "CIF") == 0)
          {
            new_framesize = 5;
          }
          else
          {
            Serial.println("Only UXGA, SVGA, VGA, and CIF are valid!");
          }
          ESP_LOGI(TAG, "Found URL query parameter => framesize=%s", new_res);
        }
        if (httpd_query_key_value(buf, "quality", param, sizeof(param)) == ESP_OK)
        {

          int x = atoi(param);
          if (x > 1 && x <= 50)
          {
            new_quality = x;
          }

          ESP_LOGI(TAG, "Found URL query parameter => quality=%s", param);
        }

        if (httpd_query_key_value(buf, "speed", param, sizeof(param)) == ESP_OK)
        {

          int x = atoi(param);
          if (x >= 1 && x <= 100)
          {
            new_xspeed = x;
          }

          ESP_LOGI(TAG, "Found URL query parameter => speed=%s", param);
        }

        if (httpd_query_key_value(buf, "gray", param, sizeof(param)) == ESP_OK)
        {

          int x = atoi(param);
          if (x == 1)
          {
            new_gray = x;
          }

          ESP_LOGI(TAG, "Found URL query parameter => gray=%s", param);
        }

        if (httpd_query_key_value(buf, "interval", param, sizeof(param)) == ESP_OK)
        {

          int x = atoi(param);
          if (x >= 1 && x <= 100000)
          {
            new_interval = x;
          }
          ESP_LOGI(TAG, "Found URL query parameter => interval=%s", param);
        }
      }
    }

    s->set_quality(s, new_quality);
    s->set_framesize(s, (framesize_t)new_framesize);
    if (new_gray == 1)
    {
      s->set_special_effect(s, 2); // 0 regular, 2 grayscale
    }
    else
    {
      s->set_special_effect(s, 0); // 0 regular, 2 grayscale
    }

    framesize = new_framesize;
    capture_interval = new_interval;
    xlength = new_length;
    total_frames = new_length * 1000 / capture_interval;
    repeat = new_repeat;
    quality = new_quality;
    xspeed = new_xspeed;
    gray = new_gray;

    do_fb();
    //delay(1000);
    do_fb(); // let camera warm up

    do_start("Starting a new AVI");
    httpd_resp_send(req, the_page, strlen(the_page));
    return ESP_OK;
  }
}

////////////////////////////////////////////////////////////////////////////////////
void do_start(char *the_message)
{

  Serial.print("do_start ");
  Serial.println(the_message);

  const char msg[] PROGMEM = R"rawliteral(<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ESP32-CAM Video Recorder</title>
</head>
<body>
<h1>ESP32-CAM Video Recorder v23</h1><br>
 <h2>Message is <font color="red">%s</font></h2><br>
 Recording = %d (1 is active)<br>
 Capture Interval = %d ms<br>
 Length = %d seconds<br>
 Quality = %d (5 best to 63 worst)<br>
 Framesize = %d (10 UXGA, 7 SVGA, 6 VGA, 5 CIF)<br>
 Repeat = %d<br>
 Speed = %d<br>
 Gray = %d<br><br>
<br>
<br><div id="image-container"></div>
</body>
</html>)rawliteral";

  sprintf(the_page, msg, the_message, recording, capture_interval, capture_interval * total_frames / 1000, quality, framesize, repeat, xspeed, gray);
  Serial.println(strlen(msg));

  //Serial.println(msg);
  //Serial.println(strlen(the_page));
  //Serial.println(the_page);
}

////////////////////////////////////////////////////////////////////////////////////
void do_stop(char *the_message)
{

  Serial.print("do_stop ");
  Serial.println(the_message);

  const char msg[] PROGMEM = R"rawliteral(<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ESP32-CAM Video Recorder</title>
</head>
<body>
<h1>ESP32-CAM Video Recorder v23</h1><br>
 <h2>Message is <font color="red">%s</font></h2><br>
 <h2><a href="http://%s/">http://%s/</a></h2><br>
   Information and viewfinder<br><br>
 <h2><a href="http://%s/start?framesize=VGA&length=1800&interval=200&quality=10&repeat=100&speed=1&gray=0">http://%s/start?framesize=VGA&length=1800&interval=200&quality=10&repeat=100&speed=1&gray=0</a></h2><br>
   Gives you VGA 640x480, video of 1800 seconds (30 min), picture every 200 ms, jpeg quality 10, repeat for 100 more of the same and play back at 1x actual fps, and don't make it grayscale<br><br>      
<h2><a href="http://%s/start?framesize=UXGA&length=1800&interval=2000&quality=10&repeat=100&speed=30&gray=0">UXGA 2 sec per frame, for 30 minutes repeat, 30x playback</a></h2><br>
<h2><a href="http://%s/start?framesize=UXGA&length=1800&interval=200&quality=10&repeat=100&speed=1&gray=0">UXGA 5 fps for 30 minutes repeat</a></h2><br>
<h2><a href="http://%s/start?framesize=CIF&length=1800&interval=50&quality=10&repeat=100&speed=1&gray=0">CIF 20 fps second for 30 minutes repeat</a></h2><br>
<br>
<br><div id="image-container"></div>
</body>
</html>)rawliteral";

  sprintf(the_page, msg, the_message, localip, localip, localip, localip, localip, localip, localip);

  //Serial.println(strlen(msg));
  //Serial.println(msg);
  //Serial.println(strlen(the_page));
  //Serial.println(the_page);
}

////////////////////////////////////////////////////////////////////////////////////
void do_status(char *the_message)
{

  Serial.print("do_status ");
  Serial.println(the_message);

  const char msg[] PROGMEM = R"rawliteral(<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ESP32-CAM Video Recorder</title>
</head>
<body>
<h1>ESP32-CAM Video Recorder v23</h1><br>
 <h2>Message is <font color="red">%s</font></h2><br>
 Recording = %d (1 is active)<br>
 Frame %d of %d <br>
 Capture Interval = %d ms<br>
 Length = %d seconds<br>
 Quality = %d (5 best to 63 worst)<br>
 Framesize = %d (10 UXGA, 7 SVGA, 6 VGA, 5 CIF)<br>
 Repeat = %d<br>
 Playback Speed = %d<br>
 Gray = %d<br><br>
 Commands as follows for your ESP's ip address:<br><br>
 <h2><a href="http://%s/">http://%s/</a></h2><br>
   Information and viewfinder<br><br>
 <h2><a href="http://%s/stop">http://%s/stop</a></h2><br>
   You must "stop" before starting with new parameters<br><br>
 <br>
 <h2><a href="ftp://%s/">ftp://%s/</a></h2><br>
 Username: esp, Password: esp ... to download the files<br><br>
 Red LED on back of ESP will flash with every frame, and flash SOS if camera or sd card not working.<br>
<br>
Check camera position with the frames below every 5 seconds for 5 pictures  <br>
Refresh page for more.<br>
<br><div id="image-container"></div>
<script>
document.addEventListener('DOMContentLoaded', function() {
  var c = document.location.origin;
  const ic = document.getElementById('image-container');  
  var i = 1;
  
  var timing = 5000;
  function loop() {
    ic.insertAdjacentHTML('beforeend','<img src="'+`${c}/capture?_cb=${Date.now()}`+'">')
    i = i + 1;
    if ( i < 6 ) {
      window.setTimeout(loop, timing);
    }
  }
  loop();
  
})
</script><br>
</body>
</html>)rawliteral";

  //Serial.print("Serving web page, len= "); Serial.println(strlen(msg));
  //Serial.println(msg);

  sprintf(the_page, msg, the_message, recording, frames_so_far, total_frames, capture_interval, capture_interval * total_frames / 1000, quality, framesize, repeat, xspeed, gray, localip, localip, localip, localip, localip, localip);

  //Serial.println(strlen(the_page));
  //Serial.println(the_page);
}

////////////////////////////////////////////////////////////////////////////////////
static esp_err_t index_handler(httpd_req_t *req)
{

  do_status("Refresh Status");

  httpd_resp_send(req, the_page, strlen(the_page));
  return ESP_OK;
}

void startCameraServer()
{
  httpd_config_t config = HTTPD_DEFAULT_CONFIG();

  httpd_uri_t index_uri = {
      .uri = "/",
      .method = HTTP_GET,
      .handler = index_handler,
      .user_ctx = NULL};
  httpd_uri_t capture_uri = {
      .uri = "/capture",
      .method = HTTP_GET,
      .handler = capture_handler,
      .user_ctx = NULL};

  httpd_uri_t file_stop = {
      .uri = "/stop",
      .method = HTTP_GET,
      .handler = stop_handler,
      .user_ctx = NULL};

  httpd_uri_t file_start = {
      .uri = "/start",
      .method = HTTP_GET,
      .handler = start_handler,
      .user_ctx = NULL};

  if (httpd_start(&camera_httpd, &config) == ESP_OK)
  {
    httpd_register_uri_handler(camera_httpd, &index_uri);
    httpd_register_uri_handler(camera_httpd, &capture_uri);
    httpd_register_uri_handler(camera_httpd, &file_start);
    httpd_register_uri_handler(camera_httpd, &file_stop);
  }
}
