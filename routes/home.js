var express = require('express');
var router = express.Router();


//var bodyParser = require('body-parser');
router.use(express.urlencoded({ extended: false }));

// GET users listing.
router.get('/', function(req, res, next) {

  console.log('en HOME.js session id usuario= ' + req.session.id_usuario );
  console.log('en HOME.js session usuario= ' + req.session.usuario );

  res.render('home', {usuario:req.session.usuario,id_usuario: req.session.id_usuario});

});
module.exports = router;