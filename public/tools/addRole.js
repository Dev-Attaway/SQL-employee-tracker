
function addRole() {

    const db = require('../../db/dbLink.js');
    const inquirer = require('inquirer');
    const { showRoles } = require('../roles.js');


    db.connect(err => {
        if (err) throw err;

        db.query(`SELECT * FROM department`, (err, result) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    // Adding a role
                    type: 'input',
                    name: 'role',
                    message: 'What is the name of the role?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        }

                        else {
                            console.log('Please Add A role!');
                            return false;
                        }
                    }
                },
                {
                    // Adding a role
                    type: 'input',
                    name: 'salary',
                    message: 'The salary?',
                    validate: salaryInput => {
                        if (salaryInput) {
                            return true;
                        }
                        else {
                            console.log('Please Add A salary!');
                            return false;
                        }
                    }
                },
                {
                    // Department
                    type: 'list',
                    name: 'department',
                    message: 'Which department does the role belong to?',
                    choices: () => {
                        var array = [];
                        for (var i = 0; i < result.length; i++) {
                            array.push(result[i].name);
                        }
                        return array;
                    }
                }

            ])
                .then((answers) => {
                    // Comparing the result and storing it into the variable
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].name === answers.department) {
                            var department = result[i];
                        }
                    }

                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database.`)
                        showRoles();
                    });
                })
        });
    })
}

module.exports = { addRole };