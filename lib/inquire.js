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
            if (answer.action === 'Exit') {
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
                        addRole();
                        break;

                    case menuOptions[5]:
                        addEmployee();
                        break;

                    case menuOptions[6]:
                        updateEmployeeRole();
                        break;

                    case menuOptions[7]:
                        updateEmployeeManager();
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

function getManagers() {
    return query(queries.viewAllManagers);
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
    try {
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
        const promptUser = () => {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'Please enter a name for the new role:'
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: 'Please enter the Salary for this role'
                },
                {
                    type: 'list',
                    name: 'roleDepartmentId',
                    message: 'Please select a department for this role:',
                    choices: function () {
                        const listOfDepartments = [];
                        departmentNames.forEach(elem => {
                            const departmentObject = {
                                value: elem.id,
                                name: elem.name,
                            }
                            listOfDepartments.push(departmentObject);
                        })
                        listOfDepartments.unshift('None');
                        return listOfDepartments;
                    }
                }
            ])
                .then(userAnswer => {
                    db.query(queries.addRole, {
                        title: userAnswer.roleName,
                        salary: userAnswer.roleSalary,
                        department_id: userAnswer.roleDepartmentId === 'None' ? null : userAnswer.roleDepartmentId
                    },
                        (err) => {
                            if (err) throw err;
                            console.log(`The new role ${userAnswer.roleName} was added successfully!`);
                            init();
                        })
                })
        }
        const departmentNames = await getDepartments();
        await promptUser();
    }
    catch (err) {
        console.log(err);
    }
}

async function addEmployee() {
    try {
        const promptUser = () => {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeFirstName',
                    message: "Please enter the employee's first name:"
                },
                {
                    type: 'input',
                    name: 'employeeLastName',
                    message: "Please enter the employee's last name:"
                },
                {
                    type: 'list',
                    name: 'employeeRoleId',
                    message: "Please select the employee's role id:",
                    choices: function () {
                        const listOfRoles = [];
                        roleList.forEach(elem => {
                            const roleObject = {
                                value: elem.id,
                                name: elem.title
                            }
                            listOfRoles.push(roleObject);
                        })
                        listOfRoles.unshift('None');
                        return listOfRoles;
                    }
                },
                {
                    type: 'list',
                    name: 'employeeManagerId',
                    message: 'Please select a manager for the employee:',
                    choices: function () {
                        const listOfManagers = [];
                        managerList.forEach(elem => {
                            const managerObject = {
                                value: elem.id,
                                name: `${elem.first_name} ${elem.last_name}`
                            }
                            listOfManagers.push(managerObject);
                        })
                        listOfManagers.unshift('None');
                        return listOfManagers;
                    }
                },
                {
                    type: 'list',
                    name: 'employeeIsManager',
                    message: 'Is this employee a manager?',
                    choices: ['Yes', 'No']
                }
            ])
                .then(userAnswer => {
                    db.query(queries.addEmployee,
                        {
                            first_name: userAnswer.employeeFirstName,
                            last_name: userAnswer.employeeLastName,
                            role_id: userAnswer.employeeRoleId === 'None' ? null : userAnswer.employeeRoleId,
                            manager_id: userAnswer.employeeManagerId === 'None' ? null : userAnswer.employeeManagerId,
                            isManager: userAnswer.employeeIsManager === 'Yes' ? true : false
                        },
                        (err) => {
                            if (err) throw err;
                            console.log(`The new user ${userAnswer.employeeFirstName} ${userAnswer.employeeLastName} was successfully added!`);
                            init();
                        })
                })
        }
        const roleList = await getRoles();
        const managerList = await getManagers();
        await promptUser();
    }
    catch (err) {
        console.log(err);
    }
}

async function updateEmployeeRole() {
    try {
        const promptUser = () => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Please select the employee whose role you would like to update:',
                    choices: function () {
                        const listOfEmployees = [];
                        employeeList.forEach(elem => {
                            const employeeObj = {
                                name: `${elem.first_name} ${elem.last_name}`,
                                value: elem.id
                            }
                            listOfEmployees.push(employeeObj);
                        })
                        return listOfEmployees;
                    }
                },
                {
                    type: 'list',
                    name: 'employeeRoleId',
                    message: 'Select a new role for the employee:',
                    choices: function () {
                        const listOfRoles = [];
                        roleList.forEach(elem => {
                            const roleObject = {
                                name: elem.title,
                                value: elem.id
                            }
                            listOfRoles.push(roleObject);
                        })
                        return listOfRoles;
                    }
                }
            ])
                .then(userAnswer => {
                    db.query(queries.updateEmployeeRole,
                        [{
                            role_id: userAnswer.employeeRoleId
                        },
                        {
                            id: userAnswer.employeeId
                        }],
                        (err) => {
                            if (err) throw err;
                            console.log(`The user's role was updated successfully!`)
                            init();
                        })
                })
        }
        const employeeList = await getEmployees();
        const roleList = await getRoles();
        await promptUser();
    }
    catch (err) {
        console.log(err);
    }
}

async function updateEmployeeManager() {
    try {
        const promptUser = () => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Please select the employee whose role you would like to update:',
                    choices: function () {
                        const listOfEmployees = [];
                        employeeList.forEach(elem => {
                            const employeeObj = {
                                name: `${elem.first_name} ${elem.last_name}`,
                                value: elem.id
                            }
                            listOfEmployees.push(employeeObj);
                        })
                        return listOfEmployees;
                    }
                },
                {
                    type: 'list',
                    name: 'employeeManagerId',
                    message: 'Select a new manager for the employee:',
                    choices: function () {
                        const listOfManagers = [];
                        managerList.forEach(elem => {
                            const managerObject = {
                                name: `${elem.first_name} ${elem.last_name}`,
                                value: elem.id
                            }
                            listOfManagers.push(managerObject);
                        })
                        return listOfManagers;
                    }
                }
            ])
                .then(userAnswer => {
                    db.query(queries.updateEmployeeManager,
                        [{
                            manager_id: userAnswer.employeeManagerId
                        },
                        {
                            id: userAnswer.employeeId
                        }],
                        (err) => {
                            if (err) throw err;
                            console.log(`The user's manager was updated successfully!`)
                            init();
                        })
                })
        }
        const employeeList = await getEmployees();
        const managerList = await getManagers();
        await promptUser();
    }
    catch (err) {
        console.log(err);
    }
}

async function viewEmployeesByManager() {
    try {
        // add sql query here
        // complete this
    }
    catch (err) {
        console.log(err);
    }
}


function exitProgram() {
    return db.end();
}

module.exports = { init };