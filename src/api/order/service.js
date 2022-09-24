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

  findMissionByTaskId(UUID, taskId){
    return this.dao.findMissionByTaskId(UUID, taskId)
  }

  insertMission(UUID, taskId, data) {
    return this.dao.insertMission(UUID, taskId, data);
  }

  deleteMission(UUID, taskId, missionId) {
    return this.dao.deleteMission(UUID, taskId, missionId);
  }

  findMissionImageByMissionId(UUID, missionId){
    return this.dao.findMissionImageByMissionId(UUID, missionId)
  }

  insertMissionImage(UUID, taskId, missionId, data) {
    return this.dao.insertMissionImage(UUID, taskId, missionId, data);
  }

  deleteMissionImage(UUID, taskId, missionId, imageId) {
    return this.dao.deleteMissionImage(UUID, taskId, missionId, imageId);
  }
}
