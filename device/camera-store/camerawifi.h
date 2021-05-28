//#define LOG_LOCAL_LEVEL ESP_LOG_VERBOSE
#include "esp_log.h"
#include "esp_http_server.h"
#include "esp_camera.h"

//#include <WiFi.h>   // redundant

#include "ESP32FTPServer.h"
#include <HTTPClient.h>

// set #define FTP_DEBUG in ESP32FtpServer.h to see ftp verbose on serial
FtpServer ftpSrv; 

// Time
#include "time.h"
#include "lwip/err.h"
#include "lwip/apps/sntp.h"

// MicroSD
#include "driver/sdmmc_host.h"
#include "driver/sdmmc_defs.h"
#include "sdmmc_cmd.h"
#include "esp_vfs_fat.h"

#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"

//
// EDIT ssid and password
// 연결할 와이파이 아이디&패스워드
const char *ssid = "cafeyeoneuil_0";
const char *password = "24680111";


//
// if we have no camera, or sd card, then flash rear led on and off to warn the human SOS - SOS
//
// 카메라 or SD card 등이 연결되지 않음을 감지하면 major_fail 상태로 돌입(깜빡거리는 신호)
void wifi_major_fail()
{
  while (1)
  {
    digitalWrite(33, LOW);
    delay(500);
    digitalWrite(33, HIGH);
    delay(500);
  }
}

//wifi 설정 함수
bool init_wifi()
{
  int connAttempts = 0;

  // zzz
  // Set your Static IP address
  // 본인 IP 주소 설정 가능
  IPAddress local_IP(192, 168, 1, 222);

  // Set your Gateway IP address
  IPAddress gateway(192, 168, 1, 254);

  IPAddress subnet(255, 255, 0, 0);
  IPAddress primaryDNS(8, 8, 8, 8);   // optional
  IPAddress secondaryDNS(8, 8, 4, 4); // optional

  WiFi.setHostname("ESP32CAM-222"); // does not seem to do anything with my wifi router ???

  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS))
  {
    Serial.println("STA Failed to configure");
    wifi_major_fail();
  }

  WiFi.begin(ssid, password); //위에서 입력한 ID와 패스워드로 동작
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
    if (connAttempts > 10)
      return false;
    connAttempts++;
  }
  return true;
}
