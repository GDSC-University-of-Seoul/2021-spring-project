<!-- 
    PR 작성 시 체크리스트 
    1. JIRA Backlog에 작업내용이 등록되어 있는지 확인
    2. PR Title의 KDSK 넘버링이 제대로 되어있는지 확인
    3. Github Issue에 등록된 작업인지 확인
    4. 작업으로 인한 변경점이 영향을 미칠 작업자 필수 리뷰 요청
    5. PR 등록 전, Labeling이 올바르게 되어있는지 확인
         - 우선순위 / 작업 종류 / PR 유형
-->

# 기능 Issue

Linked Jira backlog : #KDSK- { }<!-- JIRA Backlog number -->
<!-- Linked Git Issue Check 
    우측의 Linked Issues에 관련된 Github Issue 연결
    * PR 작성 후 해당 이슈 라벨링 PENDING / IN PROGRESS 처리
-->

## PR 목적

- 본 PR에서는 XXX <!-- 목적 -->을 위해서 XXX <!-- 작업사항 -->을 구현합니다.
<!-- PR을 통한 기능 구현의 목적
    ex) 본 PR에서는 영상 데이터의 분석 준비작업을 위해서, MP4 동영상 파일로부터 프레임 데이터 추출하는 기능을 구현합니다. -->
   
## 작업 설명
- 
<!-- 작업할 내용에 대해서 현재형 문장 / 명사형으로 자유롭게 설명-->
 
## 라벨링 확인
작업 우선순위 : <!--긴급/상/중/하/없음 중 택 1--> 

<!-- PR Type Check 
    작업중인 코드는 DRAFT / 작업이 완료된 코드는 REVIEW REQUEST
-->

<!-- Reviewer Check 
    본 작업으로 인해 영향을 받을 것으로 예상되는 리뷰어 필수 등록
    예상되는 리뷰어가 없는 경우 @handal95, @edit8080 등록
-->

<!-- Extra Check 
    단순하고 사소한 수정 작업의 경우 Extra : SIMPLE 
    이미 게시된 PR의 하위 작업(혹은 merge의 대상이 develop이 아닌 경우) : SUB BRANCH 처리
-->


<!--
MERGE 조건
    - `EXTRA: MASTER/RELEASE` 전원 승인
    - `EXTRA: SIMPLE`  0인 이상의 승인
    - `(DEFAULT)` 2인 이상의 승인
-->
