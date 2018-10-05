import Dexie from "dexie";

const db = new Dexie("FormBuilder");
db.version(1).stores({ forms: "++id" });

export default db;

class DB {
  constructor() {
    this.db = new Dexie("FormBuilder").version(1).stores({ forms: "++id" });
  }

  getAll = () => this.db.table("forms").toArray();

  getById = id => this.db.table("forms").get(id);

  add = data => this.db.table("forms").add(data);

  updateById = (id, data) => this.db.table("forms").update(id, data);

  deleteById = id => this.db.table("forms").delete(id);
}
