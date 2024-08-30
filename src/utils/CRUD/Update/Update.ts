import jsonwebtoken from "jsonwebtoken";
import { Application } from "express";
import { taskdb } from "../../database/database";

function Update(app: Application) {

    app.put("/update", (req, res) => {
        const { token, id, title, description } = req.body;
        jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret", (err: any, decode: any) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }

        })
    })
}