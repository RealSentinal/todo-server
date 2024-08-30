// Libs
import { userdb } from "./database/database";
import { Application } from "express";

// Functions
import Auth from "./auth/utils";

// Export
export default function Utils(app: Application) {
    Auth(app, userdb);
}