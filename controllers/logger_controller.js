// dependencies
const express = require("express");

// import logger model
const dirtyCompLogger = require("../models/logger");

// create express router for api data
const router = express.Router();


// create api data routes
// POST - create
router.post("/api/dirtycomputers", function(req,res) {
    dirtyCompLogger.create(
        // keys
        [ "dc_name", "dc_memory_1", "cleaned", "clean_name" ],
        // user input values
        [ req.body.name, req.body.dc_memory_1, req.body.cleaned, req.body.clean_name ],
        function(result) {
            // respond with ID of successfully added dirty computer
            res.json({id: result.insertId});
    });
});

// GET - read
router.get("/", function(req, res) {
    // return and store dirty_computer table data as object to return
     dirtyCompLogger.all(function(data) {
        // store sql data to be returned to handlebars page
        const returnData = {
            dirty_computers: data
        };
        // check returnData
        console.log("return data object:" + returnData);

        // render returnData to handlebars index page
        res.render("index", returnData);
    });
});

// PUT - update
router.put("/api/dirtycomputers/:id", function(req, res) {
    // store id of table entry to be updated
    const condition = "id # = " + req.params.id;
    // check id
    console.log("condition" + condition);
    // method to update data in an existing table
    dirtyCompLogger.update({
        cleaned: req.body.cleaned,
        clean_name: req.body.clean_name
        // change data based on req.params.id
    }, condition, function(result) {
        // 404 error message -- no data was changed
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            // 200 success message -- data was updated
            res.status(200).end();
        }
    });
});

// DELETE - delete
router.delete("/api/dirtycomputers/:id", function(req, res) {
       // store id of table entry to be deleted
       const condition = "id #" + req.params.id;
       // check id
       console.log("delete " + condition); 
       // delete method
       dirtyCompLogger.delete(condition, function(result) {
           if (result.affectedRows == 0) {
        // 404 error message -- no row was deleted
               return res.status(404).end();
           } else {
            // 200 success message -- row was deleted
               res.status(200).end();
           }
       });
});

// export router model for server.js
module.exports = router;