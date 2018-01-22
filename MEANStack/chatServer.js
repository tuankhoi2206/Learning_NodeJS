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
    }
    console.log("Connect Success!!!!");
});


router.route('/login').post(authenticate);

function authenticate(req, res, next)
{
    if (!req.body.user || !req.body.password) {
     return res.render('login', {error: 'Please enter your email and password.'});
    }
    user.findOne({
                username: req.body.user,
                password: req.body.password
                }, function (error, user) {
                    console.log('user', user);
                    if (error) return next(error)
                    if (!user) return res.render('login', {error: 'Incorrect user&password combination.'})
                    res.json(user);
                });
}

/*************** SAVE ****************************/
router.route('/products').post(function (req, res) {
    var p = new product();
    p.title = req.body.title;
    p.price = req.body.price;
    p.instock = req.body.instock;
    p.photo = req.body.photo;
    p.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.send({message: 'Product Created!'});
    });
});

/****************** GET ***************************/
router.route('/products').get(function (req, res) {
    product.find(function (err, products) {
        debugger;
        if (err) {
            res.send(err);
        }
        res.send(products);
    });
});

/******************* GET by ID *******************************/
router.route('/products/:product_id').get(function (req, res) {
    product.findById(req.params.product_id, function (err, prod) {
        if (err) {
            res.send(err);
        }
        res.json(prod);
    });
});

/************************ UPDATE ******************************/
router.route('/products/:product_id').put(function (req, res) {
    product.findById(req.params.product_id, function (err, prod) {
        if (err) {
            res.send(err);
        }
        prod.title = req.body.title;
        prod.price = req.body.price;
        prod.instock = req.body.instock;
        prod.photo = req.body.photo;
        prod.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Product updated!'});
        })
    });
});

/************************ DELETE ************************/
router.route('/product/:product_id').delete(function (req, res) {
    console.log('req.param.product_id', req.param.product_id);
    product.remove({_id: req.param.product_id}, function (err, prod) {
        console.log('req.param.product_id', req.param.product_id);
        if (err) {
            res.send(err);
        }
        res.json({message: 'Successfully deleted'});
    });
});