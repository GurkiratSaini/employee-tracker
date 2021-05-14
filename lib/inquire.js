const db = require('../config/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const queries = require('./queries');
const menuOptions = require('./menuOptions');

const util = require('util');
const query = util.promisify(db.query).bind(db);

function init() {
    return inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            choices: menuOptions,
            message: 'What would you like to do?'
        }
    ])
    .then(answer => {
        // console.log(answer);
        if(answer.action === 'Exit') {
            console.log('Thank you for using Employee Tracker App.');
            exitProgram();
        }
        else {
            switch (answer.action) {
                case menuOptions[0]:
                    viewAllDepartments();
                    break;

                case menuOptions[1]:
                    viewAllRoles();
                    break;

                case menuOptions[2]:
                    viewAllEmployees();
                    break;

                case menuOptions[3]:
                    addDepartment();
                    break;

                case menuOptions[4]:
                    console.log(menuOptions[4])
                    break;

                case menuOptions[5]:
                    console.log(menuOptions[5])
                    break;

                case menuOptions[6]:
                    console.log(menuOptions[6])
                    break;

                case menuOptions[7]:
                    console.log(menuOptions[7])
                    break;

                case menuOptions[8]:
                    console.log(menuOptions[8])
                    break;

                case menuOptions[9]:
                    console.log(menuOptions[9])
                    break;

                case menuOptions[10]:
                    console.log(menuOptions[10])
                    break;

                case menuOptions[11]:
                    console.log(menuOptions[11])
                    break;

                case menuOptions[12]:
                    console.log(menuOptions[12])
                    break;

                case menuOptions[13]:
                    console.log(menuOptions[13])
                    break;
            }
        }
    })
}

function getDepartments() {
    return query(queries.viewAllDepartments);
}

function getRoles() {
    return query(queries.viewAllRoles);
}

function getEmployees() {
    return query(queries.viewAllEmployees);
}

async function viewAllDepartments() {
    try {
        const rows = await getDepartments();
        console.table(rows);
        init();
    }
    catch (err) {
        console.log(err);
    }
}

async function viewAllRoles() {
    try{
        const rows = await getRoles();
        console.table(rows);
        init();
    }
    catch (err) {
        console.log(err);
    }
}

async function viewAllEmployees() {
    try {
        const rows = await getEmployees();
        console.table(rows);
        init();
    }
    catch (err) {
        console.log(err);
    }
}

async function addDepartment() {
    try {
        const promptUser = () => {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Please enter a name for the new department:'
                }
            ])
            .then(deptname => {
                db.query(
                    queries.addDepartment, {
                        name: deptname.departmentName
                    },
                    (err) => {
                        if (err) throw err;
                        console.log(`The new department ${deptname.departmentName} was added successfully!`);
                        init();
                    }
                )
            })
        }
        
        await promptUser();
    }
    catch (err) {
        console.log(err);
    }
}

async function addRole() {
    try {
        const userPrompt = () => {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'Please enter a name for the new role:'
                }
            ])
            .then(userAnswer => {
                db.query(queries.addRole), {
                    name: userAnswer.roleName
                },
                (err) => {
                    if (err) throw err;
                    console.log(`The new role ${userAnswer.roleName} was added successfully!`);
                    init();
                }
            })
        }
    }
}


function exitProgram() {
    return db.end();
}

module.exports = { init };