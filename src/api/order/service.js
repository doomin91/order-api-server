import { v4 as uuidv4 } from 'uuid';

export default class OrderService {
  constructor(dao) {
    this.dao = dao;
  }

  findOrder(phone){
    const UUID = uuidv4();
    console.log(UUID)
    return this.dao.findOrder(UUID)
  }

  findOrderById(taskId){
    return this.dao.getOrderById(UUID, taskId)
  }

  deleteOrder(taskId){
    return this.dao.deleteOrder(UUID, taskId)
  }

  insertOrder(data) {
    const UUID = uuidv4();
    return this.dao.insertOrder(UUID, data);
  }

  insertMission(phone) {
    const UUID = uuidv4();
    return this.dao.insertMission(UUID, phone);
  }

  insertMissionItem(phone) {
    const UUID = uuidv4();
    return this.dao.insertMissionItem(UUID, phone);
  }
}
