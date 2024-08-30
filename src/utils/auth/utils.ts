import { Application } from "express";
import { Database } from "sqlite3";
import { Register } from "./auth/register";
import { Login } from "./auth/login";
import { Authenticated } from "./auth/authenticated";

export default function Auth(app: Application, db: Database) {
    Authenticated(app);
    Register(app, db);
    Login(app, db);
}