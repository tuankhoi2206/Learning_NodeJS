var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__root));

console.log('__dirname + '/app/login.html');
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/login.html');
});

app.listen(8888);