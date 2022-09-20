import { v4 as uuidv4 } from 'uuid';

export default class OrderService {
  constructor(dao) {
    this.dao = dao;
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
