var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var index = require('./routes/index');
var dashboard = require('./routes/dashboard');
var dailydata = require('./routes/dailydata');
var medications = require('./routes/medications');
var conditions = require('./routes/conditions');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/dashboard', dashboard);
app.use('/dailydata', dailydata);
app.use('/medications', medications);
app.use('/conditions', conditions);
app.use('/', index);

app.set("port", (process.env.PORT || 5000));

app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;