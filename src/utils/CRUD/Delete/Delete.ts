import jsonwebtoken from "jsonwebtoken";
import { Application } from "express";
import { taskdb } from "../../database/database";

function Delete(app: Application) {
    app.delete("/delete", (req, res) => {
        const { token, id } = req.body;
        jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret", (err: any, decode: any) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }

            taskdb.run("DELETE FROM tasks WHERE id = ?", [id], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Internal server error"
                    })
                }

                return res.status(200).json({
                    message: "Task deleted successfully"
                })
            })
        })
    })
}
