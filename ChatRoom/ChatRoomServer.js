var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  morgan = require('morgan');
app.use(bodyParser.json());
app.use(morgan('dev'));
global.__root = __dirname;
require('./app/config/db');

var PORT = process.env.PORT || 8080;
app.use(express.static(__dirname));

app.get('/', function (req, res) {

  console.log('req.headers', req.headers);
  console.log('req.headers["authorization"]', req.headers["authorization"]);

  // var token = req.body.token || req.query.token || req.headers['access-token'];
  // decode token
  // if (token) {
  //   // verifies secret and checks exp
  //   jwt.verify(token, app.get('superSecret'), function (err, decoded) {
  //     if (err) {
  //       return res.json({
  //         data: {
  //           success: false,
  //           message: 'Failed to authenticate token.',
  //           auth: false
  //         }
  //       });
  //     } else {
  //       // if everything is good, save to request for use in other routes
  //       req.decoded = decoded;
  //       next();
  //     }
  //   });
  // }

  var loginUrl = __dirname + '\\app\\index.html';
  // var loginUrl = __dirname + '\\app\\login.html';
  res.sendFile(loginUrl);
});

// var index = require(__root + '/routes/index');
// app.use(index);

var UserController = require(__root + '/app/models/controller/UserController');
app.use('/api/users', UserController);

app.listen(PORT, function () {
  // console.log('\033c');
  console.log('*=================================*');
  console.log('*  Server listening on port ' + PORT + '  *');
  console.log('*=================================*');
});
