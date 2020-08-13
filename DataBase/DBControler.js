//Mongodb

let mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/TPEServerOnline', { useUnifiedTopology: true, useNewUrlParser: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
//Khai bao Model
var Device = require('./Model/Device');
var Project = require('./Model/Projects');
var QRCode = require('./Model/QRCodeFloor');
var User = require('./Model/User');
var Elevator = require('./Model/Elevator');
//Khai bao
exports.mainDevice = new Device();
exports.mainProject = new Project();
exports.mainQRCode = new QRCode();
exports.mainUser = new User();
exports.mainElevator = new Elevator();
//


//module.exports = mainDevice;
