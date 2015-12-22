var express = require("express");
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/health_tracker';

// Get a patient
router.get('/patients', function(req,res){
    var queryOptions = {
        patient_id: req.query.patient_id
    }

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
                        patient_id, \
                        name, \
                        type, \
                        dob, \
                        image \
                    FROM \
                        patient \
                    WHERE patient_id = $1 \
                    ORDER BY patient_id, name;", [queryOptions.patient_id]);
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
// Get all patients
router.get('/allpatients', function(req,res){

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
                        patient_id, \
                        name, \
                        type, \
                        dob, \
                        image \
                    FROM \
                        patient \
                    ORDER BY patient_id, name;");
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

// Add patient
router.post('/patients', function(req,res){

    var addEntry = {
        "name": req.body.name,
        "type": req.body.type,
        "dob": req.body.dob,
        "image": req.body.image
    };

    //console.log("server medication data: ", addMedicationEntry);

    pg.connect(connectionString, function (err, client) {
        client.on('drain', client.end.bind(client));
        client.query("INSERT INTO patient (name, type, dob, image) \
                    VALUES ($1, $2, $3, $4) RETURNING patient_id;",
            [addEntry.name, addEntry.type,
                addEntry.dob, addEntry.image],
            function(err, result) {
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }
                res.send(true);
            });
        //console.log("inserting patient", addEntry);

    });

});

// Edit patient
router.put('/patients', function(req,res){

    var editEntry = {
        "patient_id": req.body.patient_id,
        "name": req.body.name,
        "type": req.body.type,
        "dob": req.body.dob,
        "image": req.body.image
    };

    //console.log(editEntry);

    pg.connect(connectionString, function (err, client) {
        client.on('drain', client.end.bind(client));
        client.query("UPDATE patient \
                        SET name = $1, \
                        type = $2, \
                        dob = $3, \
                        image = $4 \
                    WHERE patient_id = $5;",
            [editEntry.name, editEntry.type,
                editEntry.dob, editEntry.image,
                editEntry.patient_id],
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