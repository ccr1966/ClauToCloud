var express = require('express');
var router = express.Router();


//var bodyParser = require('body-parser');
router.use(express.urlencoded({ extended: false }));

// GET users listing.
router.get('/', function(req, res, next) {
  
  console.log('en LOOK.js session id usuario= ' + req.session.id_usuario );
  console.log('en LOOK.js session usuario= ' + req.session.usuario );

  res.render('look', {usuario:req.session.usuario,id_usuario:req.session.id_usuario});

});

module.exports = router;