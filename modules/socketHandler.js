const socket_io = require('socket.io');

const rooms = new Map();

const regMessageHandler = (io, socket) => {
    // redirect message to room
    socket.on('message', msg => {
        room = socket.handshake.query.room;
        io.to(room).emit('message', msg);
    });
}

const regDisconnectHandler = (io, socket) => {
    socket.on('disconnect', () => {
        room = socket.handshake.query.room;
        user = socket.handshake.query.user;

        //send leave event to all users
        io.to(room).emit('leave', user);

        //delete entry in map
        rooms.get(room).delete(user);
        console.log('user disconnected');
    });
}

const regConnectionHandler = (io) => {
    io.on('connection', (socket) => {
        room = socket.handshake.query.room;
        user = socket.handshake.query.user;
        console.log(user + ' connected for room ' + room);
    

        //join room
        socket.join(room);
        //joining message to all users of room
        io.to(room).emit('join', user);
        
        //add to map
        if(!rooms.has(room))
            rooms.set(room, new Set());
    
        //get old users and send to new user
        userSet = rooms.get(room);
        socket.emit('init', [...rooms.get(room)]);

        //add entry in map
        rooms.get(room).add(user);
    
        
        regMessageHandler(io, socket);
        regDisconnectHandler(io, socket);
    });
}


module.exports = (server) => {
    io = socket_io(server);
    regConnectionHandler(io);
}
