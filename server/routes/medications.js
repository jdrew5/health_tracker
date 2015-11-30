var express = require("express");
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/health_tracker';


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
                    WHERE patient_id = $1 \
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
        "name": req.body.name,
        "suggested_dose": req.body.suggested_dose,
        "suggested_timing": req.body.suggested_timing,
        "current_ind": req.body.current_ind,
        "patient_id" : req.body.patient_id,
        "uom": req.body.uom
    };

    //console.log("server medication data: ", addMedicationEntry);

    pg.connect(connectionString, function (err, client) {

        client.query("INSERT INTO medication (name, suggested_dose, suggested_timing, current_ind, patient_id, uom) \
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING medication_id;",
            [addMedicationEntry.name, addMedicationEntry.suggested_dose,
                addMedicationEntry.suggested_timing, addMedicationEntry.current_ind,
                addMedicationEntry.patient_id, addMedicationEntry.uom],
            function(err, result) {
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }
                res.send(true);
            });
        console.log("inserting medication", addMedicationEntry);

    });

});

// Add medications to medication_entry
router.put('/medications', function(req,res){

    var editMedicationEntry = {
        "medication_id": req.body.medication_id,
        "name": req.body.name,
        "suggested_dose": req.body.suggested_dose,
        "suggested_timing": req.body.suggested_timing,
        "current_ind": req.body.current_ind,
        "patient_id" : req.body.patient_id,
        "uom": req.body.uom
    };

    //console.log(editMedicationEntry);

    pg.connect(connectionString, function (err, client) {

        client.query("UPDATE medication \
                        SET name = $1, \
                        suggested_dose = $2, \
                        suggested_timing = $3, \
                        current_ind = $4, \
                        patient_id = $5, \
                        uom = $6 \
                    WHERE medication_id = $7;",
            [editMedicationEntry.name, editMedicationEntry.suggested_dose,
                editMedicationEntry.suggested_timing, editMedicationEntry.current_ind,
                editMedicationEntry.patient_id, editMedicationEntry.uom,
                editMedicationEntry.medication_id],
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