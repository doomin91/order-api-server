import { database } from '../../libs/database';
export default class Dao {
  tableName = 'order';
  constructor () {
    let isTable
    try {
      let result = database.prepare(`SELECT * FROM ${this.tableName}_information`).all();
    } catch (e) {
      /** 테이블 존재하지 않음 **/
      this.createOrderTable();
      
    }

    try {
      result = database.prepare(`SELECT * FROM ${this.tableName}_mission`).all();
    } catch (e) {
      /** 테이블 존재하지 않음 **/
      this.createMissionTable();
    }

    try {
      result = database.prepare(`SELECT * FROM ${this.tableName}_mission_item_image`).all();
      console.log(result)
    } catch (e) {
      /** 테이블 존재하지 않음 **/
      this.createMissionItemImageTable();
    }
  }

  createOrderTable = () => {
    let sql = `DROP TABLE IF EXISTS ${this.tableName}_information;`;
    database.exec(sql);
    // 주문 정보를 받을 테이블 저장
    sql = `CREATE TABLE IF NOT EXISTS ${this.tableName}_information (id integer primary key autoincrement, 
                                                        phone varchar(20) not null,
                                                        pickup datetime,
                                                        pickup_end datetime,
                                                        delivery datetime,
                                                        delivery_end datetime,
                                                        address_01 varchar(200) not null,
                                                        address_02 varchar(200) not null,
                                                        location varchar(200)
                                                        )`
    database.exec(sql);
  }

  createMissionTable = () =>{
    // 상품 정보를 받을 테이블 저장
    let sql = `DROP TABLE IF EXISTS ${this.tableName}_mission;`;
    database.exec(sql);
    sql = `CREATE TABLE IF NOT EXISTS ${this.tableName}_mission (id integer primary key autoincrement, 
                                                        order_id integer,
                                                        name varchar(30) not null,
                                                        user_message varchar(200),
                                                        tag_list varchar(200),
                                                        representative_item_image varchar(500)
                                                        )`
    database.exec(sql);
  }

  createMissionItemImageTable = () => {
    // 상품 내의 이미지 목록
    let sql = `DROP TABLE IF EXISTS ${this.tableName}_mission_item_image;`;
    database.exec(sql);
    sql = `CREATE TABLE IF NOT EXISTS ${this.tableName}_mission_item_image (id integer primary key autoincrement, 
                                                        mission_id integer,
                                                        image_id varchar(24) not null,
                                                        image_url varchar(300) not null
                                                        )`                                                    
    database.exec(sql);
  }

  findOrder = (phone) => {
    let queue = database.prepare(`SELECT * FROM ${this.tableName}_information WHERE phone = ?;`);
    let result = queue.get(phone);
    return result;
  }

  insertOrder = (UUID, data) => {
    const queue = database.prepare(`INSERT INTO ${this.tableName}_information (phone, pickup, pickup_end, delivery, delivery_end, address_01, address_02) VALUES (
      ?, ?, ?, ?, ?, ?, ?)`);
    let result = queue.run(UUID, 1, 2, 3, 4, 5, 6)
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
