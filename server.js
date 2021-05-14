const db = require('./config/connection');
const inquire = require('./lib/inquire');

async function init() {
    console.log('Welcome to the Employee Tracker App');

    try {
        await inquire.init();
    }
    catch (err) {
        console.log(err);
    }
}

db.connect((err) => {
    if (err) throw err;
    console.log(err);
    init();
})