
function showDepartments() {

    // grabbing the script from dbLink and cli
    // dbLink.js establishes the connection to the SQL db
    const db = require('../db/dbLink.js');
    const cli = require('./cli.js');

    db.connect(err => {
        
        // display an error is an error otherwise do work 
        if (err) throw err;

        // loading a SQL command into sqlCommand        
        let sqlCommand = `SELECT
        department.id AS ID,
        department.name AS Name
        FROM 
        department`

        // sending the query to the SQL DB and returns an error(err) and response(res) => res is the list of the data collected from the query
        db.query(sqlCommand, (err, res) => {
            if (err) {
                console.log(err)
                throw err;
            }
            // console.log("\n") provides reading space for the user
            console.log("\n");
            console.table(res);
            console.log("\n");
            
            //Since 'Terminate Program' has yet to be chosen, the program is initiated again
            cli.run();
        });
    });
}
module.exports = { showDepartments };




