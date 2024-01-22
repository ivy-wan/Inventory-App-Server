// Set up the server
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));

// Define a route for the home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/assignments", (req, res) => {
    res.sendFile(__dirname + "/views/assignments.html");
});

app.get("/assignments/details", (req, res) => {
    res.sendFile(__dirname + "/views/detail.html");
});

// Start the server
app.listen(port, () => {
    console.log(
        `App server listening on ${port}. Go to http://localhost:${port}`
    );
});
