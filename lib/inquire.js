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
        console.log(answer);
        if(answer.action === 'Exit') {
            console.log('Exit');
            // add exit functionality here
        }
        else {
            switch (answer.action) {
                case menuOptions[0]:
                    console.log(menuOptions[0])
                    break;

                case menuOptions[1]:
                    console.log(menuOptions[1])
                    break;

                case menuOptions[2]:
                    console.log(menuOptions[2])
                    break;

                case menuOptions[3]:
                    console.log(menuOptions[3])
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

module.exports = { init };