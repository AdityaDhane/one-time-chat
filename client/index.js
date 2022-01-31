const socket = io();

socket.on('message', msg => {
    console.log(msg);
    displayMessage(msg, 'in');
});

const sendMessage = (msg) => {
    socket.emit('message', msg);
    displayMessage(msg);
};
