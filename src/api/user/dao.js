import { database } from '../../libs/database';
export default class Dao {
  tableName = 'user';
  constructor () {
    try {
      let result = database.prepare(`SELECT * FROM ${this.tableName}`).all();
    } catch (e) {
      /** 테이블 존재하지 않음 **/
      this.createTable();
    }
  }
  
  createTable = () => {
    let sql = `DROP TABLE IF EXISTS ${this.tableName};`;
    database.exec(sql);
    sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (id integer primary key autoincrement,
                                                        phone varchar(11), 
                                                        UUID varchar(100),
                                                        reg_date timestamp default CURRENT_TIMESTAMP
                                                        )`
    database.exec(sql);
  }

  insertUser = (UUID, phone) => {
    const queue = database.prepare(`INSERT INTO ${this.tableName} (phone,UUID) VALUES (?,?)`);
    let result = queue.run(phone,UUID);
  }

  findUserByPhone = (phone) => {
    let queue = database.prepare(`SELECT * FROM ${this.tableName} WHERE phone = ?;`);
    let result = queue.get(phone);
    return result;
  }

  findUserByUUID = (UUID) => {
    let queue = database.prepare(`SELECT * FROM ${this.tableName} WHERE UUID = ?;`);
    let result = queue.get(UUID);
    return result;
  }
}
