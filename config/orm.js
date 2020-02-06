// import mySQL connection
const connection = require("../config/connection");

// sql syntax function -- ? array to ? string for sql processing
function printQuestionMarks(num) {
    const array = [];
    for (const i = 0; i < num; i++) {
      array.push("?");
    }
    return array.toString();
};

// sql syntax function -- convert key value pairs to strings for sql processing 
function objectToSQL(ob) {
    const array = [];
    // for loop to push key value pairs as array of strings
    for (const key in ob) {
        const value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'"; 
            }
            array.push(key + "=" + value);
        }
    }
    // convert array of strings to one comma-separated string
    return array.toString();
};

// sql statement crud functions object
const orm = {
    // create: insert into
    create: function(table, cols, vals, cb) {
        // start sql query string
        const queryString = "insert into " + table;
        // append characters and values to query string
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        // check sql query string
        console.log(queryString);
        // run sql query
        connection.query(queryString, vals, function(err, result) {
            // error handling
            if (err) {
                throw err;
            }
            // query result callback function (ensures that data is returned)
            cb(result);
        });
    },
    // read: select from
    read: function(table, cb) {
        // create sql query string with input table value
        const queryString = "select * from " + table +";";
        // check sql query string
        console.log(queryString);
        // run sql query
        connection.query(queryString, function(err, result) {
            // error handling
            if (err) {
                throw err;
            }
            // result callback function
            cb(result);
        });
    },
    // update: update
    update: function(table, objColVals, condition, cb) {
        // start sql query string
        const queryString = "update " + table;
        // append values to sql query string
        queryString += " SET ";
        queryString += objectToSQL(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        // check sql query string
        console.log(queryString);
        // run sql query
        connection.query(queryString, function(err, result) {
            // error handling
            if (err) {
                throw err;
            }
            // result callback function
            cb(result);
        });
    },
    // delete: delete from 
    delete: function(table, condition, cb) {
        // start sql query string
        const queryString = "delete from " + table;
        // append values to sql query string
        queryString += " WHERE ";
        queryString += condition;
        // check sql query string
        console.log(queryString);
        // run sql query
        connection.query(queryString, function(err, result) {
            // error handling
            if (err) {
                throw err;
            }
            // result callback function
            cb(result);
    });
    }
}

// export sql functions to use in model
module.exports = orm;