import Dexie from "dexie";

const dexie = new Dexie("FormBuilder");

dexie.version(1).stores({ forms: "++id" });

export class DB {
  constructor() {
    this.db = dexie;
  }

  getAll = () => this.db.table("forms").toArray();

  getById = id => this.db.table("forms").get(id);

  add = data => this.db.table("forms").add(data);

  updateById = (id, data) => this.db.table("forms").update(id, data);

  deleteById = id => this.db.table("forms").delete(id);
}
