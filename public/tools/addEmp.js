function addEmployee() {

    // grabbing the script from dbLink and cli
    // dbLink.js establishes the connection to the SQL DB
    // We will require the inquirer package to ask sub-queries within the main query of 'Add employees'
    // We will also require the showEmployees functions to show to the console that our new employees were appended
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
                        // Adding Employee First Name
                        type: 'input',
                        name: 'firstName',
                        message: "What is the employee's first name?",
                        validate: firstNameInput => {

                            // determines if the answer provided by the user is truthy                            
                            if (firstNameInput) {
                                return true;
                            } else {

                                // do not pass on, user must provide name or ^C(kills app) to continue
                                console.log('Please Add A First Name!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: "What is the employee's last name?",
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
                        message: "What is the employee's role?",
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < roles.length; i++) {

                                // traverses and pushes the roles.title variables onto the array
                                // which is displayed to user as a sub-query of possible roles to choose from 
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
                            for (var i = 0; i < employees.length; i++) {

                                // traverses and pushes the roles.title variables onto the array
                                // which is displayed to the user as a sub-query of possible managers to choose from 
                                array.push(employees[i].first_name + " " + employees[i].last_name);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    }
                ]).then((answers) => {

                    // Comparing the employees and roles, and storing it into the managerName and roleID
                    for (var i = 0; i < employees.length; i++) {
                        let managerName = employees[i].first_name + " " + employees[i].last_name;
                        if (managerName == answers.manager) {
                            var manager = employees[i].id
                        }
                    }

                    for (var i = 0; i < roles.length; i++) {
                        if (roles[i].title == answers.role) {
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
