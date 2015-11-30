var express = require("express");
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/health_tracker';


// Get the medication information
router.get('/medications', function(req,res){
    // get params from req.query object
    var queryOptions = {
        patient_id: req.query.patient_id,
        start_date: req.query.start_date,
        end_date: req.query.end_date
    };

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
                        to_char(medication_entry.entry_date, 'MM-DD-YYYY') as entry_date, \
                        medication.name as name, \
                        medication_entry.dose_given as dose_given,\
                        medication_entry.uom as Units \
                    FROM \
                        medication \
                        JOIN medication_entry \
                        ON medication.medication_id = medication_entry.medication_id \
                    WHERE medication.patient_id = $1 and \
                    medication_entry.entry_date BETWEEN $2 and $3    \
                    ORDER BY entry_date, name, dose_given;", [queryOptions.patient_id, queryOptions.start_date, queryOptions.end_date]);
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

// Get the condition information
router.get('/conditions', function(req,res){
    // get params from req.query object
    var queryOptions = {
        patient_id: req.query.patient_id,
        condition_id: req.query.condition_id || 1,
        start_date: req.query.start_date,
        end_date: req.query.end_date
    };

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
                        to_char(condition_entry.entry_date, 'MM-DD-YYYY') as label, \
                        condition_entry.value as value \
                    FROM \
                        condition_entry, \
                        condition \
                    WHERE condition_entry.condition_id = condition.condition_id \
                     and condition.patient_id = $1 \
                     and condition.condition_id = $2 \
                     and condition_entry.entry_date BETWEEN $3 and $4 \
                    ORDER BY label, value;", [queryOptions.patient_id, queryOptions.condition_id, queryOptions.start_date, queryOptions.end_date]);
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

// Get all the condition information
router.get('/allconditions', function(req,res){

    var queryOptions = {
        patient_id: req.query.patient_id
    }

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
                        condition_id, \
                        name \
                    FROM \
                        condition \
                    WHERE patient_id = $1\
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

module.exports = router;