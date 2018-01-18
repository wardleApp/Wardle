const app = require('./app.js');
const socket = require('socket.io');

/* Port and Server */
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
	console.log('Server running on port %d', port);
});
/* Port and Server */

/* Websocket */
var io = socket(server);
io.on('connection', socket => {
	console.log('We are connected now to socket');
  io.emit('new joiner', 'A new user joined the market');
  socket.on('new loan', data => {
    io.emit('loan', data);
  });
  socket.on('refresh payers feed', data => {
  	io.emit('refreshing payers feed', data);
  });
  socket.on('disconnect', () => {
    io.emit('new message', 'A user disconnected');
  });
});
/* Websocket */




