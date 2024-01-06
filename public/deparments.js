
function showDepartments() {
    const db = require('../db/dbLink.js');
    const cli = require('./cli.js');

    db.connect(err => {
        if (err) throw err;

        let sqlCommand = 'SELECT * FROM department'
        db.query(sqlCommand, (err, res) => {
            if (err) {
                console.log(err)
                throw err;
            }
            console.log("\n");
            console.table(res);
            console.log("\n");
            cli.run();
        });
    });
}
module.exports = { showDepartments };




