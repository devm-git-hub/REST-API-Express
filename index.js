const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Posts
let posts = [
    {
        id: uuidv4(),
        username: "Dev mandal",
        content: "This is my first post!"
    },
    {
        id: uuidv4(),
        username: "Adersh N",
        content: "I am a Mining Engineer!"
    },
    {
        id: uuidv4(),
        username: "Ganesh N",
        content: "I got a internship at Qspider."
    }
];

// Show all posts
app.get("/posts", (req, res) => {
    res.render("home", { posts: posts });
});

// Show new post form
app.get("/posts/new", (req, res) => {
    res.render("new");
});

// Create new post
app.post("/posts", (req, res) => {
    const { username, content } = req.body;

    const id = uuidv4();

    posts.push({
        id,
        username,
        content
    });

    res.redirect("/posts");
});

// Show single post
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;

    const post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("show", { post });
});

// Show edit form
app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;

    const post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit", { post });
});

// Update post
app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { username, content } = req.body;

    const post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.username = username;
    post.content = content;

    res.redirect(`/posts/${id}`);
});

// Delete post
app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});