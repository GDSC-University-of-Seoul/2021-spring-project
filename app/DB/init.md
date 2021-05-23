# 변경사항(v2.0.0)

1. 약어 삭제  
  약어를 모두 full name으로 대체하였습니다.
  cdrcare_center의 경우 child_care_center로 변경하였습니다.  

2. area 구체화  
  area가 포괄적인 의미를 담아 facility_area로 변경되었습니다.
  * 테이블 명이 언더바를 포함한 경우, 컬럼들은 언더바 뒤의 단어만 활용해 컬럼 이름을 지정하겠습니다.   
  ex) facility_area - area_id, child_care_center - center_id  

3. 임시 테이블 생성 및 테이블 분리  
  추후의 Sprint에서 사용될 user테이블과 관리대장 유형에 관련된 테이블이 임시로 생성되었습니다. 그러나 현 Sprint에서 중점이 되는 부분이 아니라 구체화가 되지 않았습니다. 해당 작업은 현재 우선순위인 테이블에 데이터 주입 후에 이루어질 것입니다.

# ERD
![ERD(v2.0.0).png](./ERD(v2.0.0).png)
   
# DB Schema
[DB Schema(v1.2.1)](https://2021-spring-dsc-project-team.atlassian.net/wiki/spaces/KDK/pages/6029378/DB+v1.0.0, "confluence - db schema")에 데이터타입 및 제약조건에 대한 정보가 있습니다. 
