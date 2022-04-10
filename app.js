const express = require('express');
const app = express();
const server = require('http').Server(app);
const PORT = 80

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


server.listen(PORT, () => {
    console.log('App listening on port '+PORT)
});