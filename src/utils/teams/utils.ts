import { Application } from "express";
import { TeamsCreate } from "./Create/Create";

function Teams(app: Application) {
    TeamsCreate(app);
}

export default Teams