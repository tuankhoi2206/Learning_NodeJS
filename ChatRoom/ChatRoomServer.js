var express = require('express'),
  app = express(),
  uuidv1 = require('uuid/v1'),
  jwt = require('jsonwebtoken'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  v1options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date().getTime(),
    nsecs: 5678
  };

app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('dev'));

global.__root = __dirname;
require('./app/config/db');

var PORT = process.env.PORT || 8080;
app.use(express.static(__dirname));

//initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  genid: function (req) {
    return uuidv1(v1options); // use UUIDs for session IDs
  },
  secret: 'mysecrectkey',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: true,
  // cookie: {secure: true}
}));

//middleware function to check for logged-in users
var sessionChecker = function (req, res, next) {
  console.log('req.cookie.accessToken', req.cookies);
  var accessToken = req.cookies && req.cookies['accessToken'] || undefined;
  console.log('req.cookie.accessToken', accessToken);
  if (accessToken) {
    // verifies secret and checks exp
    jwt.verify(accessToken, app.get('superSecret'), function (err) {
      if (!err) {
        res.sendFile(__dirname + '\\app\\index.html');
      }
    });
  } else {
    next();
  }
  // end if
  // if (req.session.user && req.cookies.user_sid) {
  //   res.redirect('/dashboard');
  // } else {
  //   next();
  // }
};

app.get('/', sessionChecker, function (req, res) {

  console.log('req.headers', req.headers);

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
