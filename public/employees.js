function showEmployees() {
    const db = require('../db/dbLink.js');
    const cli = require('./cli.js');

    db.connect(err => {
        if (err) throw err;

        // CONCAT(managers.first_name, " ", managers.last_name ) AS Manager
        // grabs the employee.first_name and employee.last_name but we have a "LEFT JOIN" employee AS managers
        //Therefore the employee is represented as a 'manager'
        // ON employee.manager_id = managers.id, links the employees who have managers to their managers
        // while the LEFT JOIN grabs employees who DO NOT have managers

        let sqlCommand =
        `SELECT
        employee.id AS ID,
        employee.first_name AS Firstname,
        employee.last_name AS Lastname,
        role.title AS Title,
        department.name AS Department,
        role.salary AS Salary,
        CONCAT(managers.first_name, " ", managers.last_name ) AS Manager
        FROM department
        JOIN employee
        ON department.id = employee.role_id
        LEFT JOIN employee AS managers
        ON employee.manager_id = managers.id
        JOIN role
        ON role.id = department.id`

        db.query(sqlCommand, (err, res) => {
            if (err) {
                throw err;
            }
            console.log("\n");
            console.table(res);
            console.log("\n");
            cli.run();
        });
    });

}
module.exports = { showEmployees };


