# 시작하면서
안녕하세요 지원자 여러분! 세특 nodejs 과제 테스트에 참여 해주셔서 감사 드립니다. 해당 과제는 세특 앱에서 활용 하고 있는 "문제 의류 접수" 화면의 API를 작성 하는 프로젝트 입니다. 각 컴포넌트들을 잘 구조화 활 수 있는지, OOP 기반의 프로그래밍을 하실 수 있는지 또 지금은 작은 프로젝트라도 확장성이 고려된 프로젝트를 완성 시킬 수 있는지? 를 파악하는 것에 목적으로 두고 있습니다. 프로젝트 구조화에 신경 써주셨으면 좋겠습니다.

**해당 프로젝트 clone 후 새롭게 작성 해주세요.**
기타 자세한 프로젝트 설명과 과제에 대한 내용은 [노션페이지](https://washswat.notion.site/NodeJS-a16cd2078a3c4b38a7e8df6de875e890 "노션페이지")를 참고 해주세요.


------------

# 세탁특공대 의류 접수앱
세특 고객들이 의류를 선택 해서 주문을 만들 수 있는 앱 입니다.

# Dev Library
매 번 재실행하는 것은 고역입니다. 따라서 수정 시 갱신하도록 nodemon 라이브러리를 추가하였습니다.

# Basic authentication
기본 인증은 기존과 같이 JWT를 활용한 Access Token, Refresh Token을 발급하여 진행합니다.
최초 전화번호를 입력하는 경우(인증받는 경우) Access Token을 발급하여 주고, 기한이 지난 경우 Refresh Token을 발급하게 합니다.

# API token
Bareer 인증방식을 사용하려고 합니다.

# Request format
프론트에서의 요청 값은 기본적으로 JSON으로 진행합니다.
XML, TEXT, PARAMETER 등으로도 진행 할 수 있으나, 최근 프론트엔드 프레임워크 Vue, React 등의 경우 JSON으로 작업하기가
가장 용이하다고 판단되어 JSON을 선택했습니다.

# Response format
위 사항과 마찬가지로 JSON 형태로 작업하였습니다.

# DB Structure
DB구조는 sqlite를 사용해야 하므로 RDB를 이용하려고 합니다.

# API Specifications
API 명세서는 Postman과 같은 강력한 툴을 사용하더라도 매 번 갱신한다는 일이 쉽지 않습니다.
이에 Swagger와 같은 자동 문서화가 되는 라이브러리를 사용하여 매 번 최신화된 명세서를 전달하려고 합니다.


better-sql3는 완전 동기화이므로 rdb를 쓰게 된다면 mysql2 등의 모듈을 통해 promise 비동기화를 진행할 것 같다.