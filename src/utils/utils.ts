// Libs
import { db } from "./database/database";
import { Application } from "express";

// Functions
import Auth from "./auth/auth";

// Export
export default function Utils(app: Application) {
    Auth(app, db);
}