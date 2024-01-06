
function addDepartment() {

    // grabbing the script from dbLink and cli
    // dbLink.js establishes the connection to the SQL db
    // We will require the inquirer package to ask sub-queries winthin the main query of 'Add Department'
    // We will also require the showDepartments functions to show to the console the our new department was apended
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

            // determines if the answer provided by user is truthy 
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                }

                // do not pass on, user must provide name or ^C(kills app) to continue
                else {
                    console.log('Please Add A Department!');
                    return false;
                }
            }
        }])
        .then((answers) => {

            // INSERT the data of answers.department into the variable [name VARCHAR(30)] 
            // this new item who was created using the 'TABLE department' found in db\schema.sql
            // is appended into the db
            let sqlCommand = 'INSERT INTO department (name) VALUES (?)'
            db.query(sqlCommand, answers.department, (err) => {
                if (err) throw err;

                console.log(`Added ${answers.department} to the database.`)
                showDepartments();
            });
        })
    });

}

module.exports = { addDepartment };