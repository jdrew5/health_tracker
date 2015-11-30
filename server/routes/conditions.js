var express = require("express");
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/health_tracker';


// Get all the condition information
router.get('/conditions', function(req,res){
    var queryOptions = {
        patient_id: req.query.patient_id
    }

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
                        condition_id, \
                        name, \
                        current_ind, \
                        patient_id \
                    FROM \
                        condition \
                    WHERE patient_id = $1 \
                    ORDER BY condition_id, name;", [queryOptions.patient_id]);
        //console.log(query);
        // Stream results back one row at a time, push into results array
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});

// Add condition to condition
router.post('/conditions', function(req,res){

    var addConditionEntry = {
        "name": req.body.name,
        "current_ind": req.body.current_ind,
        "patient_id" : req.body.patient_id
    };

    pg.connect(connectionString, function (err, client) {

        client.query("INSERT INTO condition (name, current_ind, patient_id) \
                    VALUES ($1, $2, $3) RETURNING condition_id;",
            [addConditionEntry.name, addConditionEntry.current_ind,
                addConditionEntry.patient_id],
            function(err, result) {
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }
                res.send(true);
            });
        //console.log("inserting condition", addConditionEntry);

    });

});

// Add conditions to condition
router.put('/conditions', function(req,res){

    var editConditionEntry = {
        "condition_id": req.body.condition_id,
        "name": req.body.name,
        "current_ind": req.body.current_ind,
        "patient_id" : req.body.patient_id
    };

    //console.log(editConditionEntry);

    pg.connect(connectionString, function (err, client) {

        client.query("UPDATE condition \
                        SET name = $1, \
                        current_ind = $2, \
                        patient_id = $3 \
                    WHERE condition_id = $4;",
            [editConditionEntry.name, editConditionEntry.current_ind,
                editConditionEntry.patient_id,
                editConditionEntry.condition_id],
            function(err, result) {
                if(err) {
                    console.log("Error updating data: ", err);
                    res.send(false);
                }
                res.send(true);
            });
    });
});

module.exports = router;