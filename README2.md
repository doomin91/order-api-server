# 세탁특공대 NodeJS 과제

# **시작하면서**

안녕하세요. 지원자 여러분! 세특 nodejs 과제 테스트에 참여해 주셔서 감사합니다. 
해당 과제는 세특 앱에서 활용하고 있는 "문제 의류 접수" 화면의 API를 작성하는 프로젝트입니다. 

각 컴포넌트들을 잘 구조화 할 수 있는지, OOP 기반의 프로그래밍을 할 수 있는지 또 지금은 작은 프로젝트지만 확장성이 고려된 프로젝트로 완성할 수 있는지를 파악하는 것에 목적을 두고 있습니다. 프로젝트 구조화에 포커싱해 주세요.

**프로젝트 링크**

[https://github.com/washswatdev/nodejs-test](https://github.com/washswatdev/nodejs-test)

<aside>
💡 **해당 프로젝트를 클론 후 새롭게 작성 해주세요**

</aside>

# 과제 설명

- 과제 제출 기한은 `**7**`일입니다. 시간이 부족할 경우, **기한 연장을 요청해주세요.**
- **프로젝트 완성 후,**
    - Private github repository에 업로드 하신 뒤 collaborator로 아이디 `**washswatdavid**` 와 `**felix-washswat**` , `**james-washswat**`를 추가해 주세요.
    - 그 후, 성함과 함께 완료하신 깃허브 링크를 `recruit@washswat.com` 또는 `010-3429-0132`로 채용팀에게 보내주시면 됩니다.
- 완성된 프로젝트 [readme.md](http://readme.md)에는 프로젝트 설명이 담긴 문서가 포함되어 있어야 합니다. 해당 문서에는 아래 내용을 기본으로 하며, 부가적인 내용이 있다면 자유롭게 추가해 주세요.
    - 프로젝트 구조와 설계 전반
    - 사용한 라이브러리
    - 실행 방법
    - 시간이 더 있었다면 추가될 수 있는 개선 사항들
- 프로젝트 완성 후 제출 시 감사의 의미로 과제 비용 `**5**`만원을 지급합니다. 과제 후 세특 엔지니어 내부 논의에 따라 인터뷰 여부가 결정되고, 인터뷰 참석 시 `**10**`만원을 추가로 지급합니다. (원천징수 후 지급됩니다.)

# 개발 환경

아래 리스트업한 항목들은 반드시 세팅되어야 하는 항목입니다. 나열되지 않은 라이브러리는 자유롭게 사용해 주세요.

- Javascript ES6 또는 Typescript
- NodeJS v14, Express
- 데이터베이스 : sqlite3, better-sqlite3

# 개발 요소 설명

1. **API 세팅**
    
    아래 화면과 샘플 데이터를 확인해 주세요. 화면은 총 한 페이지 입니다. 
    
    고객이 앱에서 직접 의류와 아이템을 선택해서 주문 접수하는 것을 가정합니다.
    
    **API 샘플 데이터 링크**
    
    [https://s3.ap-northeast-2.amazonaws.com/com.washswat.assets/dev/rn.json](https://s3.ap-northeast-2.amazonaws.com/com.washswat.assets/dev/rn.json)
    
    **화면 가이드**
    
    [https://www.figma.com/file/TrORrNvLo5SdtSEArh2SDO/sample_myorders-detail?node-id=2%3A715](https://www.figma.com/file/TrORrNvLo5SdtSEArh2SDO/test_myorders-detail?node-id=50%3A1672)
    
    - better-sqlite3 라이브러리를 활용한 SQL기반의 데이터베이스 세팅
    - RestAPI 작성
        - `GET /api/order`  주문 리스트 가져오기
        - `GET /api/order/:taskId`  taskId에 해당하는 주문 리스트 가져오기
        - `POST /api/order/`  주문 등록하기
        - `DELETE /api/order/:taskId`  주문 삭제하기
        
2. **응답 포맷 세팅**
    
    프론트엔드에서는 서버에서 돌려준 응답의 규격에 따라 성공과 실패 여부를 판단하고, 데이터를 화면에 그려줄 수 있습니다. wrapper class를 활용해 성공과 실패에 따른 액션과 규격화할 수 있는 응답 포맷을 완성해 주세요. 응답 성공과 실패에 대한 세팅은 아래에서 확인 가능합니다. 현재는 기본 세팅을 위한 샘플 코드가 작성되어 있습니다.
    
    - `src/libs/suceess.js` 응답 성공
    - `src/middlewares/exceptions.js` 응답 실패
    
3. **인증 체계 세팅**
    
    고객의 정보는 언제나 소중합니다. 우리 API를 호출하는 과정에서 어떤 방법으로 안전하게 데이터를 주고 받을 수 있을까요? 현재 프로젝트에서는 전화번호 인증 후 Bearer token 발급 후 고객의 UUID를 request에 저장하고 API 통신 시 활용하는 인증 체계가 세팅되어 있습니다. 
    
    지원자님이 생각하는 이상적인 인증 체계를 완성해 주세요.
    

# 참고하기

- 프로젝트의 시작은 `src/server.js` 입니다.
- `src/server.js` 에서 각 도메인 별 `component.js`를 initializing 후 `service.js`,`dao.js` 를 통해 데이터 베이스를 핸들링하고 API 로직을 완성하고 있습니다.
- 이미 작성된 `src/user` 디렉터리를 확인해 주세요.

# 주요 체크 포인트

- 개발 요소들이 재사용될 수 있는 프로그래밍
- 확장성을 가진 프로젝트 구조
- 데이터베이스 구조화

# 참고 라이브러리

- express : [https://github.com/expressjs/express](https://github.com/expressjs/express)
- better-sqlite3 : [https://github.com/JoshuaWise/better-sqlite3](https://github.com/JoshuaWise/better-sqlite3)

---

프로젝트 제출 완료시, 빠른 전형 진행을 위해 `recruit@washswat.com` 또는 `010-3429-0132`로 채용팀에게 성함과 함께 알림을 보내주세요. 

더불어 프로젝트와 관련해 궁금한 점은 메일주시면 빠르게 답변 드리겠습니다.