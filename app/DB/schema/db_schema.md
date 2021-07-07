# 변경사항 (v2.0.4)
1. 현재 database와의 schema sync맞추기  
   스프린트 7동안 기능 구현으로 변경되었던 사항들을 모아 정리하고 반영하였습니다.
   - facility_area Table 삭제
   - cctv Table Relation 수정
   - cctv_mac 컬럼 추가
   - log table 추가

# 변경사항 (v2.0.5)
1. manage_type, manage_type_detail 임시 Table 삭제
2. user, requester table 통합 (본 모니터링 시스템에 대한 로그인 기능 관련)
3. video_management Table 삭제 (구현 범위 조정에 따른 조정)
4. video Table의 delete date, delete issue 삭제 (구현 범위 조정에 따른 조정)
5. anomaly_type 자료형 변경(String->Enum)  
   - 폭행, 싸움, 실신, 절도, 기물파손, 배회, 침입, 투기, 강도, 추행, 납치, 주취행동

# 변경사항 (v2.0.6)
1. user Table 이름을 member로 변경
   - 이에 따라 컬럼명 또한 member_id, member_name 등으로 수정

# ERD
제가 erd 그리는 툴을 다시 설치하고 업데이트하겠습니다!
![ERD(v2.0.5).png](<./ERD(v2.0.5).png>)

# DB Schema

[DB Schema(v2.0.3)](https://2021-spring-dsc-project-team.atlassian.net/wiki/spaces/KDK/pages/6029378/DB+v1.0.0, 'confluence - db schema')에 데이터타입 및 제약조건에 대한 정보가 있습니다.
