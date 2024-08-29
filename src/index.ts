import expres from "express";
import dotenv from "dotenv";
import Utils from "./utils/utils";

dotenv.config({ path: "./.env" });

const app = expres();

Utils(app);

app.get("/ping", (req, res) => {
    res.send("pong");
})

app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
})