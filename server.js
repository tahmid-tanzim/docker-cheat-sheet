var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();

/* View Engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

/* Set Static Folder */
app.use(express.static(path.join(__dirname, 'client')));

/* Body Parser Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* Routes */
app.use('/', index);
app.use('/api', tasks);

/* Boot Server */
var port = 3000;
app.listen(port, function() {
    console.log('Server running on port: ' + port);
});