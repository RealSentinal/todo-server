import { Application } from "express";
import { TeamsCreate } from "./Create/Create";
import { TeamsDelete } from "./Delete/Delete";
import { TeamsRename } from "./Rename/Rename";

function Teams(app: Application) {
    TeamsCreate(app);
    TeamsDelete(app);
    TeamsRename(app);
}

export default Teams