// Set up the server
const express = require("express");
const app = express();
const db = require("./db/db_connection");
const port = 3000;

app.use(express.static(__dirname + "/public"));

// Define a route for the home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

const read_assignments_all_sql = `
    select assignmentId, title, priority, subjectName,
    assignments.subjectId as subjectId,
    DATE_FORMAT(dueDate, "%m/%d/%Y (%W)") AS dueDateFormatted
    from assignments
    join subjects 
    on assignments.subjectId = subjects.subjectId
    order by assignments.assignmentId DESC
`;
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
