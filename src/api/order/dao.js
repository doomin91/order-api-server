import { database } from '../../libs/database';
export default class Dao {
  tableName = 'Tb_Order';
  constructor () {
    try {
      let sql = `DROP TABLE IF EXISTS ${this.tableName};`;
      database.exec(sql);

      let result = database.prepare(`SELECT * FROM ${this.tableName}`).all();
    } catch (e) {
      /** 테이블 존재하지 않음 **/
      this.createTable();
    }
  }
  createTable = () => {
    let sql = `DROP TABLE IF EXISTS ${this.tableName};`;
    database.exec(sql);
    sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (seq integer primary key autoincrement, phone varchar(11), UUID varchar(100))`
    database.exec(sql);
  }
}
