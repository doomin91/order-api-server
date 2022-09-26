import { Router } from 'express';
import BadRequestException from '../../exceptions/badRequestException';
import ValidationException from '../../exceptions/validationException';

import Joi from 'joi'
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
    const { path, router } = this.route.initializeRouter();
    this.router.use(path, router);
  }

  /**
   * @description 고객의 주문 리스트를 가져온다.
   */
  orderList = (req,res) => {
    const { UUID } = req.user;
    const result = [];

    const orderList = this.getService().orderList(UUID);
    orderList.forEach( (order) => {
      let orderSchema = {};
      orderSchema.taskId = order.id;
      orderSchema.information = order;
      orderSchema.mission = [];
      const missionList = this.getService().findMissionByTaskId(UUID, order.id);
      missionList.forEach( (mission) => {
        mission.items = [];
        const imageList = this.getService().findMissionImageByMissionId(UUID, mission.id);
        imageList.forEach( (image) => {
          let imageSchema = {
            'image_id' : image.id,
            'image_url' : image.image_url
          }
          mission.items.push(imageSchema);
        })
        orderSchema.mission.push(mission);
      })
      result.push(orderSchema);
    }) 
    return result;
  }

  /**
   * @description taskId로 주문을 가져온다.
   */
  findOrder = (req, res) => {
    const { UUID } = req.user;
    const { taskId } = req.params;

    const order = this.getService().findOrderById(UUID, taskId);
    let orderSchema = {};
    orderSchema.taskId = order.id;
    orderSchema.information = order;
    orderSchema.mission = [];
    const missionList = this.getService().findMissionByTaskId(UUID, order.id);
    missionList.forEach( (mission) => {
      mission.items = [];
      const imageList = this.getService().findMissionImageByMissionId(UUID, mission.id);
      imageList.forEach( (image) => {
        let imageSchema = {
          'image_id' : image.id,
          'image_url' : image.image_url
        }
        mission.items.push(imageSchema);
      })
      orderSchema.mission.push(mission);
    })
    const result = orderSchema;
    return result;
  }

  /**
   * @description 주문을 등록한다.
   */
  registerOrder = (req, res) => {
    const { UUID } = req.user;
    const data = req.body;
    
    const schema = Joi.object().keys({
      phone       : Joi.string().max(14).pattern(/^01[0-9]-[0-9]{3,4}-[0-9]{3,4}$/).required(),
      pickup      : Joi.date().iso().required(),
      pickupEnd   : Joi.date().iso().empty(''),
      delivery    : Joi.date().iso().required(),
      deliveryEnd : Joi.date().iso().empty(''),
      address_01  : Joi.string().max(200).required(),
      address_02  : Joi.string().max(200),
      location    : Joi.string().max(200).empty('')
    })
    const { error } = schema.validate(data, { abortEarly: false })
    if(error) throw new ValidationException(error)

    let result = this.getService().insertOrder(UUID, data);
    return result;
  }

  deleteOrder = (req, res) => {
    const { UUID } = req.user;
    const { taskId } = req.params

    let result = this.getService().deleteOrder(UUID, taskId)
    res.status(200).json(result)
  }

  registerMission = (req, res) => {
    const { UUID } = req.user;
    const { taskId } = req.params;
    const data = req.body;

    const schema = Joi.object().keys({
      name                       : Joi.string().required(),
      userMessage                : Joi.string().empty(''),
      tagList                    : Joi.array().empty(''),
      representativeItemImage    : Joi.string().empty(''),
    })
    const { error } = schema.validate(data, { abortEarly: false })
    if(error) {
      throw new ValidationException(error)
    }

    let result;
    const checkTaskId = this.getService().findOrderById(UUID, taskId);
    if(checkTaskId){
      result = this.getService().insertMission(UUID, taskId, data);
      
      if(result){
        return '정상적으로 등록되었습니다.';
      } else {
          throw new BadRequestException('등록 과정에서 문제가 발생했습니다.');
      }
    } else {
      throw new BadRequestException('등록된 주문이 없거나 권한이 없습니다.');
    }
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

    const schema = Joi.object().keys({
      imageURL                   : Joi.string().required()
    })
    const { error } = schema.validate(data, { abortEarly: false })
    if(error) throw new ValidationException(error)

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
