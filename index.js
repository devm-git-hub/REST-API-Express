const express = require("express");
const path = require("path");

const app = express();

// Set views folder
app.set("views", path.join(__dirname, "views"));

// Set EJS as template engine
app.set("view engine", "ejs");

// Home route
app.get("/", (req, res) => {
    res.render("home");
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});