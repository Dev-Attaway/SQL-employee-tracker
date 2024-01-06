function showRoles() {

    // grabbing the script from dbLink and cli
    // dbLink.js establishes the connection to the SQL db
    const db = require('../db/dbLink.js');
    const cli = require('./cli.js');

    db.connect(err => {

        // display an error is error otherwise do work 
        if (err) throw err;

        // loading a SQL command into sqlCommand
        let sqlCommand = 
        `SELECT 
        role.id AS ID,
        role.title AS Title,
        department.name AS Department,
        role.salary AS Salary
        FROM department
        JOIN role
        ON role.department_id = department.id`

        // sending the query to the SQL db and returns and error(err) and response(res) => res is the list on the data collected from the query
        db.query(sqlCommand, (err, res) => {
            if (err) throw err;

            // console.log("\n") provides reading space for the user
            console.log("\n");
            console.table(res);
            console.log("\n");

            // since Terminate Program as yet to be choosen, the program is init again
            cli.run();
        });
    });

}
module.exports = { showRoles };


