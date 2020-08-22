require('./models/db');

var express = require('express');
var app = express();
const path = require('path');
const exphbs = require('express-handlebars');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.use(express.static('public'));

var showController = require('./controllers/showController');

app.use('/ticket', showController);

app.listen(8080);