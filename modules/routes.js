const router = require('express').Router();
const root = require('path').dirname(__dirname);

router.get('/', function (req, res) {
    res.sendFile('./views/index.html', {root: root});
});

router.get('/chat', function (req, res) {
    res.redirect('/');
});

router.post('/chat', function(req, res) {
    if(req.body)
    {
        res.cookie('room', req.body.room);
        res.cookie('user', req.body.name);
        res.sendFile('./views/chat.html', {root: root});
    }
    else 
        res.redirect('/');
});

module.exports = router;