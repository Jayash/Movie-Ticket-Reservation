var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true }, (err, db) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.');
        db.createCollection("shows", function(err, res) {
            if (err) throw err;
            console.log("shows Collection created!");
        });
        db.createCollection("revenues", function(err, res) {
            if (err) throw err;
            console.log("Revenue Collection created!");
        });
        db.collection("shows").findOne({}, function(err, result) {
            if (err) throw err;
            
            if(result == null){
                var myobj = [
                    { name: "Show1",
                        platium_Seats: [
                        {name: "A1", occ: false}, {name: "A2", occ: false},
                        {name: "A3", occ: false}, {name: "A4", occ: false},
                        {name: "A5", occ: false}, {name: "A6", occ: false},
                        {name: "A7", occ: false}, {name: "A8", occ: false},
                        {name: "A9", occ: false}],
                        gold_Seats: [
                        {name: "B1", occ: false}, {name: "B2", occ: false},
                        {name: "B3", occ: false}, {name: "B4", occ: false},
                        {name: "B5", occ: false}, {name: "B6", occ: false}],
                        silver_Seats: [
                        {name: "C1", occ: false}, {name: "C2", occ: false},
                        {name: "C3", occ: false}, {name: "C4", occ: false},
                        {name: "C5", occ: false}, {name: "C6", occ: false},
                        {name: "C7", occ: false}]
                    },
                    { name: "Show2",
                        platium_Seats: [
                        {name: "A1", occ: false}, {name: "A2", occ: false},
                        {name: "A3", occ: false}, {name: "A4", occ: false},
                        {name: "A5", occ: false}],
                        gold_Seats: [
                        {name: "B1", occ: false}, {name: "B2", occ: false},
                        {name: "B3", occ: false}, {name: "B4", occ: false},
                        {name: "B5", occ: false}, {name: "B6", occ: false}],
                        silver_Seats: [
                        {name: "C1", occ: false}, {name: "C2", occ: false},
                        {name: "C3", occ: false}, {name: "C4", occ: false},
                        {name: "C5", occ: false}, {name: "C6", occ: false},
                        {name: "C7", occ: false} ]
                      },
                    { name: "Show3",
                        platium_Seats: [
                        {name: "A1", occ: false}, {name: "A2", occ: false},
                        {name: "A3", occ: false}, {name: "A4", occ: false},
                        {name: "A5", occ: false}, {name: "A6", occ: false},
                        {name: "A7", occ: false}],
                        gold_Seats: [
                        {name: "B1", occ: false}, {name: "B2", occ: false},
                        {name: "B3", occ: false}, {name: "B4", occ: false},
                        {name: "B5", occ: false}, {name: "B6", occ: false},
                        {name: "B7", occ: false}, {name: "B8", occ: false}],
                        silver_Seats: [
                        {name: "C1", occ: false}, {name: "C2", occ: false},
                        {name: "C3", occ: false}, {name: "C4", occ: false},
                        {name: "C5", occ: false}, {name: "C6", occ: false},
                        {name: "C7", occ: false}, {name: "C8", occ: false},
                        {name: "C9", occ: false}]
                      }
                    ];  
                    db.collection("shows").insertMany(myobj, function(err, res) {
                    if (err) throw err;
                    console.log("Show document inserted");
                  }); 
            }
                var myobj1 = {name: 'Total Revenue', revenue: 0}
                db.collection("revenues").findOne({}, function(err, result) {
                if (err) throw err;
                
                if(result == null){
                    db.collection("revenues").insertOne(myobj1, function(err, res) {
                    if (err) throw err;
                    console.log("Revenue document inserted");
                    });
                }
            });
        });
    }
    else { console.log('Error in DB connection : ' + err) }
});

require('./shows.model');