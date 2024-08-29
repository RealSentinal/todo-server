import sqlite3 from "sqlite3";
import fs from "fs";

if (!fs.existsSync("./database.db")) {
    fs.writeFileSync("./database.db", "");
}

const db = new sqlite3.Database("./database.db");

export { db }