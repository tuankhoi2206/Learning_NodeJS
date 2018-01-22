var express = require('express');
// var app = express();
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require(__root + '/app/config/config.token');
// router.use(bodyParser.urlencoded({extended: true}));
// In the Node.js module system, each file is treated as a separate module.
var User = require(__root + '/app/models/User');
/**
 * Login/SignIn
 * Description:
 */
router.post('/authenticate', function (req, res) {
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }, function (err, user) {
    /*** Server error ***/
    if (err) {
      res.json({
        status: 'FAIL',
        message: 'Error occured: ' + err
      });
    } else {
      if (!user) {
        res.status(403).json({
          status: 'FAIL',
          message: 'Authentication failed. Please check Username/Password.'
        });
      } else {
        // xem lai cho nay
        // var token = jwt.encode(user, config.secret);
        // return the information including token as JSON
        var token = jwt.sign(user, config.secret, {
          expiresIn: 86400
        });
        res.status(200).json({
          status: 'SUCCESS',
          accessToken: token
        });
      }
    }// end else if(err)
  });
});

router.post('/register', function (req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 10);

  User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    },
    function (err, user) {
      if (err) {
        res.status(500).json({
          data: {
            status: 'FAIL',
            message: 'There was a problem registering the user.'
          }
        });
      }
      // if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      // var token = jwt.sign({id: user._id}, config.secret, {
      //   expiresIn: 86400 // expires in 24 hours
      // });

      var token = jwt.encode(user, config.secret);
      // return the information including token as JSON
      res.status(200).json({
        data: {
          status: 'SUCCESS',
          accessToken: token
        }
      });
      // res.status(200).send({auth: true, token: token});
      // https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
    });
});

router.get('/profile', function (req, res) {
  var token = req.headers['access-token'];
  if (!token) {
    res.status(401).json({
      data: {
        status: 'FAIL',
        message: 'No token provided.'
      }
    });
  }
  // return res.status(401).send({auth: false, message: 'No token provided.'});
  // jwt.verify(token, config.secret, function (err, decoded) {
  //   if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
  //   res.status(200).send(decoded);
  // });
});

// apply the routes to our application with the prefix /api
// app.use('api/users', router);
module.exports = router;
