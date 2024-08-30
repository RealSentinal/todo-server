import jsonwebtoken from "jsonwebtoken";
import { teamsdb } from "../../database/database";
import { Application } from "express";

function TeamsCreate(app: Application) {
    app.post("/teams/create", (req, res) => {
        const { name, token } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Missing name"
            })
        }

        jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret", (err: any, decode: any) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }

            teamsdb.run("INSERT INTO teams (name, user_id) VALUES (?, ?)", [name, decode.id], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Internal server error"
                    })
                }

                return res.status(200).json({
                    message: "Team created"
                })
            })
        })
    })
}

export { TeamsCreate }