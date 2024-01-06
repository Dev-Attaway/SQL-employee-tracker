
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Fuckyourdata$#@!1234',
        database: 'company_db'
    },
);

module.exports = db;