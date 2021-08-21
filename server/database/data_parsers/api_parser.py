from bs4 import BeautifulSoup
from urllib.request import urlopen
from dotenv import load_dotenv
import json
import time
import os

# env파일 읽어오기
load_dotenv()

# 시군구 코드 raw json file 열기
with open("../../../.dummy/region_code_name.json", "r", encoding="UTF-8") as f:
    json_data = json.load(f)

# api 호출에 쓰일 시군구코드 추출
sigungu_code = []

def get_sigungu_code():
    real_data = json_data["존재"]
    sejong_written = 1
    for key, data in real_data.items():
        address_split = data.split()

        if len(address_split) == 2:
            # 세종시 예외처리(세종시는 구 단위가 없음)
            if address_split[0] == "세종특별자치시":
                if sejong_written:
                    sigungu_code.append(key[:5])
                    sejong_written = 0
                    continue
                else:
                    continue

            # 제주도 예외처리(제주도는 옛 시군구코드로 되어 있음)
            # 제주시 : 49110, 서귀포시 : 49130
            elif address_split[0] == "제주특별자치도":
                api_fit_code = int(key[:5]) - 1000
                sigungu_code.append(api_fit_code)
                continue

            sigungu_code.append(key[:5])

# 반복문 돌며 어린이집 정보 딕셔너리 형태로 저장 (키 : 어린이집코드, 값 : 튜플)
target_data = {}

def parse_center_info(district_code):
    base_url = os.getenv("OPERATION_URL")

    url = str(base_url) + "&arcode=" + district_code + "&stcode="

    html = urlopen(url)
    source = html.read()

    soup = BeautifulSoup(source, "html.parser")

    items = soup.find_all("item")
    for center in items:
        center_id = center.find("stcode").text
        center_name = center.find("crname").text
        operation_type = center.find("crtypename").text
        operation_stats = center.find("crstatusname").text
        zipcode = center.find("zipcode").text
        address = center.find("craddr").text
        center_phone = center.find("crtelno").text
        fax = center.find("crfaxno").text
        web_page = center.find("crhome").text
        latitude = center.find("la").text
        longitude = center.find("lo").text

        center_info = (
            center_id,
            district_code,
            center_name,
            operation_type,
            operation_stats,
            zipcode,
            address,
            center_phone,
            fax,
            web_page,
            latitude,
            longitude,
        )
        target_data[center_id] = center_info

    time.sleep(5)

# 실행 부분
get_sigungu_code()

for district_code in sigungu_code:
    parse_center_info(district_code)

# json file로 target_data 저장
with open("child_care_center.json", "w", encoding="UTF-8-sig") as outfile:
    json.dump(target_data, outfile, ensure_ascii=False, indent="\t")