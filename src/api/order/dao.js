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
                                                        mission_id integer,
                                                        image_id varchar(24) not null,
                                                        image_url varchar(300) not null,
                                                        del_yn char(1) default 'n',
                                                        mod_date timestamp,
                                                        reg_date timestamp default CURRENT_TIMESTAMP
                                                        )`                                                    
    database.exec(sql);
  }

  findOrder = (phone) => {
    let queue = database.prepare(`SELECT * FROM ${this.tableName}_information WHERE phone = ? and del_yn = 'n';`);
    let result = queue.get(phone);
    console.log(result)
    return result;
  }

  findOrderById = (phone, taskId) => {
    let queue = database.prepare(`SELECT * FROM ${this.tableName}_information WHERE phone = ? and id = ? del_yn = 'n'`);
    let result = queue.get(UUID, taskId);
    return result;
  }

  deleteOrder = (phone, taskId) => {
    let queue = database.prepare(`UPDATE ${this.tableName}_information SET del_yn = 'y' WHERE phone = ? and id = ?`);
    let result = queue.run(UUID, taskId);
    return result;
  }

  insertOrder = (phone, data) => {
    const queue = database.prepare(`INSERT INTO ${this.tableName}_information (phone, pickup, pickup_end, delivery, delivery_end, address_01, address_02) VALUES (
      ?, ?, ?, ?, ?, ?, ?)`);
    let result = queue.run(phone, 1, 2, 3, 4, 5, 6)
    return result
  }

  findMission = (orderId) => {
    let queue = database.prepare(`SELECT * FROM ${this.tableName}_mission WHERE order_id = ?;`);
    let result = queue.get(orderId);
    return result;
  }

  findMissionItem = (missionId) => {
    let queue = database.prepare(`SELECT * FROM ${this.tableName}_mission_item_list WHERE order_id = ?;`);
    let result = queue.get(missionId);
    return result;
  }

}
