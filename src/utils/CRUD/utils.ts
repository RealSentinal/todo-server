import { Application } from "express";
import { Create } from "./Create/Create";

function CRUD(app: Application) {
    Create(app);
}

export default CRUD