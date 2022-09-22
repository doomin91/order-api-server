import { v4 as uuidv4 } from 'uuid';

export default class OrderService {
  constructor(dao) {
    this.dao = dao;
  }

  orderList(UUID){
    return this.dao.orderList(UUID)
  }

  findOrderById(UUID, taskId){
    return this.dao.findOrderById(UUID, taskId)
  }

  deleteOrder(UUID, taskId){
    return this.dao.deleteOrder(UUID, taskId)
  }

  insertOrder(UUID, data) {
    return this.dao.insertOrder(UUID, data);
  }

  insertMission(taskId, data) {
    return this.dao.insertMission(taskId, data);
  }

  deleteMission(UUID, missionId) {
    return this.dao.deleteMission(UUID, missionId);
  }
}
