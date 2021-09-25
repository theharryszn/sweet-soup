import express from "express";
import { Message, User } from "./entities/index.js";

const app = express();

app.use(express.json())

app.use(express.static("public"))

console.log(Message.all())

app.listen(3000, () => {
    console.log("Server has started 🚀🚀");
})