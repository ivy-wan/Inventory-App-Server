// Set up the server
const express = require("express");
const app = express();
const db = require("./db/db_connection");
const port = 3000;

// Configure express to use ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

// Define a route for the home page
app.get("/", (req, res) => {
    res.render("index");
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
    db.execute(read_assignments_all_sql, (error, results) => {
        if (error) res.status(500).send(error); // 500 - Internal server error
        else {
            let data = { hwlist: results };
            console.log(data);
            res.render("assignments", data);
        }
    });
});

const read_assignment_details_sql = `
SELECT
    assignmentId, title, priority, subjectName,
    assignments.subjectId as subjectId,
    DATE_FORMAT(dueDate, "%W, %M %D %Y") AS dueDateExtended, 
    DATE_FORMAT(dueDate, "%Y-%m-%d") AS dueDateYMD, 
    description
FROM assignments
JOIN subjects
    ON assignments.subjectId = subjects.subjectId
WHERE assignmentId = ?
`;

app.get("/assignments/:id", (req, res) => {
    db.execute(
        read_assignment_details_sql,
        [req.params.id],
        (error, results) => {
            if (error) res.status(500).send(error);
            else {
                let data = { hw: results[0] };
                // console.log(data);
                res.render("detail", data);
            }
        }
    );
});

// Start the server
app.listen(port, () => {
    console.log(
        `App server listening on ${port}. Go to http://localhost:${port}`
    );
});
