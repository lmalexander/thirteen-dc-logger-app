// dependencies
const mysql = require("mysql");
const password = require("./password");


// set up mysql connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: `${password()}`,
    database: "logger_db"
});

// connect to mysql
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("Connected as ID " + connection.threadId);
});

// export mysql connection module
exports.connection;