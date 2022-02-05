const socket = io({query: Cookies.get()});
const users = document.getElementById('users');

const sendMessage = (msg) => {
    socket.emit('message', {text: msg, name:user});
    displayMessage(msg, user);
};

const addUser = (name) => {
    const li = document.createElement('li');
    li.setAttribute("id", "user-"+name);
    
    const you = (user===name)?"(you)":'';
    li.innerHTML = name + you;
    
    users.appendChild(li);
};

socket.on('message', msg => {
    if(user !== msg.name)
    {
        displayMessage(msg.text, msg.name, 'in');
    }
});

socket.on('init', userSet => {
    userSet.forEach(name => { addUser(name) });
});

socket.on('join', name => {
    addUser(name);
});

socket.on('leave', name => {
    const li = document.getElementById('user-'+name);
    li.parentNode.removeChild(li);
});

