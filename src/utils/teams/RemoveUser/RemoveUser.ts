import jsonwebtoken from "jsonwebtoken";
import { Application } from "express";
import { teamsdb } from "../../database/database";

function TeamsRemoveUser(app: Application) {
    app.post("/api/teams/removeuser", (req, res) => {
        const { token, username } = req.body;
        jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret", (err: any, decode: any) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized",
                });
            }

            teamsdb.run("DELETE FROM team_users WHERE team_id = (SELECT id FROM teams WHERE name = ? AND user_id = ?) AND user_id = ?", [username, decode.id, decode.id], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Internal server error",
                    });
                }

                return res.status(200).json({
                    message: "User removed from team successfully",
                });
            });
        });
    });
}

export { TeamsRemoveUser }