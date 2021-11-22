var express = require('express');
var router = express.Router();

var usuariosModel = require('./../../models/usuariosModel');

//var bodyParser = require('body-parser');
router.use(express.urlencoded({ extended: false }));

// GET users listing. 
router.get('/', function(req, res, next) {
  res.render('admin/login',
  {
    layout: 'admin/layout',
  }); 
});

// GET users listing. 
router.get('/salir', function(req, res, next) {
  // no funciona en heroku req.session.destroy();
  req.session = null; 
  // res.redirect('/');
  res.render('admin/login',
     {layout: 'admin/layout'
    });
});

router.post('/',  async function(req, res, next) {

  try{
    var usuario = req.body.usuario;
    var clave = req.body.clave;
    console.log('usuario=' + usuario);
    console.log('clave=' + clave);

    var filas = await usuariosModel.getUsuario(usuario, clave);

    console.log('ESTA EN login.js LLAMO A usuariosModel.getUsuario Y TRAJO FILAS='+filas);

    if (filas != undefined){
        req.session.id_usuario = filas.id_usuario;
        req.session.usuario = filas.usuario;
        console.log('ENTRO POR FILAS DISTINTO DE indefinido. id_usuario=' + req.session.id_usuario);
        res.render('home');
    }
    else{
      res.render('admin/login', {
        layout: 'admin/layout',
        mensaje:'You are not a user or you put an incorrect password',
        error:true
      });
    }
  }
   catch(error){
     console.log(error);
   }
   
   // res.render('MensajesAlUsuario',{mensaje:'Ops..we have a problem.',pagna:'/'});
	 // res.render('MensajesAlUsuario',{mensaje:'You aure not a user or you put a incorrect password.',pagina:'/'});
})

module.exports = router;