# 실행 방법
가장 중요한 실행방법입니다.
1) npm run start 실행
2) http://localhost:3000/api-docs 로접속합니다.
3) /api/user/ (회원정보 인증하기)를 클릭 한 뒤 펼쳐진 오른쪽 메뉴인 'Try it out'을 클릭합니다.
4) requestBody 내에 전화번호를 json 형식에 맞게 입력 합니다. ex) { "phone": "010-2977-2122" }
5) 'Excute' 버튼을 클릭합니다.

6) 아래와 같이 accessToken과 refreshToken 확인되며, accessToken 내의 value값을 복사합니다.
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6InN0cmluZyIsIlVVSUQiOiI1OWI3NGIyNC1jNWMzLTQxZGEtOGNjNy04ZTE3NGI0YWE0NGMiLCJpYXQiOjE2NjQwMDQ3NjIsImV4cCI6MTY2NDAwNTA2Mn0.en_C_IGaAzDRM-1zb3os-V9scAc01mE7pg4sa-eG0GE",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6InN0cmluZyIsImlhdCI6MTY2NDAwNDc2MiwiZXhwIjoxNjY0MDA4MzYyfQ.UBFUB6v598cjy9CwUP_4rTOx6RP6vVmpAKxcN0rlFxw"
}

7) /api/order (주문 등록하기)를 클릭합니다.
8) 이후 기능의 사용법은 7) 과 동일합니다.

# 프로젝트 구조와 설계 전반
프로젝트는 기존의 틀에서 벗어나지 않고 현재 구조 내에서 개선 할 점을 찾는데에 초점을 맞추었습니다.

프로젝트가 커질수록 협업 및 갑작스런 인력의 이탈 등의 재난재해에 대비하기 위해 코드 직관성을 향상시키는 것이 필요하다고 판단하여 
initializeRouter 부분을 class화 하여 별도의 파일로 구분하였습니다.

협업에 큰 도움이 된다고 생각되는 자동 문서화 라이브러리를 추가하였으며 기존 모듈 형태의 구조를 따르기 위해 각 모듈 별로 schema.yaml를 생성하면
별도의 작업 없이 자동으로 API문서가 적용되도록 하였습니다.

# 사용한 라이브러리
자동 문서화를 위해 swagger 라이브러리를 사용했습니다.
개발 시 편의성을 위해 수정 시 서버에 갱신되도록 nodemon 라이브러리를 추가하였습니다. 프로덕션 환경에서는 삭제할 예정입니다.

# Basic authentication
기본인증은 기존과 동일하게 JWT 방식으로 진행하려고 합니다.

# API token
기존 구조는 /api/user를 통해 로그인 인증정보 생성 시 x-access-token이 있어야만 신청을 할 수 있는 형태입니다.
token을 받기 위해 token 을 받아야하는 형태로 되어 있으므로 해당 부분을 일부 변경하고자 합니다.

출제 의도와는 상반될 수 있으나 인증절차를 아래와 같이 정의를 하고 개발하려고 합니다.
1) 어떠한 Token도 가지지 않는 사용자(브라우저)가 전화번호 인증을 통해 인증정보(Token)를 받는다.
2) 전화번호 인증은 { "phone": "010-0000-0000" } 등의 파라미터를 넘기는 것으로 생략한다. 
전화번호를 넘기면 모든 일련의 인증절차를 마친 것으로 판단한다.

그렇다면 최초 요청 시 /api/user는 x-access-token이 없어도 token을 받을 수 있는 상태로 변경해야 합니다.

또한 만료기한이 정해져있는 JWT Token은 탈취를 당할 경우 보안이 취약합니다.
따라서 만료기한이 짧은 x-access-token과 만료기한이 긴 refresh-token 2가지를 발급합니다.
x-access-token은 주문 등록, 유저 정보 조회 등의 모든 기능을 수행 할 수 있습니다.
refresh-token으론 아무런 기능도 수행 할 수 없습니다. 단 /api/user/refresh 를 통해 별다른 인증 절차 없이 x-access-token을 발급 받을 수 있습니다.

통신 절차는 아래와 같이 진행됩니다
1) 인증 후 x-access-token(5m)과 refresh-token(60m)을 함꼐 발급 받음
2) x-access-token을 통해 기능 수행
3) 진행 중 x-access-token이 만료됨
4) 프론트에선 발급받은 refresh-token을 이용해 x-access-token을 재발급 이후 기능 수행
5) 60분 후 refresh-token이 만료됨
6) 1번 인증 절차로 돌아감

# Request format
각 요청값은 다르게 들어올 수 있습니다. 보통 싱글 프로세스로 서버를 운영하게 되는 express의 경우 예외처리가 잘못되면
서버가 종료 될 가능성이 존재하므로 최대한 형식에 맞는 값을 받고자 합니다.

해당 작업에 Joi 라이브러리를 사용하였습니다.

# Response format
모든 반환되는 응답값은 JSON 형태로 반환되도록 하였습니다.

# DB Structure
과제 특성상 SQLite3를 사용했으므로, 현재 샘플데이터(JSON) 형식으로 생성 및 삭제하기가 쉽지 않을 것으로 판단됩니다.
조회와 검색을 용이하게 하기 위해 Order의 경우는 Infomation, Mission, Mission이 가지는 아이템 리스트로 테이블을 나누어 저장하고
Relation을 통해 데이터를 조합해 JSON 형태로 프론트에 전달 할 계획을 가지고 구성했습니다.

# API Specifications
http(s)://{server_ip}/api-docs 에서 API 명세서를 확인 할 수 있습니다.
예) http://localhost/api-docs

API 명세서는 Postman과 같은 강력한 툴을 사용하더라도 매 번 수동으로 갱신한다는 일이 쉽지 않습니다.

이에 Swagger와 같은 자동 문서화가 되는 라이브러리를 사용하여 매 번 최신화된 명세서를 전달하려고 합니다.
현재 프로젝트는 MSA 개발 방식을 따르고 있는 것으로 보여, schema와 route를 하나의 폴더에 넣고 개발하는 것보다는
api 내의 각 모듈별로 schema를 가지는게 좋겠다고 판단하였습니다.

모듈 내에 schema.ymal를 swagger 형식에 맞게 입력하면 자동으로 문서화가 되는 개념으로 진행했습니다.

# 시간이 더 있었다면 추가될 수 있는 개선 사항들
better-sql3는 완전 동기화이므로 병렬 처리가 가능한 데이터베이스(mongodb, mysql2 등)로 변경 할 것 같습니다.
typescript를 적용하고 dto 등의 데이터 구조화 작업을 했을 것 같습니다.

