const db = require("./db_connection");

// Delete contents of existing tables.

const delete_assignments_table_sql = "delete from assignments";

db.execute(delete_assignments_table_sql);

const delete_subjects_table_sql = "delete from subjects";

db.execute(delete_subjects_table_sql);

// Insert data into the assignments table

const insert_subject_sql = `
    insert into subjects
        (subjectId, subjectName)
    values
        (?, ?);
`;
db.execute(insert_subject_sql, [1, "Comp Sci"]);
db.execute(insert_subject_sql, [2, "Math"]);
db.execute(insert_subject_sql, [3, "English"]);
db.execute(insert_subject_sql, [4, "History"]);
