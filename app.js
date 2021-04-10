const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const employeeSummary = [];

function init() {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "Enter employee name",
                name: "empName",
            },
            {
                type: "input",
                message: "Enter employee email",
                name: "empEmail",
            },
            {
                type: "input",
                message: "Enter employee id",
                name: "empId",
            },
            {
                type: "list",
                message: "Select employee role",
                name: "empRole",
                choices: ["Intern", "Engineer", "Manager"]
            },
        ]
    )
    .then((res) => {
        const empRole = res.empRole
        if (empRole === "Intern") {
            inquirer.prompt(
                [
                    {
                        type: "input",
                        message: "Enter intern's school.",
                        name: "intSchool",
                    },
                    {
                        type: "list",
                        message: "Select next task",
                        name: "task",
                        choices: ["Insert new employee", "Exit"]
                    },
                ]
            )
            .then((res) => {
                const intEmployee = new Intern(res.empName, res.empID, res.empEmail, res.intSchool,)
                employeeSummary.push(intEmployee)

                if(res.task === "Insert new employee") {
                    init();
                } else {
                    createEmployeeSummary();
                }
            })

        } else if (empRole === "Engineer") {
            inquirer.prompt(
                [
                    {
                        type: "input",
                        message: "Enter engineer's github.",
                        name: "engGithub",
                    },
                    {
                        type: "list",
                        message: "Select next task",
                        name: "task",
                        choices: ["Insert new employee", "Exit"]
                    },
                ]
            )
            .then((res) => {
                const engEmployee = new Engineer(res.empName, res.empID, res.empEmail, res.engGithub)
                employeeSummary.push(engEmployee)

                if(res.task === "Insert new employee") {
                    init();
                } else {
                    createEmployeeSummary();
                }
            })

        } else if (empRole === "Manager") {
            inquirer.prompt(
                [
                    {
                        type: "input",
                        message: "Enter manager's office number.",
                        name: "mngOffice",
                    },
                    {
                        type: "list",
                        message: "Select next task",
                        name: "task",
                        choices: ["Insert new employee", "Exit"]
                    },
                ]
            )
            .then((res) => {
                const mngEmployee = new Manager(res.empName, res.empID, res.empEmail, res.mngOffice)
                employeeSummary.push(mngEmployee)

                if(res.task === "Insert new employee") {
                    init();
                } else {
                    createEmployeeSummary();
                }
            })
        }
    })
}

const createEmployeeSummary = () => {
    fs.writeFile(outputPath, render(employeeSummary), (err) => {
        if (err) throw err;
        console.log("Employee Summary created!");
    })
};

init();