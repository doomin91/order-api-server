import { Router } from 'express';
import { refreshing, signing } from '../../middlewares/auth';
import { verify } from '../../libs/jwt.js';
import BadRequestException from '../../exceptions/badRequestException';
import ExpiredTokenException from '../../exceptions/expiredTokenException';
import ValidationException from '../../exceptions/validationException';

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
    this.router.use(path, router);
  }

  signUp = (req, res) => {
    const { phone } = req.body;
    if(!phone){
      throw new ValidationException('전화번호를 알려주세요');
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

    const accessToken = signing(payload);

    /**
    * @description Refresh Token은 Access Token만을 발급받는 사용하므로 UUID는 포함하지 않는다.
    * 재발급 시 이용할 phone 정보만 남겨두고 발급한다.
    */
    payload = {
      'phone': user.phone
    }

    const refreshToken = refreshing(payload);
    return { accessToken, refreshToken };
  }

  me = (req, res) => {
    const { UUID } = req.user;
    let user = this.getService().findUserByUUID(UUID);
    return user;
  }

  refresh = (req, res) => {
    const refreshToken = req.headers['refresh-token']
    if(!refreshToken) throw new ValidationException('발급받은 리프레쉬 토큰을 입력해주세요.');
      
    const token = verify(refreshToken)
    if(!token) throw new ExpiredTokenException('리프레쉬 토큰이 만료되었습니다. 재로그인해주세요.');  
    
    const user = this.getService().findUserByPhone(token.phone);
    if(!user) throw new BadRequestException('회원정보를 찾을 수 없습니다. 회원정보 인증 후 다시 시도해주세요.');  
    
    const payload = {
      'phone': user.phone,
      'UUID': user.UUID
    }
    
    const accessToken = signing(payload);
    return { accessToken }
  }
}