import { Application } from "express";
import jsonwebtoken from "jsonwebtoken";
import { taskdb } from "../../database/database";

function Create(app: Application) {
    app.post("/create", (req, res) => {
        const { description, token } = req.body;

        // Check if description is provided
        if (!description) {
            return res.status(400).json({
                message: "Missing description"
            })
        }

        jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret", (err: any, decode: any) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }
            taskdb.run("INSERT INTO tasks (description, completed, user_id) VALUES (?, ?, ?)", [description, 0, decode.id], (err) => {
                // If there is an error, return an error message
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Internal server error"
                    })
                }

                // If there is no error, return a success message
                return res.status(200).json({
                    message: "Task created successfully"
                })
            })
        })
    })
}

export { Create }