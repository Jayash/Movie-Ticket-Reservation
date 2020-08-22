var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var Show = mongoose.model('Show');

var Revenue = mongoose.model('revenue');

router.get('/', (req, res) => {
    res.render('pages/ticket', {
        viewTitle : "Shows",
        s : findAllShow(req, res)    
    });
});

router.get('/revenue', (req, res) => {
    getRevenue(req, res);
});

router.post('/', (req, res) => {
    checkAvailability(req, res);
});

router.post('/booking', (req, res) => {
   var cost = bookTicket(req, res);
});

function updateRevenue (cost) {
    Revenue.findOne({name: 'Total Revenue'}, function(err, docs) {
        var newRevenue = docs.revenue + cost;
        if(!err) {
            Revenue.updateOne({_id: docs._id}, {'$set': {
                'revenue': newRevenue
            }}, 
            function(err, doc) {
                if (err) {
                    console.log("error Updating document")
                }
            });
        }
    });
}

function getRevenue(req, res) {
    Revenue.findOne({name: 'Total Revenue'}, function(err, docs) {
        res.render('pages/revenue', {
            viewTitle : "Total Revenue",
            s : docs.revenue
        });
    });
}

function bookTicket(req, res){
    var cost = 0;
    for(var key in req.body) {
        if (key.startsWith('A')) {
            cost = cost + 320;
        } else if (key.startsWith('B')) {
            cost = cost + 280;
        } else if (key.startsWith('C')) {
            cost = cost + 240;
        }
        updateRevenue(cost);
        Show.updateOne({'name': req.body.showNo, 'platium_Seats.name': key}, {'$set': {
            'platium_Seats.$.occ': true
        }}, function(err, docs) {
            if (err) {
                console.log("error Updating document")
            }
        });

        Show.updateOne({'name': req.body.showNo, 'gold_Seats.name': key}, {'$set': {
            'gold_Seats.$.occ': true
        }}, function(err, docs) {
            if (err) {
                console.log("error Updating document")
            }
        });

        Show.updateOne({'name': req.body.showNo, 'silver_Seats.name': key}, {'$set': {
            'silver_Seats.$.occ': true
        }}, function(err, docs) {
            if (err) {
                console.log("error Updating document:" + err)
            }
    
        });
    }
    res.render('pages/booking', {
        viewTitle : "Confirm Booking",
        totalCost: cost,
    });

}

function checkAvailability(req, res) {
    var arr = [];   
    var query = { name: req.body.showSelect };
    Show.find(query, (err, docs) => {
        if (!err) {
            for (var i = 0; i < docs.length; i++){
                for(var j = 0; j < docs[i].platium_Seats.length; j++){
                    if(!docs[i].platium_Seats[j].occ){
                        arr.push(docs[i].platium_Seats[j].name);
                    }
                }
                for(var j = 0; j < docs[i].gold_Seats.length; j++){
                    if(!docs[i].gold_Seats[j].occ){
                        arr.push(docs[i].gold_Seats[j].name);
                    }
                }
                for(var j = 0; j < docs[i].silver_Seats.length; j++){
                    if(!docs[i].silver_Seats[j].occ){
                        arr.push(docs[i].silver_Seats[j].name);
                    }
                }
            }

            if(arr.length == 0){
                res.render('pages/avSeates', {
                    viewTitle : "Sorry No seats are available, Select another show",
                    s : arr,
                    show : req.body.showSelect
                });
            } else {
                res.render('pages/avSeates', {
                    viewTitle : "Available Seates",
                    s : arr,
                    show : req.body.showSelect
                });
            }
            
        }
        else {
            console.log('Error in retrieving shows :' + err);
        }
    });
}

function findAllShow(req, res) {
    var ar = [];
    Show.find((err, docs) => {
        if (!err) {
            for (var i = 0; i < docs.length; i++){
                ar.push(docs[i]);
            }
        }
        else {
            console.log('Error in retrieving show list :' + err);
        }
    });
    return ar;
}

module.exports = router;