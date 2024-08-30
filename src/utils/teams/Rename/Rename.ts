import { teamsdb } from "../../database/database";
import { Application } from "express";
import jsonwebtoken from "jsonwebtoken";

function TeamsRename(app: Application) {
    app.post("/teams/rename", (req, res) => {
        const token = req.body.token;
        const team_id = req.body.team_id;
        const new_name = req.body.new_name;
        jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret", (err: any, decode: any) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }

            teamsdb.run("UPDATE teams SET name = ? WHERE id = ? AND user_id = ?", [new_name, team_id, decode.id], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Internal server error"
                    })
                }

                return res.status(200).json({
                    message: "Team renamed successfully"
                })
            })
        })
    })
}

export { TeamsRename }