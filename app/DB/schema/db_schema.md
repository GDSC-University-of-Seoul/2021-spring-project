# 변경사항 (v2.0.4)
1. 현재 database와의 schema sync맞추기  
   스프린트 7동안 기능 구현으로 변경되었던 사항들을 모아 정리하고 반영하였습니다.
   - facility_area Table 삭제
   - cctv Table Relation 수정
   - cctv_mac 컬럼 추가
   - log table 추가

# 변경(예정)사항 (v2.0.5)
1. manage_type, manage_type_detail 임시 Table 삭제
2. user, requester table 통합
3. video_management 컬럼 수정 (열람 관리를 초점으로 개편)
4. 

# ERD

![ERD(v2.0.4).png](<./ERD(v2.0.4).png>)

# DB Schema

[DB Schema(v2.0.3)](https://2021-spring-dsc-project-team.atlassian.net/wiki/spaces/KDK/pages/6029378/DB+v1.0.0, 'confluence - db schema')에 데이터타입 및 제약조건에 대한 정보가 있습니다.
