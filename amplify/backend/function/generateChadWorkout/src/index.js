
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
});


app.get('/workout', function(req, res) {
    res.json({success: 'get call success!', url: req.url});
});

app.get('/workout/*', function(req, res) {
    res.json({success: 'get call success!', url: req.url});
});

exports.handler = app;