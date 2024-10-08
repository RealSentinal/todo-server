import { Application } from "express";
import { Database } from "sqlite3";
import JsonWebToken from "jsonwebtoken";
import bcrypt from "bcrypt";

interface User {
    username: string;
    password: string;
}

function Login(app: Application, db: Database) {
    app.post("/login", async (req, res) => {
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({
                message: "Missing required fields",
            });
        }

        db.get("SELECT * FROM users WHERE username = ?", [username], (err, row: User) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Internal server error",
                });
            }

            // Check if user exists
            if (!row) {
                return res.status(401).json({
                    message: "Invalid username",
                });
            }

            // Check if password is correct
            if (!bcrypt.compareSync(password, row.password)) {
                return res.status(401).json({
                    message: "Invalid password",
                });
            }
        })

        const token = JsonWebToken.sign({ username: username }, process.env.TOKEN_SECRET || "secret", { expiresIn: "1h" });

        // Store user in session
        req.session.user = {
            username: username,
            isAuth: true,
            token: token
        }

        // Return response
        return res.status(200).json({
            message: "Login successful",
            token: token
        });
    });
}

export { Login }