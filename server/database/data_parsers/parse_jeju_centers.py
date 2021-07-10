from bs4 import BeautifulSoup
from urllib.request import urlopen
from dotenv import load_dotenv
import json
import time
import os

# env파일 읽어오기
load_dotenv()

# 제주특별자치시 제주시, 서귀포시 시군구코드
jeju_sigungu_code = ["49110", "49130"]

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
for district_code in jeju_sigungu_code:
    parse_center_info(district_code)

# json file로 target_data 저장
with open("jeju_child_care_center.json", "w", encoding="UTF-8-sig") as outfile:
    json.dump(target_data, outfile, ensure_ascii=False, indent="\t")
