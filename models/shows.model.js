var mongoose = require('mongoose');

var showSchema = new mongoose.Schema({
    name: String,
    platium_Seats: [{name : String, occ : Boolean }],
    gold_Seats: [{name : String, occ : Boolean }],
    silver_Seats: [{name : String, occ : Boolean }]
});

mongoose.model('Show', showSchema);

var revenueSchema = new mongoose.Schema({
    name: String,
    revenue: Number
});

mongoose.model('revenue', revenueSchema);