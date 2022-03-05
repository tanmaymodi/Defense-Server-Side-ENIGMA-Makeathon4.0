const PORT = process.env.PORT || 4000;
var express = require("express");
var bodyParser = require("body-parser");
const dotenv = require('dotenv');
const connectDB = require('./config/db');
connectDB();
dotenv.config();
var app = express()

var engine = require('consolidate');
const { patientDetails, PatientDetails, StaffDetails, HospitalDetails, PatientTransferDetails } = require("./models/user");
app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

const path = require('path');
app.use(express.static(path.join(__dirname + '/public')));


app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));



var server = require('http').createServer(app);
server.listen(PORT, () => { console.log("Server started at " + PORT) });