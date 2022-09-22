import express, { Router } from 'express';
import { verifyJWT } from './middlewares/auth';
import exceptions from './middlewares/exceptions';
import { swaggerUi, specs } from './libs/swagger';

class App {
  app;

  constructor(controllers) {
    this.app = express();
    this.initializeAuthenticate();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }
  listen() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  }
  initializeAuthenticate() {
    this.app.use(express.json());

    // 현재 인증의 문제점은 미리 발급된 x-access-token 형태의 Token을 가지고 모든 기능을 무제한 이용 할 수 있다는 점이다.
    // 발급된 토큰을 어떻게 보관하고 인증 할 것인지, 갱신의 주기는 어떻게 할 것인지, DB에 보관해야 할 것인지에 대한 고려가 필요해보인다.
    this.app.use(verifyJWT)
  }

  initializeErrorHandling() {
    this.app.use(exceptions);
  }
  
  initializeControllers(controllers) {
    const router = Router();

    // Root 접속 시 OK
    this.app.get('/', (req, res) => {
      res.send('OK')
    });

    this.app.get('/login', (req, res) => {
      res.send('OK')
    });

    // 각 API의 Component.js에 설정된 Router 하위 설정을 가져온다.
    controllers.forEach((controller) => {
      router.use(controller.router);
    });

    // /api/{Component.router} 형태로 요청을 받도록 설정한다.
    this.app.use('/api', router);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer:true }))
  }
}

export default App;