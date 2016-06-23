var MongoClient = require('mongodb').MongoClient,format = require('util').format;


MongoClient.connect('mongodb://127.0.0.1:27017/MovieTitle', function(err, db) {
    if (err) throw err;
    console.log("Connected to Database");
    db.dropDatabase(function() {

        var collection = db.collection('MovieTitle');
        // Remove all records in collection if any

        collection.remove(function(err, result) {
            //Import the file stream object to read the JSON file
            var fs = require('fs');
            //Read the json file and insert into MongoDB
            var jsonObj = JSON.parse(fs.readFileSync('MovieTitles.json', 'utf8'));
            var i=0;

           jsonObj.forEach(function (json){
               //Inserting the record into MongoDB
               collection.insert({_id : i++ , "title" : json.title , "year" : json.year , "imdbid" : json.imdbid, "rating" : json.rating}, {w: 1}, function (err,docs) {
                    collection.count(function(err,count){
                            if(count == 840)
                            {
                                //Close the DB once inserted
                                console.log("Finished inserting records into database. Continue...");
                                db.close();
                            }

                        });

               });

           });





        });
    });

});