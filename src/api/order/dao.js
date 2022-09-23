import { database } from '../../libs/database';
export default class Dao {
  tableName = 'order';
  constructor () {
    let isThereTable
    try { isThereTable = database.prepare(`SELECT * FROM ${this.tableName}_information`).all(); }        catch (e) { this.createOrderTable(); }
    try { isThereTable = database.prepare(`SELECT * FROM ${this.tableName}_mission`).all(); }            catch (e) { this.createMissionTable(); }
    try { isThereTable = database.prepare(`SELECT * FROM ${this.tableName}_mission_item_image`).all(); } catch (e) { this.createMissionItemImageTable(); }
  }

  createOrderTable = () => {
    let sql = `DROP TABLE IF EXISTS ${this.tableName}_information;`;
    database.exec(sql);
    sql = `CREATE TABLE IF NOT EXISTS ${this.tableName}_information (id integer primary key autoincrement, 
                                                        UUID varchar(50) not null,
                                                        phone varchar(20) not null,
                                                        pickup datetime,
                                                        pickup_end datetime,
                                                        delivery datetime,
                                                        delivery_end datetime,
                                                        address_01 varchar(200) not null,
                                                        address_02 varchar(200) not null,
                                                        location varchar(200),
                                                        del_yn char(1) default 'n',
                                                        mod_date timestamp,
                                                        reg_date timestamp default CURRENT_TIMESTAMP
                                                        )`
    database.exec(sql);
  }

  createMissionTable = () =>{
    let sql = `DROP TABLE IF EXISTS ${this.tableName}_mission;`;
    database.exec(sql);
    sql = `CREATE TABLE IF NOT EXISTS ${this.tableName}_mission (id integer primary key autoincrement, 
                                                        UUID varchar(50) not null,
                                                        order_id integer,
                                                        name varchar(30) not null,
                                                        user_message varchar(200),
                                                        tag_list varchar(200),
                                                        representative_item_image varchar(500),
                                                        del_yn char(1) default 'n',
                                                        mod_date timestamp,
                                                        reg_date timestamp default CURRENT_TIMESTAMP
                                                        )`
    database.exec(sql);
  }

  createMissionItemImageTable = () => {
    let sql = `DROP TABLE IF EXISTS ${this.tableName}_mission_item_image;`;
    database.exec(sql);
    sql = `CREATE TABLE IF NOT EXISTS ${this.tableName}_mission_item_image (id integer primary key autoincrement, 
                                                        UUID varchar(50) not null,
                                                        order_id integer,
                                                        mission_id integer,
                                                        image_url varchar(300) not null,
                                                        del_yn char(1) default 'n',
                                                        mod_date timestamp,
                                                        reg_date timestamp default CURRENT_TIMESTAMP
                                                        )`                                                    
    database.exec(sql);
  }

  orderList = (UUID) => {
    let queue = database.prepare(`
    SELECT * FROM ${this.tableName}_information WHERE UUID = ? and del_yn = 'n';`);
    let result = queue.all(UUID);
    return result;
  }

  findOrderById = (UUID, taskId) => {
    let queue = database.prepare(`SELECT * FROM ${this.tableName}_information WHERE UUID = ? and id = ? and del_yn = 'n'`);
    let result = queue.get(UUID, taskId);
    return result;
  }

  deleteOrder = (UUID, taskId) => {
    let queue = database.prepare(`UPDATE ${this.tableName}_information SET del_yn = 'y' where UUID = ? and id = ?`);
    let result = queue.run(UUID, taskId);
    return result;
  }

  insertOrder = (UUID, data) => {
    const queue = database.prepare(`INSERT INTO ${this.tableName}_information (UUID, phone, pickup, pickup_end, delivery, delivery_end, address_01, address_02, location) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    let result = queue.run(UUID, data.phone, data.pickup, data.pickupEnd, data.delivery, data.deliveryEnd, data.address_01, data.address_02, data.location)
    return result
  }

  findMissionByTaskId = (UUID, taskId) => {
    let queue = database.prepare(`SELECT * FROM ${this.tableName}_mission WHERE UUID = ? and order_id = ? and del_yn = 'n'`);
    let result = queue.all(UUID, taskId);
    return result
  }

  insertMission = (UUID, taskId, data) => {
    const queue = database.prepare(`INSERT INTO ${this.tableName}_mission (UUID, order_id, name, user_message, tag_list, representative_item_image) VALUES (?, ?, ?, ?, ?, ?)`)
    let result = queue.run(UUID, taskId, data.name, data.userMessage, data.tagList, data.representativeItemImage);
    return result;
  }

  deleteMission = (UUID, taskId, missionId) => {
    let queue = database.prepare(`UPDATE ${this.tableName}_mission SET del_yn = 'y' where UUID = ? and order_id = ? and id = ?`);
    let result = queue.run(UUID, taskId, missionId);
    return result;
  }

  findMissionImageByMissionId = (UUID, missionId) => {
    let queue = database.prepare(`SELECT * FROM ${this.tableName}_mission_item_image WHERE UUID = ? and mission_id = ? and del_yn = 'n'`);
    let result = queue.all(UUID, missionId);
    return result
  }

  insertMissionImage = (UUID, taskId, missionId, data) => {
    console.log(UUID, taskId, missionId, data)
    const queue = database.prepare(`INSERT INTO ${this.tableName}_mission_item_image (UUID, order_id, mission_id, image_url) VALUES (?, ?, ?, ?)`)
    let result = queue.run(UUID, taskId, missionId, data.imageURL);
    return result;
  }

  deleteMissionImage = (UUID, taskId, missionId, imageId) => {
    let queue = database.prepare(`UPDATE ${this.tableName}_mission_item_image SET del_yn = 'y' where UUID = ? and order_id = ? and mission_id = ? and id = ?`);
    let result = queue.run(UUID, taskId, missionId, imageId);
    return result;
  }

}
