import { Router } from 'express';
import successWrapper from '../../libs/success';
import BadRequestException from '../../exceptions/badRequestException';
import { signing } from '../../middlewares/auth';

import OrderService from './service';
import Dao from './dao';

export default class OrderComponent {
  router = Router();
  service = new OrderService(new Dao());

  getService(){
    return this.service;
  }

  constructor () {
    this.initializeRouter();
  }
  initializeRouter(){
    const router = Router();
    const path = '/order';
    router
    .get('/', successWrapper(this.orderList))
    .get('/:taskId', successWrapper(this.findOrder))
    .post('/', successWrapper(this.register))
    this.router.use(path, router);
  }

  /**
   * @description 고객의 주문 리스트를 가져온다.
   */
  orderList = (req,res) => {
    const { UUID } = req.Order;
    return UUID
    //TODO API 셋팅 해주세요
    /**
     * @example
     * https://s3.ap-northeast-2.amazonaws.com/com.washswat.assets/dev/rn.json
     */
  }

  /**
   * @description taskId로 주문을 가져온다.
   */
  findOrder = (req,res) => {
    const { UUID } = req.Order;
    const { taskId } = req.params;
    //TODO API 셋팅 해주세요
    /******************************/
    /**
     * @example
     * https://s3.ap-northeast-2.amazonaws.com/com.washswat.assets/dev/rn.json
     */
  }

  /**
   * @description 주문을 등록한다.
   */
  register = (req, res) => {
    const { UUID } = req.user;
    const data = req.body
    let warnMessage

    if(req.body.pickup == ""){
      warnMessage = "픽업을 원하는 날짜와 시간을 입력해주세요."
    }

    if(req.body.delivery == ""){
      warnMessage = "배달을 원하는 날짜와 시간을 입력해주세요."
    }

    if(req.body.address_01 == ""){
      warnMessage = "주소를 입력해주세요.";
    }
    
    if(req.body.address_01 == ""){
      warnMessage = "상세 주소를 입력해주세요."
    }

    console.log(warnMessage)

    let result = this.getService().insertOrder(UUID, data)
    res.status(201).json(result)
    

    
  }

}
