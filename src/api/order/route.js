import { Router } from 'express';
import successWrapper from '../../libs/success';

export default class OrderRoute {
  constructor (Component) {
    this.Component = Component
  }

  initializeRouter() {
    const router = Router();
    const path = '/order';
    router.get    ('/',                                             successWrapper(this.Component.orderList))
    router.get    ('/:taskId',                                      successWrapper(this.Component.findOrder))
    router.post   ('/',                                             successWrapper(this.Component.registerOrder))
    router.delete ('/:taskId',                                      successWrapper(this.Component.deleteOrder))
    router.post   ('/:taskId/mission',                              successWrapper(this.Component.registerMission))
    router.delete ('/:taskId/mission/:missionId',                   successWrapper(this.Component.deleteMission))
    router.post   ('/:taskId/mission/:missionId/image',             successWrapper(this.Component.registerMissionImage))
    router.delete ('/:taskId/mission/:missionId/image/:imageId',    successWrapper(this.Component.deleteMissionImage))
    return { path, router }
  }

}
