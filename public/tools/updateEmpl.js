function updateEmployee() {

    // grabbing the script from dbLink and cli
    // dbLink.js establishes the connection to the SQL DB
    // We will require the inquirer package to ask sub-queries within the main query of 'Update employees'
    // We will also require the showEmployees functions to show to the console that our employee's new role was updated
    const db = require('../../db/dbLink.js');
    const inquirer = require('inquirer');
    const { showEmployees } = require('../employees.js');

    db.connect(err => {
        if (err) throw err;

        // To grab all the required data from the two tables, we have to approach this via a nested query
        // Due to both tables which have variables that are equal in name id (employee) = id (role)
        //The result of the query hold renders 'meshed' data from both tables making it useless for evaluation
        db.query(`SELECT * FROM employee`, (err, employees) => {
            if (err) throw err;
            db.query(`SELECT * FROM role`, (err, roles) => {
                if (err) throw err;
                inquirer.prompt([

                    {
                        type: 'list',
                        name: 'selectedName',
                        message: "Which employee's role do you want to update?",
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < employees.length; i++) {

                                // traverses and pushes the roles.title variables onto the array
                                // which is displayed to the user as a sub-query of possible employees to choose from                                
                                array.push(employees[i].first_name + " " + employees[i].last_name);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        // Adding Employee Role
                        type: 'list',
                        name: 'role',
                        message: "Which role do you want to assign the selected employee?",
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < roles.length; i++) {
                                array.push(roles[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    }
                ])
                    .then((answers) => {

                    // Comparing the employees and roles, and storing it into the selectedName and roleID
                        for (var i = 0; i < employees.length; i++) {
                            let employeeName = employees[i].first_name + " " + employees[i].last_name;
                            if (employeeName == answers.selectedName) {
                                var selectedName = employees[i].id
                            }
                        }
                        for (var i = 0; i < roles.length; i++) {
                            if (roles[i].title === answers.role) {
                                var roleID = roles[i].id;
                            }
                        }
                        db.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [roleID, selectedName], (err) => {
                            if (err) throw err;
                            console.log(`Updated ${answers.firstName} ${answers.lastName}'s role.`);
                            showEmployees();
                        });

                    })
            });
        });
    });
}
module.exports = { updateEmployee };
