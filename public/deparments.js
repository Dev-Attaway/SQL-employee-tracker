
function showDepartments() {
    const mysql = require('mysql2');

    // Connect to database
    const db = mysql.createConnection(
        {
            host: 'localhost',
            // MySQL username,
            user: 'root',
            // MySQL password
            password: 'Fuckyourdata$#@!1234',
            database: 'company_db'
        },
    );

    let sqlCommand = 'SELECT * FROM department'

    db.query(sqlCommand, (err, res) => {
        if (err) {
            return err;
        }
        console.log(res)
    });
}
module.exports = { showDepartments };




