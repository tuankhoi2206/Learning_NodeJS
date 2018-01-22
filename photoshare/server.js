var express = require("express");
var app = express();
var server = require("htpp").Server(app);
var io = require("socket.io").listen(server);