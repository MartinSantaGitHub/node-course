import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

app.use(express.static("public", { extensions: ["html"] }));

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials", (err) => {});

app.get("/", (req, res) => {
    res.render("home", {
        name: "Santa",
        title: "Node Course",
    });
});

app.get("/generic", (req, res) => {
    res.render("generic", {
        name: "Santa",
        title: "Node Course",
    });
});

app.get("/elements", (req, res) => {
    res.render("elements", {
        name: "Santa",
        title: "Node Course",
    });
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(port, () => console.log("Listening to the port", port));
