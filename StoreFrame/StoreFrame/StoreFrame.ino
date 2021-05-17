#include "esp_camera.h"
#include <WiFi.h>

#include <WiFiClient.h> 
#include <ESP32_FTPClient.h>

#include <NTPClient.h>
#include <WiFiUdp.h>

#include "time.h"

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);

// Variables to save date and time
String formattedDate;
String dayStamp;
String timeStamp;

//
// WARNING!!! Make sure that you have either selected ESP32 Wrover Module,
//            or another board which has PSRAM enabled
//

// Select camera model
// #define CAMERA_MODEL_WROVER_KIT
//#define CAMERA_MODEL_ESP_EYE
//#define CAMERA_MODEL_M5STACK_PSRAM
//#define CAMERA_MODEL_M5STACK_WIDE
#define CAMERA_MODEL_AI_THINKER

#include "camera_pins.h"

const char* ssid = "ZEROWIN";
const char* password = "zzzzzzzz";

char ftp_server[] = "192.168.0.3";
char ftp_user[]   = "admin";
char ftp_pass[]   = "admin";

// you can pass a FTP timeout and debbug mode on the last 2 arguments
ESP32_FTPClient ftp (ftp_server,ftp_user,ftp_pass, 5000, 2);

void startCameraServer();

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);
  Serial.println();

  pinMode(16, INPUT);

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
  if(psramFound()){
    config.frame_size = FRAMESIZE_UXGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

#if defined(CAMERA_MODEL_ESP_EYE)
  pinMode(13, INPUT_PULLUP);
  pinMode(14, INPUT_PULLUP);
#endif

  // camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }

  sensor_t * s = esp_camera_sensor_get();
  //initial sensors are flipped vertically and colors are a bit saturated
  if (s->id.PID == OV3660_PID) {
    s->set_vflip(s, 1);//flip it back
    s->set_brightness(s, 1);//up the blightness just a bit
    s->set_saturation(s, -2);//lower the saturation
  }
  //drop down frame size for higher initial frame rate
  s->set_framesize(s, FRAMESIZE_QVGA);

#if defined(CAMERA_MODEL_M5STACK_WIDE)
  s->set_vflip(s, 1);
  s->set_hmirror(s, 1);
#endif

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  startCameraServer();

  Serial.print("Camera Ready! Use 'http://");
  Serial.print(WiFi.localIP());
  Serial.println("' to connect");

  // Initialize a NTPClient to get time
  timeClient.begin();
  // Set offset time in seconds to adjust for your timezone, for example:
  // GMT +1 = 3600
  // GMT +8 = 28800
  // GMT -1 = -3600
  // GMT 0 = 0
  timeClient.setTimeOffset(32400); 

  {
      while(!timeClient.update()) {
        timeClient.forceUpdate();
      }
      // The formattedDate comes with the following format:
      // 2018-05-28T16:00:13Z
      // We need to extract date and time
      formattedDate = timeClient.getFormattedDate();
      Serial.println(formattedDate);
    
      // Extract date
      int splitT = formattedDate.indexOf("T");
      dayStamp = formattedDate.substring(0, splitT);
      Serial.print("DATE: ");
      Serial.println(dayStamp);
      // Extract time
      timeStamp = formattedDate.substring(splitT+1, formattedDate.length()-1);
      Serial.print("HOUR: ");
      Serial.println(timeStamp);
  }

  

/*
    struct tm tm;
    tm.tm_year = 2018 - 1900;
    tm.tm_mon = 10;
    tm.tm_mday = 15;
    tm.tm_hour = 14;
    tm.tm_min = 10;
    tm.tm_sec = 10;
    time_t t = mktime(&tm); */
    time_t t = timeClient.getEpochTime();
    
    // printf("Setting time: %s", asctime(&tm));
    struct timeval now = { .tv_sec = t };
    settimeofday(&now, NULL);

    timeClient.end();
}

int FTP_uploadImage(int64_t t, unsigned char * pdata, unsigned int size)
{
  char filename[32] = "";
  Serial.print("FTP_uploadImage=");
  Serial.println(size);

  ftp.OpenConnection();

  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    Serial.println("Failed to obtain time");
    return -1;
  }
  sprintf(filename, "CAPTURE_%04d%02d%02d_%02d%02d%02d.jpg",
    timeinfo.tm_year + 1900,
    timeinfo.tm_mon+1,
    timeinfo.tm_mday,
    timeinfo.tm_hour,
    timeinfo.tm_min,
    timeinfo.tm_sec
    );

  //ftp.InitFile("Type A");
  //ftp.ChangeWorkDir("/");
  ftp.InitFile("Type I");
  ftp.NewFile(filename); // "capture.jpg");
  ftp.WriteData( pdata, size );
  ftp.CloseFile();

  ftp.CloseConnection();
  
  return 0;
}

void printLocalTime()
{
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    Serial.println("Failed to obtain time");
    return;
  }
  Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
}

int timeout = 0;
extern int capture_ftpupload(void);
void loop() {
  // put your main code here, to run repeatedly:
  timeout += 1;
  delay(100);

  int value = digitalRead(16);
  // Serial.println(value);
  if(value == 0) {
    capture_ftpupload();
  }
  
  if(timeout % 100 == 0) { // display time per 10 sec
      printLocalTime();
  }

  if(timeout % (60 * 10) == 0) { // capture & upload per 1 min
    capture_ftpupload();
  }
  
}
