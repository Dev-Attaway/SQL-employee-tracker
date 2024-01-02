// calling the inquirer package
const inquirer = require('inquirer');
const chalk = require("chalk");
const figlet = require("figlet");
const { showDepartments } = require('./deparments.js');
const { showRoles } = require('./roles.js');
const { showEmployees } = require('./employees.js');




function init() {
  console.log(
    chalk.green(
      figlet.textSync("Employee\nManager", {
        font: "Standard",
        horizontalLayout: "full",
        verticalLayout: "controlled smushing"
      })
    )
  );
};

class CLI {

  //This function will be called in the index. js
  run() {
    init();

    const commandList = ['View All Employees', 'Add Employee', 'Update Employee Role',
      'View ALl Roles', 'Add Role', 'View All Departments', 'Add Department'];

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
      showDepartments();
      showRoles();
      showEmployees();
      // console.log(answers.command);

      });
  }

}
module.exports = CLI;
