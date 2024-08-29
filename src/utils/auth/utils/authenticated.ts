import { Application } from "express";
import jsonwebtoken from "jsonwebtoken";

function Authenticated(app: Application) {
    app.post("/authenticated", (req, res) => {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                message: "Missing token",
                isAuthenticated: false
            })
        }

        jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret", (err: any, decode: any) => {
            if (err) {
                return res.status(401).json({
                    isAuthenticated: false
                })
            }
            return res.status(200).json({
                isAuthenticated: true
            })
        })
    })
}

export { Authenticated }