var express = require('express');
var router = express.Router();


//var bodyParser = require('body-parser');
router.use(express.urlencoded({ extended: false }));

// GET users listing.
router.get('/', function(req, res, next) {

  res.render('home', {
    layout: 'layout',
  });

});
module.exports = router;