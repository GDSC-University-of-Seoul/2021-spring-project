# 변경사항(v2.0.0)

1. 약어 삭제  
   약어를 모두 full name으로 대체하였습니다.
   cdrcare_center의 경우 child_care_center로 변경하였습니다.

2. area 구체화  
   area가 포괄적인 의미를 담아 facility_area로 변경되었습니다.

- 테이블 명이 언더바를 포함한 경우, 컬럼들은 언더바 뒤의 단어만 활용해 컬럼 이름을 지정하겠습니다.  
  ex) facility_area - area_id, child_care_center - center_id

3. 임시 테이블 생성 및 테이블 분리  
   추후의 Sprint에서 사용될 user테이블과 관리대장 유형에 관련된 테이블이 임시로 생성되었습니다. 그러나 현 Sprint에서 중점이 되는 부분이 아니라 구체화가 되지 않았습니다. 해당 작업은 현재 우선순위인 테이블에 데이터 주입 후에 이루어질 것입니다.

# 변경사항(v2.0.1)

1. 변수명 구체화  
   requester, child_care_center에 phone, name이라는 이름의 컬럼이 공통으로 존재했습니다. 혼동을 방지하기 위해 requester_name, requester_phone, center_phone으로 구체화하였습니다.

# 변경사항(v2.0.2)

1. 컬럼 추가  
   어린이집 운영 현황(정상, 휴지, 폐지, 재개, 공백)을 보여주는 column을 추가하였습니다.  
   초기 생성시엔 운영중인 어린이집에 대한 정보만 db에 넣겠다는 생각에 해당 컬럼을 제외시켰지만, PR review를 통해 '휴지', '재개' 항목이 있다는 것을 파악하여 보강하였습니다.

# 변경사항(v2.0.3)

1. 변수명 변경  
   전치사의 사용보다는 복합 명사의 사용이 낫다는 리뷰에 기반해 use_of_area가 area_usage로 변경되었습니다.
