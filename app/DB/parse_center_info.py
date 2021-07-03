from bs4 import BeautifulSoup
from urllib.request import urlopen
from dotenv import load_dotenv
import json
import time
import os

# env파일 읽어오기
load_dotenv()

# 시군구 코드 raw json file 열기
with open("./region_code_name.json", "r", encoding="UTF-8") as f:
    json_data = json.load(f)

# api 호출에 쓰일 시군구코드 추출
sigungu_code = []


def get_sigungu_code():
    real_data = json_data["존재"]
    for key, data in real_data.items():
        address_split = data.split()

        if len(address_split) == 2:
            if address_split[0] == "세종특별자치시":
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

    # print(target_data)
    # print(f"{district_code} 저장 완료")
    time.sleep(5)


# 실행부분
get_sigungu_code()

for district_code in sigungu_code:
    parse_center_info(district_code)

# print(len(target_data))

# json file로 target_data 저장
# 현재 데이터가 너무 커서 경상남도 합천군 데이터까지만 저장됨
with open("child_care_center.json", "w", encoding="UTF-8-sig") as outfile:
    json.dump(target_data, outfile, ensure_ascii=False, indent="\t")
