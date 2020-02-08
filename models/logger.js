// import orm module
const orm = require("../config/orm");

// create dirty computer model
const dirtyComp = {
    // create new dirty computer
    create: function (cols, vals, cb) {
        // use orm model to create new db item
        orm.create("dirty_computers", cols, vals, function(res) {
            // callback function to return information to database
            cb(res);
        });
    },
    // return all dirty computers
    all: function(cb) {
        // use orm model to create new db item
        orm.read("dirty_computers", function(res) {
            // callback function to return information to database
            cb(res);
        });
    },
    // update dirty computer information
    update: function(objColVals, condition, cb) {
        // use orm model to create new db item
        orm.update("dirty_computers", objColVals, condition, function(res) {
            // callback function to return information to database
            cb(res);
        });
    },
    // delete a dirty computer
    delete: function(condition, cb) {
        // use orm model to create new db item
        orm.delete("dirty_computers", condition, function(res) {
            // callback function to return information to database
            cb(res);
        });
    }
};

// export dirty computer model
module.exports = dirtyComp;