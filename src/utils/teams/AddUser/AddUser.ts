import jsonwebtoken from "jsonwebtoken";
import { Application } from "express";
import { teamsdb } from "../../database/database";

function TeamsAddUser(app: Application) {
    app.post("/teams/adduser", (req, res) => {
        const token = req.body.token;
        const team_id = req.body.team_id;
        const user_id = req.body.user_id;
        jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret", (err: any, decode: any) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized",
                });
            }

            teamsdb.run("INSERT INTO team_users (team_id, user_id) VALUES (?, ?)", [team_id, user_id], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Internal server error",
                    });
                }

                return res.status(200).json({
                    message: "User added to team successfully",
                });
            });
        });
    });
}

export { TeamsAddUser };