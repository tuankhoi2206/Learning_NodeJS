const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
var user = require('./model/user');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
var router = express.Router();

app.use(cors());
app.use('/api', router);
app.listen(port);
console.log('REST API is running at ' + port);

mongoose.connect('mongodb://localhost:27017/products', function (err, db) {
    if (err) {
        throw  err;
        console.log("Connect Success!!!!");
    }
});

/****************** GET ***************************/
router.route('/login').get(function (req, res) {
    user.find(function (err, users) {
        if (err) {
            res.send(err);
        }
		console.log('users', users);
        res.send(users);
    });
});

router.route('/login').post(authenticate);
function authenticate(req, res){
	console.log('req.body', req.body); 
    if (!req.body || !req.body.username || !req.body.password) {
	 res.json({message: 'Please enter your email and password.'});
    }else{
			user.find({
                username: req.body.username,
                password: req.body.password
              }, function (error, users) {
                    console.log('users', users);
                    if (error) return next(error);
                    if (!users){
						res.json({message: 'Incorrect user&password combination.'});
					}
                    res.json(users);
                });
	}
}