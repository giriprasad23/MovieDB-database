var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient,format = require('util').format;
//Send the HTML file on request
app.get('/',function(req,res)
{
    res.sendFile(path.join(__dirname,'Client_Angular.html'));
});

//Retrieve the data from Database for each AJAX request and send it in response
app.get('/loaddata',function(req,res)
{
    //Retrieve the parameter from the request
    var index = req.query['i'];
    console.log("Value:"+index);

    MongoClient.connect('mongodb://127.0.0.1:27017/MovieTitle', function(err, db) {

        if (err) throw err;
        console.log("Connected to Database");

            var collection = db.collection('MovieTitle');
            console.log("DB has entry");

            collection.find().forEach(function (record){

                if(record._id == index) {
                    console.log();
                    res.send(record);
                }
            });


    });

});

//Send the CSS stylesheet on html page request
app.get('/scaling.css',function(req,res) {

    res.sendFile(path.join(__dirname,'scaling.css'));

});


//Display Bad route in case of invalid request
app.get('*',function(req,res) {

    res.send('BAD Route');

});

//Start the application on port number 3000
app.listen(3000,function() { console.log('Listening on port 3000');});