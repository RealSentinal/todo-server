import { Application } from "express";
import { Database } from "sqlite3";
import { Register } from "./utils/register";
import { Login } from "./utils/login";

export default function Auth(app: Application, db: Database) {
    Register(app, db);
    Login(app, db);
}