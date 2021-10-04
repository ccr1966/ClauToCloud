var express = require('express');
var router = express.Router();
var fs = require("fs");


//var bodyParser = require('body-parser');
router.use(express.urlencoded({ extended: false }));

var file = fs.createReadStream('./public/img/Resume_CCR.pdf');
var stat = fs.statSync('./public/img/Resume_CCR.pdf');

// GET users listing.
router.get('/', function(req, res, next) {

  console.log('en HOME.js session id usuario= ' + req.session.id_usuario );
  console.log('en HOME.js session usuario= ' + req.session.usuario );

  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=Resume.pdf');
  file.pipe(res);

  //res.render('home', {usuario:req.session.usuario,id_usuario: req.session.id_usuario});

});
module.exports = router;


