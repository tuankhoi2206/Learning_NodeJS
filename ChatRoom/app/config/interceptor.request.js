// API ROUTES -------------------
// get an instance of the router for api routes
var express = require('express');
var app = express();
var jwt = require("jsonwebtoken");

var apiRoutes = express.Router();

// Handle request incoming server
// route middleware to verify a token
apiRoutes.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({
          data: {
            success: false,
            message: 'Failed to authenticate token.',
            auth: false
          }
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});
// route to show a random message (GET http://localhost:8080/api/)
// route to return all users (GET http://localhost:8080/api/users)
// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
