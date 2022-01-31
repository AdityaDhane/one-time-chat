const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('./client'))

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('message', msg => {
        console.log(msg);
        socket.broadcast.emit('message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('App listening on port 3000')
})