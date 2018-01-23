var express = require('express');
const SerialPort = require('serialport');

const port = new SerialPort('/dev/ttyACM0',{
	  baudRate: 9600
});

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(client){
  console.log("User connected !");
  
  client.on('lightOnOff', function(data){
	 let status = data.status;
	 if(status == 'ON'){
		    var buffer = new Buffer(1);
            buffer.writeInt8(1);
            port.write(buffer);
		 } else if(status == 'OFF'){
		    var buffer = new Buffer(1);
            buffer.writeInt8(0);
            port.write(buffer);	 
	 } 
  });
  client.on('disconnect', function(){});
});


const PORT = 7000;
server.listen(PORT,function(){
   console.log("Server running on port "+PORT);
});
