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

            taskdb.run("UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?", [title, description, id, decode.id], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Internal server error"
                    })
                }

                return res.status(200).json({
                    message: "Task updated successfully"
                })
            })
        })
    })
}