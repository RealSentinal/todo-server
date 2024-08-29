import expres from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = expres();


app.get("/ping", (req, res) => {
    res.send("pong");
})

app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
})