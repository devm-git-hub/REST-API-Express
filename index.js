const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const { v4: uuidv4 } = require("uuid");


app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username: "Dev mandal",
        content: "This is my first post!"
    },
    {
        id : uuidv4(),
        username: "Adersh N",
        content: "I am a Mining Engineer!"
    },
    {
        id : uuidv4(),
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
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/id/:id", (req, res) => {
    const { id} = req.params;
    const post = posts.find(p => p.id === id);
    res.render("show.ejs", { post });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});