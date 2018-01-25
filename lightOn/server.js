var express = require('express');
const SerialPort = require('serialport');
var mongoose = require('mongoose');
const serialport = new SerialPort('/dev/ttyACM1', {
	baudRate: 9600
});

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Test = require('./models/test');
var TestOne = require('./models/testOne');


//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/Edge');

mongoose.connect('mongodb://test:password@ds211558.mlab.com:11558/ionic_chat');

//on successful connection
mongoose.connection.on('connected', () => {
	console.log('Connected to mongodb!!');
});

//on error
mongoose.connection.on('error', (err) => {
	if (err) {
		console.log('Error in db is :' + err);
	}
});

let array = [];

io.on('connection', function (client) {
	console.log("Socket connected !");

	client.on("generate", function (data) {
		let status = data.status;
		if (status == "OK") {
			var buffer = new Buffer(1);
			buffer.writeInt8(5);
			serialport.write(buffer);
		}
	});

	serialport.on('data', function (data) {
		if (data[0] == 6) {
			/**Send data to server */
			let dataTwo = new TestOne({
				valueOne: array
			}).save(function (error, result) {
				if (error) {
					console.log(error);
				} else if (result) {
					console.log("Sendind data to server");
				}
			});
		} else {
			let dataOne = new Test({
				value: data[0]
			}).save(function (error, result) {
				if (error) {
					console.log(error);
				} else if (result) {
					console.log(result);
				}
			});

			/** push data into array */
			array.push(data[0]);
			client.emit('arduino', { "value": data[0] });
		}
	});

});

const PORT = 7000;
server.listen(PORT, function () {
	console.log("Server started");
});

