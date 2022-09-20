import express, { Router } from 'express';
import { verifyJWT, signing } from './middlewares/auth';
import exceptions from './middlewares/exceptions';
// import { swaggerUi, specs } from './libs/swagger';
// import routes from './routes/index.js'

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
    // this.app.use(express.urlencoded({ extended : true }));
    // this.app.use(function (req, res, next) {
    //   res.header('Access-Control-Allow-Origin', '*');
    //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    //   res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
    //   next();
    // });
    this.app.use(verifyJWT)
  }

  initializeErrorHandling() {
    this.app.use(exceptions);
  }

  
  initializeControllers(controllers) {
    const router = Router();
    this.app.get('/', (req, res) => {
      res.send('OK')
    });
    controllers.forEach((controller) => {
      router.use(controller.router);
    });
    this.app.use('/api', router);
    // this.app.use('/', routes);
    // this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer:true }))
  }
}

export default App;