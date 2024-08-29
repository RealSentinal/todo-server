import { Application } from "express";
import { Database } from "sqlite3";
import { Register } from "./utils/register";
import { Login } from "./utils/login";
import { Authenticated } from "./utils/authenticated";

export default function Auth(app: Application, db: Database) {
    Authenticated(app);
    Register(app, db);
    Login(app, db);
}