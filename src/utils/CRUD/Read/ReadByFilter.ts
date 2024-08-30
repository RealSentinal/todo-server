import jsonwebtoken from "jsonwebtoken";
import { Application } from "express";
import { taskdb } from "../../database/database";

function ReadByFilter(app: Application) {
    app.get("/read/filter", (req, res) => {
        const { token, filter } = req.body;
        jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret", (err: any, decode: any) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }

            taskdb.all("SELECT * FROM tasks WHERE user_id = ? AND description LIKE ?", [decode.id, `%${filter}%`], (err, rows) => {
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
