function addEmployee() {
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
                        // Adding Employee First Name
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the employees first name?',
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true;
                            } else {
                                console.log('Please Add A First Name!');
                                return false;
                            }
                        }
                    },
                    {
                        // Adding Employee Last Name
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the employees last name?',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        // Adding Employee Role
                        type: 'list',
                        name: 'role',
                        message: 'What is the employees role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < roles.length; i++) {
                                array.push(roles[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the Manager',
                        choices: () => {
                            var array = [];
                            array.push('None');
                            for (var i = 0; i < employees.length ; i++) {
                                // array.push(employees[i].first_name +" "+ employees[i].last_name);
                                array.push(employees[i].first_name + " " + employees[i].last_name);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    }
                ]).then((answers) => {
                    // Comparing the employees and storing it into the variable
                    console.log(answers);

                    for (var i = 0; i < employees.length; i++) {
                        let managerName = employees[i].first_name + " " + employees[i].last_name;
                        if (managerName == answers.manager) {
                            var manager = employees[i].id
                        }
                    }

                    for (var i = 0; i < roles.length; i++) {
                        if (roles[i].title === answers.role) {
                            var roleID = roles[i].id;
                        }
                    }
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, roleID, manager], (err, employees) => {
                        if (err) throw err;
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`);
                        showEmployees();
                    });
                })
            });
        });
    });
}
module.exports = { addEmployee };