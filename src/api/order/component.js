import { Router } from 'express';
import BadRequestException from '../../exceptions/badRequestException';
import { signing } from '../../middlewares/auth';

import OrderRoute from './route'
import OrderService from './service';
import Dao from './dao';

export default class OrderComponent {
  router = Router();
  service = new OrderService(new Dao());
  route = new OrderRoute(this);
  getService(){
    return this.service;
  }

  constructor () {
    this.getRouter();
  }

  getRouter(){
    const { path, router } = this.route.initializeRouter()
    this.router.use(path, router)
  }

  /**
   * @description 고객의 주문 리스트를 가져온다.
   */
  orderList = (req,res) => {
    const { UUID } = req.user;
    const result = []
    const orderList = this.getService().orderList(UUID)

    orderList.forEach( (order) => {
      let orderSchema = {}
      orderSchema.taskId = order.id
      orderSchema.information = order
      orderSchema.mission = []
      const missionList = this.getService().findMissionByTaskId(UUID, order.id)
      missionList.forEach( (mission) => {
        mission.items = []
        let imageList = this.getService().findMissionImageByMissionId(UUID, mission.id)
        imageList.forEach( (image) => {
          let imageSchema = {
            'image_id' : image.id,
            'image_url' : image.image_url
          }
          mission.items.push(imageSchema)
        })
        orderSchema.mission.push(mission)
      })
      result.push(orderSchema)
    }) 
    return result
  }

  /**
   * @description taskId로 주문을 가져온다.
   */
  findOrder = (req, res) => {
    const { UUID } = req.user;
    const { taskId } = req.params;
    let result = this.getService().findOrderById(UUID, taskId)
    return result
  }

  /**
   * @description 주문을 등록한다.
   */
  registerOrder = (req, res) => {
    const { UUID } = req.user;
    const data = req.body

    if(!req.body.phone){
      throw new BadRequestException('부재시 연락 받을 연락처를 입력해주세요.');
    }

    if(!req.body.pickup){
      throw new BadRequestException('픽업을 원하는 날짜와 시간을 입력해주세요');
    }

    if(!req.body.delivery){
      throw new BadRequestException('배달을 원하는 날짜와 시간을 입력해주세요');
    }

    if(!req.body.address_01){
      throw new BadRequestException('주소를 입력해주세요.');
    }
    
    if(!req.body.address_01){
      throw new BadRequestException('상세 주소를 입력해주세요');
    }

    let result = this.getService().insertOrder(UUID, data)
    return result
  }

  deleteOrder = (req, res) => {
    const { UUID } = req.user;
    const { taskId } = req.params

    let result = this.getService().deleteOrder(UUID, taskId)
    res.status(200).json(result)
  }

  registerMission = (req, res) => {
    const { UUID } = req.user;
    const { taskId } = req.params
    const data = req.body
    let result, returnMessage
    const checkTaskId = this.getService().findOrderById(UUID, taskId)
    if(checkTaskId){
      result = this.getService().insertMission(UUID, taskId, data)
      
      if(result){
        returnMessage = {
          'code': 200,
          'message': '정상적으로 등록되었습니다.'
        } 
      } else {
          returnMessage = {
          'code': 200,
          'message': '등록 과정에서 문제가 발생했습니다.'
        }
      }
    } else {  
      returnMessage = {
        'code': 200,
        'message': '등록된 주문이 없거나 권한이 없습니다.'
      }
    }
    return returnMessage
  }

  deleteMission = (req, res) => {
    const { UUID } = req.user;

    let result = this.getService().deleteMission(UUID, taskId, missionId)
    return result
  }

  registerMissionImage = (req, res) => {
    const { UUID } = req.user;
    const { taskId, missionId } = req.params
    const data = req.body

    const result = this.getService().insertMissionImage(UUID, taskId, missionId, data)
    return result
  }

  deleteMissionImage = (req, res) => {
    const { UUID } = req.user;
    const { taskId, missionId, imageId } = req.params

    let result = this.getService().deleteMissionImage(UUID, taskId, missionId, imageId)
    return result
  }
}
