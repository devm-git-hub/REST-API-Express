const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        username: "Dev mandal",
        content: "This is my first post!"
    },
    {
        username: "Adersh N",
        content: "I am a Mining Engineer!"
    },
    {
        username: "Ganesh N",
        content: "I got a internship at Qspider."
    }
];

app.get("/posts", (req, res) => {
    res.render("home", { posts: posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    posts.push({ username, content });
    
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});