const inquirer = require('inquirer');

function init() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'test',
            choices: ['Option 1', 'Option 2']
        }
    ])
        .then(inquirerData => {
            if (inquirerData) {
                console.log(inquirerData);
            }
        })
}

init();