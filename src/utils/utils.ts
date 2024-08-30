// Libs
import { userdb } from "./database/database";
import { Application } from "express";

// Functions
import Auth from "./auth/utils";
import Teams from "./teams/utils";

// Export
export default function Utils(app: Application) {
    Auth(app, userdb);
    Teams(app);
}