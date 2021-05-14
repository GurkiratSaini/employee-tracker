const path = require('path');
const fs = require('fs');

const queries = {
    viewAllDepartments: fs.readFileSync(path.join(__dirname, '../db/queries/viewAllDepartments.sql')).toString(),
    viewAllRoles: fs.readFileSync(path.join(__dirname, '../db/queries/viewAllRoles.sql')).toString(),
    viewAllEmployees: fs.readFileSync(path.join(__dirname, '../db/queries/viewAllEmployees.sql')).toString()
}

module.exports = queries;