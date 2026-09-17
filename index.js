const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// // Set views folder
// app.set("views", path.join(__dirname, "views"));

// // Set EJS as template engine
// app.set("view engine", "ejs");

// // Home route
// app.get("/", (req, res) => {
//     res.render("home");
// });
app.use(express.urlencoded({ extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("Server is running");
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});