import { Application } from "express";
import { TeamsCreate } from "./Create/Create";
import { TeamsDelete } from "./Delete/Delete";
import { TeamsRename } from "./Rename/Rename";
import { TeamsAddUser } from "./AddUser/AddUser";
import { TeamsRemoveUser } from "./RemoveUser/RemoveUser";

function Teams(app: Application) {
    TeamsCreate(app);
    TeamsDelete(app);
    TeamsRename(app);
    TeamsAddUser(app);
    TeamsRemoveUser(app);
}

export default Teams