var express = require("express");
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/health_tracker';

// Get all the condition information
router.get('/conditions', function(req,res){

    var queryOptions = {
        patient_id: req.query.patient_id
    }
    //console.log("cond query opt ", queryOptions);
    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
                        condition_id, \
                        name \
                    FROM \
                        condition \
                    WHERE current_ind = true and \
                        patient_id = $1\
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

// Add conditions to condition_entry
router.post('/conditions', function(req,res){

    var addConditionEntry = {
        "entry_date" : req.body.entry_date,
        "patient_id" : req.body.patient_id,
        "condition_id": req.body.condition_id,
        "add_value": req.body.add_value
    };

    //console.log("server condition data: ", addConditionEntry);

    pg.connect(connectionString, function (err, client) {

        client.query("INSERT INTO condition_entry (entry_date, patient_id, condition_id, value) \
                    VALUES ($1, $2, $3, $4) RETURNING condition_entry_id",
            [addConditionEntry.entry_date, addConditionEntry.patient_id, addConditionEntry.condition_id, addConditionEntry.add_value],
            function(err, result) {
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }
                res.send(true);
            });
    });

});

// Get all the medication information
router.get('/medications', function(req,res){
    var queryOptions = {
        patient_id: req.query.patient_id
    }
    //console.log("med qo ", queryOptions);
    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
                        medication_id, \
                        name, \
                        suggested_dose, \
                        suggested_timing, \
                        current_ind, \
                        patient_id, \
                        uom \
                    FROM \
                        medication \
                    WHERE current_ind = true and \
                        patient_id = $1 \
                    ORDER BY medication_id, name;", [queryOptions.patient_id]);
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

// Add medications to medication_entry
router.post('/medications', function(req,res){

    var addMedicationEntry = {
        "entry_date" : req.body.entry_date,
        "patient_id" : req.body.patient_id,
        "medication_id": req.body.medication_id,
        "dose_given": req.body.dose_given,
        "uom": req.body.uom
    };

    //console.log("server medication data: ", addMedicationEntry);

    pg.connect(connectionString, function (err, client) {

        client.query("INSERT INTO medication_entry (entry_date, patient_id, medication_id, dose_given, uom) \
                    VALUES ($1, $2, $3, $4, $5) RETURNING medication_entry_id",
            [addMedicationEntry.entry_date, addMedicationEntry.patient_id,
                addMedicationEntry.medication_id, addMedicationEntry.dose_given, addMedicationEntry.uom],
            function(err, result) {
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }
                res.send(true);
            });
    });

});

module.exports = router;