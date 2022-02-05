const express = require('express');
const app = express();
const server = require('http').Server(app);

const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(express.static('./public'));
const router = require('./modules/routes');
app.use('/', router);


const socketHandler = require('./modules/socketHandler');
socketHandler(server);


server.listen(3000, () => {
    console.log('App listening on port 3000')
});