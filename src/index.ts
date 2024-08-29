import expres, { urlencoded } from "express";
import session from "express-session";
import dotenv from "dotenv";
import Utils from "./utils/utils";

dotenv.config({ path: "./.env" });

const app = expres();
app.use(expres.json())
app.use(urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true
}))

Utils(app);

app.get("/ping", (req, res) => {
    res.send("pong");
})

app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
})