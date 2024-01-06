function updateEmployee() {
    const db = require('../../db/dbLink.js');
    const inquirer = require('inquirer');
    const { showEmployees } = require('../employees.js');

    db.connect(err => {
        if (err) throw err;
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
                                // array.push(employees[i].first_name +" "+ employees[i].last_name);
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
                    
                    // Comparing the employees and storing it into the variable
                    console.log(answers);
                    db.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [roleID, selectedName], (err) => {
                        if (err) throw err;
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`);
                        showEmployees();
                    });

                })
            });
        });
    });
}
module.exports = {updateEmployee};
