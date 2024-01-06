
function addRole() {

    // grabbing the script from dbLink and cli
    // dbLink.js establishes the connection to the SQL db
    // We will require the inquirer package to ask sub-queries winthin the main query of 'Add roles'
    // We will also require the showRoles functions to show to the console the our new roles was apended
    const db = require('../../db/dbLink.js');
    const inquirer = require('inquirer');
    const { showRoles } = require('../roles.js');

    db.connect(err => {
        if (err) throw err;

        // though we adding a new role, we only need the name of the department that the new role will belong to
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

                            // traverses and pushes the department.name varaibles onto the array
                            // which is displayed to user as a sub-query of possible roles to choose from 
                            array.push(result[i].name);
                        }
                        return array;
                    }
                }
            ])
                .then((answers) => {
                    // Comparing the result and storing it into the variable department
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