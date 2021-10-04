var express = require('express');
var router = express.Router();


//var bodyParser = require('body-parser');
router.use(express.urlencoded({ extended: false }));

// GET users listing.
router.get('/:archivo', function(req, res, next) {

  var v_archivo = req.params.archivo;
  console.log('en pdf.js con archivo= ' + v_archivo);

  res.download(__dirname+'/public/img/' +v_archivo,v_archivo);

});
module.exports = router;


