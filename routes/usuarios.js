var express = require('express');
var router = express.Router();

var bd=require('./bd');

//var bodyParser = require('body-parser');
router.use(express.urlencoded({ extended: false }));

// GET users listing. 
router.get('/salir', function(req, res, next) {
  req.session = null; 
  // no funciona en heroku req.session.destroy();
  res.redirect('/');
});


router.post('/chequearLogin',  function(req, res, next) {
  
  //console.log(req.body.usuario);
  var consulta = "select id_usuario, usuario, clave, nombre, apellido from usuarios where usuarios.usuario= '"+ req.body.usuario + "' and usuarios.clave = '" + req.body.clave + "'"
  console.log(consulta);

  //agregue variables de sesion-----------
 req.session.usuario= req.body.usuario;

 console.log('req.session.nombre...' + req.session.nombre);
 
  bd.query(consulta, function(error,filas){
            if (error) {            
                console.log('error en la consulta');
             res.render('MensajesAlUsuario',{mensaje:'Ops..we have a problem.',usuario:req.session.usuario, id_usuario:req.session.id_usuario});
	   return;
            }
            if (filas.length>0) {
              console.log('encontro usuario y clave');
              console.log({usuarios:filas});


               console.log(JSON.stringify(filas));
              var data = JSON.stringify(filas[0].id_usuario);
              console.log('data '+ data);
              req.session.id_usuario = data;
              res.render('home',{usuario:req.session.usuario, id_usuario:req.session.id_usuario});
            } 
            else {
              console.log('HAY QUE PONER PAGINA DE USUARIO INEXISTENTE');
                res.render('MensajesAlUsuario',{mensaje:'You aure not a user or you put a incorrect password.',usuario:req.session.usuario, id_usuario:req.session.id_usuario});
            }    
        });
});


module.exports = router;
