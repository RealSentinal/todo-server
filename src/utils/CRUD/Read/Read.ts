import jsonwebtoken from "jsonwebtoken";
import { Application } from "express";
import { taskdb } from "../../database/database";

function Read(app: Application) {
    app.get("/read", (req, res) => {
        const { token } = req.body;
        jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret", (err: any, decode: any) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }

            taskdb.all("SELECT * FROM tasks WHERE user_id = ?", [decode.id], (err, rows) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Internal server error"
                    })
                }

                return res.status(200).json({
                    tasks: rows
                })
            })
        })
    })
}