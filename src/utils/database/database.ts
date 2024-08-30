import sqlite3 from "sqlite3";
import fs from "fs";

if (!fs.existsSync("./user.db")) {
    fs.writeFileSync("./user.db", "");
}

if (!fs.existsSync("./task.db")) {
    fs.writeFileSync("./task.db", "");
}

if (!fs.existsSync("./Role.db")) {
    fs.writeFileSync("./Role.db", "");
}

if (!fs.existsSync("./teams.db")) {
    fs.writeFileSync("./teams.db", "");
}

const userdb = new sqlite3.Database("./user.db");
const taskdb = new sqlite3.Database("./task.db");
const Roledb = new sqlite3.Database("./Role.db");
const teamsdb = new sqlite3.Database("./teams.db");

userdb.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, email TEXT UNIQUE, birthday TEXT)");
taskdb.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, completed INTEGER, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id))");
Roledb.run("CREATE TABLE IF NOT EXISTS roles (id INTEGER PRIMARY KEY AUTOINCREMENT, role TEXT, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id))");
teamsdb.run("CREATE TABLE IF NOT EXISTS teams (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, user_id INTEGER, users TEXT, FOREIGN KEY (user_id) REFERENCES users(id))");

export { userdb, taskdb, teamsdb, Roledb }