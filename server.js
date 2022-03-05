const PORT = process.env.PORT || 4000;
var express = require("express");
var bodyParser = require("body-parser");
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
var app = express()
const expressLayouts = require('express-ejs-layouts');
// var engine = require('consolidate');

// app.set('views', __dirname + '/views');
connectDB();
dotenv.config();
app.use(expressLayouts)
app.set('layout', __dirname+'/views/layout/main.ejs')
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname + '/public')));


app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));



var server = require('http').createServer(app);
server.listen(PORT, () => { console.log("Server started at " + PORT) });