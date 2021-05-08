# 변경사항(v1.1.1)

1. 속성명 변경  
  전체적으로 변수명을 snake_type으로 변경하였습니다.  
2. 중복되는 데이터를 가질 속성 삭제  
  ex) File 테이블의 file_manager의 경우 같은 값이 중복되어 삭제하고, 추후에 어린이집 구성인원으로 구성된 테이블에 분류할 것입니다.  
3. 오타 수정

# 변경사항(v1.1.2 ~ v1.1.3)
1. 속성 삭제  
   어린이집 정원, 현원, 교사 수에 대한 정보가 불필요하다 판단되어 삭제하였습니다. 
2. 관계 수정
    식별/비식별 관계를 다시 파악해 기본키가 복잡해지는 현상을 해소하였습니다.
3. storage 테이블 삭제
    1TB의 저장소를 사용하는 등으로 다수의 저장장치가 사용되지 않을 수 있다 판단하여 storage 테이블을 삭제하고 storage_name이라는 속성만 video테이블에 남겨두었습니다. 
4. 오타 수정(v1.1.3)

# ERD
![ERD(v1.1.3).png](./ERD(v1.1.3).png)

## 약어
|Short ver|Long ver|
|----|----|
|ano|anomaly|
|cdr|children/child|
|cnt|count|
|lat|latitude|
|lng|longitude|
|opr|operation|  
   
# DB Schema
[DB Schema(v1.1.3)](https://2021-spring-dsc-project-team.atlassian.net/wiki/spaces/KDK/pages/6029378/DB+v1.0.0, "confluence - db schema")에 데이터타입 및 제약조건에 대한 정보가 있습니다. 
