import { teamsdb } from "../../database/database";
import { Application } from "express";
import jsonwebtoken from "jsonwebtoken";

function TeamsDelete(app: Application) {
    app.delete("/teams/delete", (req, res) => {
        const { id, token } = req.body;

        jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret", (err: any, decode: any) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }

            teamsdb.run("DELETE FROM teams WHERE id = ?", [id], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Internal server error"
                    })
                }

                return res.status(200).json({
                    message: "Team deleted successfully"
                })
            })
        })
    })
}

export { TeamsDelete }