import bcrypt from "bcrypt";
import { Application } from "express";
import { Database } from "sqlite3";

function Register(app: Application, db: Database) {
    app.post("/register", async (req, res) => {
        const { username, password, email, birthday } = req.body;

        //regex
        const UsernameRegex = /^[a-zA-Z\d]+$/
        const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        const EmailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/

        //check if all required fields are filled
        if (!username || !password || !email || !birthday) {
            return res.status(400).json({
                message: "Missing required fields"
            })
        }

        //check if username is valid
        if (!UsernameRegex.test(username)) {
            return res.status(400).json({
                message: "Invalid username"
            })
        }

        //check if password is valid
        if (!PasswordRegex.test(password)) {
            return res.status(400).json({
                message: "Invalid password"
            })
        }

        //check if email is valid
        if (!EmailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email"
            })
        }

        //check if username is already taken
        db.all("SELECT * FROM users WHERE username = ?", [username], (err, rows) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Internal server error"
                })
            }

            if (rows.length > 0) {
                return res.status(400).json({
                    message: "Username already taken"
                })
            }
        })


        //check if email is already taken
        db.all("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Internal server error"
                })
            }

            if (rows.length > 0) {
                return res.status(400).json({
                    message: "Email already taken"
                })
            }
        })

        //hash password
        const HashedPassword = await bcrypt.hash(password, 10)

        //insert user into database
        db.run("INSERT INTO users (username, password, email, birthday) VALUES (?, ?, ?, ?)", [username, HashedPassword, email, birthday], (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Internal server error",
                })
            }

            return res.status(200).json({
                message: "User registered successfully",
            })
        })
    })
}

export { Register }