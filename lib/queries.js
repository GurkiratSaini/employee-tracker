const path = require('path');
const fs = require('fs');

const queries = {
    viewAllDepartments: fs.readFileSync(path.join(__dirname, '../db/queries/viewAllDepartments.sql')).toString(),
    viewAllRoles: fs.readFileSync(path.join(__dirname, '../db/queries/viewAllRoles.sql')).toString(),
    viewAllEmployees: fs.readFileSync(path.join(__dirname, '../db/queries/viewAllEmployees.sql')).toString(),
    viewAllManagers: fs.readFileSync(path.join(__dirname, '../db/queries/viewAllEmployees.sql')).toString(),
    addDepartment: fs.readFileSync(path.join(__dirname, '../db/queries/addDepartment.sql')).toString(),
    addRole: fs.readFileSync(path.join(__dirname, '../db/queries/addRole.sql')).toString(),
    addEmployee: fs.readFileSync(path.join(__dirname, '../db/queries/addEmployee.sql')).toString(),
    updateEmployeeRole: fs.readFileSync(path.join(__dirname, '../db/queries/updateEmployee.sql')).toString(),
    updateEmployeeManager: fs.readFileSync(path.join(__dirname, '../db/queries/updateEmployee.sql')).toString(),
    viewEmployeesByManager: fs.readFileSync(path.join(__dirname, '../db/queries/viewEmployeesByManager.sql')).toString(),
    viewEmployeesByDepartment: fs.readFileSync(path.join(__dirname, '../db/queries/viewEmployeesByDepartment.sql')).toString(),
    deleteDepartment: fs.readFileSync(path.join(__dirname, '../db/queries/deleteDepartment.sql')).toString(),
    deleteRole: fs.readFileSync(path.join(__dirname, '../db/queries/deleteRole.sql')).toString(),
    deleteEmployee: fs.readFileSync(path.join(__dirname, '../db/queries/deleteEmployee.sql')).toString(),
    viewUtilizedBudgetOfDepartment: fs.readFileSync(path.join(__dirname, '../db/queries/viewUtilizedBudgetOfDepartment.sql')).toString(),
}

module.exports = queries;