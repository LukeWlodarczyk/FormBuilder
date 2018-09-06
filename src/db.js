import Dexie from "dexie";

const db = new Dexie("FormBuilder");
db.version(1).stores({ forms: "++id" });

export default db;
