// calling the inquirer package
const inquirer = require('inquirer');
const chalk = require("chalk");
const figlet = require("figlet");
const { showDepartments } = require('./deparments.js');
const { showRoles } = require('./roles.js');
const { showEmployees } = require('./employees.js');
const { addDepartment } = require('./tools/addDep.js');
const { addRole } = require('./tools/addRole.js');
const { addEmployee } = require('./tools/addEmp.js');
const { updateEmployee } = require('./tools/updateEmpl.js');


//This function will be called in the index. js
function run() {
  const commandList = ['View All Employees', 'Add Employee', 'Update Employee Role',
    'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Terminate Program'];

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'commmand',
        message: 'What would you like to do?',

        // 'View All Employees', 'Add Employee', 'Update Employee Role',
        //'View ALl Roles', 'Add Role', 'View All Departments', 'Add Department'
        choices: commandList
      }
    ])

    // based upon the answer from the user we want to execute the command
    .then((answers) => {
      if (answers.commmand === 'View All Departments') {
        console.log("Viewing All Departments: \n\n\n\n");
        showDepartments();
      }
      else if (answers.commmand === 'View All Roles') {
        console.log("Viewing Roles: ");
        showRoles();
      }
      else if (answers.commmand === 'View All Employees') {
        console.log("Viewing Employees: ");
        showEmployees();
      }
      else if (answers.commmand === 'Add Department')
        addDepartment();

      else if (answers.commmand === 'Add Role')
        addRole();

      else if (answers.commmand === 'Add Employee')
        addEmployee();

      else if (answers.commmand === 'Update Employee Role')
        updateEmployee();
      else
        terminate();
    });
}

function init() {
  console.log(
    chalk.green(
      figlet.textSync("Employee\nManager", {
        font: "standard",
        horizontalLayout: "full",
        verticalLayout: "controlled smushing"
      })
    )
  );
}
function terminate() {
  console.log(
    chalk.redBright(
      figlet.textSync("Program", {
        font: "isometric2",
        horizontalLayout: "default",
        verticalLayout: "default",
        whitespaceBreak: false
      })
    )
    + '\n \n' +
    chalk.redBright(
      figlet.textSync("Terminated", {
        font: "isometric2",
        horizontalLayout: "default",
        verticalLayout: "default",
        whitespaceBreak: false
      })

    )
  );
  process.exit(0);
}

module.exports = { run, init };
