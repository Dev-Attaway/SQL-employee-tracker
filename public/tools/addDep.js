
function addDepartment() {

    const db = require('../../db/dbLink.js');
    const inquirer = require('inquirer');
    const { showDepartments } = require('../deparments.js');


    db.connect(err => {
        if (err) throw err;

        inquirer.prompt([{
            // Adding a Department
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?',
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                }
                else {
                    console.log('Please Add A Department!');
                    return false;
                }
            }
        }])
        .then((answers) => {
            let sqlCommand = 'INSERT INTO department (name) VALUES (?)'
            db.query(sqlCommand, answers.department, (err, res) => {

                if (err) {
                    return err;
                }
                console.log(`Added ${answers.department} to the database.`)
                showDepartments();
            });
        })
    });

}

module.exports = { addDepartment };