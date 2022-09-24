import { Router } from 'express';
import BadRequestException from '../../exceptions/badRequestException';
import { signing } from '../../middlewares/auth';

import UserRoute from './route';
import UserService from './service';
import Dao from './dao';

export default class UserComponent {
  router = Router();
  service = new UserService(new Dao());
  route = new UserRoute(this);

  getService(){
    return this.service;
  }

  constructor () {
    this.getRouter();
  }

  getRouter(){
    const { path, router } = this.route.initializeRouter()
    console.log(router)
    this.router.use(path, router);
  }

  signUp = (req,res) => {
    const { phone } = req.body;
    if(!phone){
      throw new BadRequestException('전화번호를 알려주세요');
    }
    let user = this.getService().findUserByPhone(phone);
    if(!user){
      this.getService().insertUser(phone);
      user = this.getService().findUserByPhone(phone);
    }
    let payload = {
      'phone': user.phone,
      'UUID': user.UUID
    }

    let token = signing(payload);
    return { token };
  }

  me = (req,res) => {
    const { UUID } = req.user;
    let user = this.getService().findUserByUUID(UUID);
    return user;
  }
}