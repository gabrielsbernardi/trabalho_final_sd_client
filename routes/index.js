var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });  
});

router.get('/room', function(req, res, next) {  
  console.log('Room: ' + req.query.room);
  res.render('p2p', {room: req.query.room, name: req.query.name});
});

router.get('/error', function(req, res, next) {    
  if (req.query.type == "room_full")
  res.render('error', {message: "Sala cheia!"});
});

module.exports = router;
