var express = require('express');
var app = express();

var routes = require('./routes/route.js');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    const podName = process.env.POD_NAME || 'Unknown pod';
    const podIP = process.env.POD_IP || 'Unknown IP';
    routes.home(req, res, podName, podIP);
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function (req, res) {
    console.log("Catch the action at http://localhost:" + port);
});
