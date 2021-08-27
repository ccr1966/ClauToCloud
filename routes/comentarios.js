var express = require('express');
var router = express.Router();

//incluimos el paquete bd con la conexion a la tabla sql
var bd=require('./bd');

router.use(express.urlencoded({ extended: false }));

//Alta de registros
//Capturamos la ruta del alta y mostramos la plantilla correspondiente 
router.get('/alta/:id_usuario', function(req, res, next) {
    req.session.id_usuario = req.params.id_usuario;
    res.render('altaComentarios',{usuario:req.session.usuario,id_usuario:req.session.id_usuario});
  });

//Cuando se presiona el botón submit procedemos a capturar dicha ruta donde procedemos a cargar los datos en la tabla de la base de datos
router.post('/alta',  function(req, res, next) {
    
    console.log(req.body.desc_item);
    console.log(req.body.id_usuario);

    v_id_usuario =req.body.id_usuario ;

    let ts = Date.now();

    let date_ob = new Date(ts);
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
      // hora-----------------------
      let date_ob2 = new Date();

      // current hours
      let hours = ("0" + date_ob2.getHours()).slice(-2);
      let minutes = ("0" + date_ob2.getMinutes()).slice(-2);

      console.log(hours + ":" + minutes);
      console.log(year + "-" + month + "-" + date);

      var v_fecha_paraguardar =    date + "/" + month + "/" + year + " " +hours + ":" + minutes; 
    console.log(v_fecha_paraguardar);
  

     var registro={
         desc_item:req.body.desc_item,
         id_usuario:req.body.id_usuario,
         fecha_item: v_fecha_paraguardar
       }; 

      bd.query('insert into items set ?',registro, function (error,resultado){
          if (error){
              console.log(error);
              return;
          }
      });    //query insert

//consulta 1 son todos y consulta, solo los del usuario.
     consulta1 = "select items.desc_item, items.id_item, items.fecha_item, usuarios.usuario,usuarios.id_usuario from items INNER JOIN usuarios ON usuarios.id_usuario=items.id_usuario WHERE usuarios.id_usuario <>" + req.session.id_usuario + "   ORDER BY items.fecha_item DESC"
     consulta = "select items.desc_item, items.id_item, items.fecha_item, usuarios.usuario,usuarios.id_usuario from items INNER JOIN usuarios ON usuarios.id_usuario=items.id_usuario WHERE usuarios.id_usuario =" + req.session.id_usuario + " ORDER BY items.fecha_item DESC"

      console.log(consulta);
    
      bd.query(consulta, function(error,filas){
                if (error) {            
                    console.log('error en la consulta SELECT de comentarios');
                    return;
                }
                if (filas.length>0) {
                    bd.query(consulta1, function(error,filas1){
                        if (error) {            
                            console.log('error en la consulta1 SELECT de comentarios' + consulta1 + ' '+ error);
                            return;
                        }
                        if (filas1.length>0) {
                            console.log('viene a verComentarios');
                            res.render('verComentarios',{notiene:false, notienen:false,items:filas, items1:filas1, usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                        }    
                        console.log('viene a verComentarios');
                        res.render('verComentarios',{notiene:false, notienen:true,items:filas, usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                    }); //consulta1
                } filas>0


  });    //query select

  }); //router


router.get('/listadoComentarios/:id_usuario', function(req, res, next) {


    var v_id_usuario = req.params.id_usuario;
    console.log('v-id-usuario'+ v_id_usuario);
    

  console.log('LISTADO comentarios - hace select de comentarios')
  consulta1 = "select items.desc_item, items.id_item, items.fecha_item, usuarios.usuario,usuarios.id_usuario from items INNER JOIN usuarios ON usuarios.id_usuario=items.id_usuario  WHERE usuarios.id_usuario <> " + req.session.id_usuario + " ORDER BY items.fecha_item DESC"
  consulta = "select items.desc_item, items.id_item, items.fecha_item, usuarios.id_usuario, usuarios.usuario from items INNER JOIN usuarios ON usuarios.id_usuario=items.id_usuario WHERE usuarios.id_usuario= "+req.session.id_usuario+" ORDER BY items.fecha_item DESC";

    console.log(consulta);

    bd.query(consulta, function(error,filas){
            if (error) {            
                console.log('error en la consulta SELECT de comentarios' + consulta + ' '+ error);
                return;
            }
            if (filas.length>0) {
                bd.query(consulta1, function(error,filas1){
                    if (error) {            
                        console.log('error en la consulta1 SELECT de comentarios' + consulta1 + ' '+ error);
                        return;
                    }
                    if (filas1.length>0) {
                        console.log('viene a verComentarios');
                        res.render('verComentarios',{notiene:false, notienen:false,items:filas, items1:filas1, usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                    }    
                    console.log('viene a verComentarios');
                    res.render('verComentarios',{notiene:false, notienen:true,items:filas, usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                });//consulta1
            } 
            else{ //no hay coments del usuario pero puede haber de otros
                bd.query(consulta1, function(error,filas1){
                    if (error) {            
                        console.log('error en la consulta1 SELECT de comentarios' + consulta1 + ' '+ error);
                        return;
                    }
                    if (filas1.length>0) {
                        console.log('viene a verComentarios');
                        res.render('verComentarios',{notiene:true, notienen:false,items1:filas1, usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                    }else{    
                     // select usuario cuando no quedan items
                        console.log ('va a renderVerComentarios1 con req_params id_usuario= '+req.params.id_usuario);
                        res.render('verComentarios1',{usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                    }
                }); //consulta1
        }
        });//query select items
});


router.get('/modificar/:id_item/:id_usuario', function(req, res, next) {
  var id_item= req.params.id_item;
  var id_usuario= req.params.id_usuario;
  
  var consulta  ="select  * from items where id_item =" + id_item;
console.log(consulta);

  bd.query(consulta, function(error,filas){
            if (error) {            
                console.log('error en la modificacion');
                return;
            }
            if (filas.length>0) {
                res.render('modificarItems',{items:filas, usuario:req.session.usuario,id_usuario:req.session.id_usuario});
            } else {
                res.render('MensajesAlUsuario',{mensaje:'Sorry, the comment does not exist'});
            }    
        });
});


router.post('/confirmarModificacion',  function(req, res, next) {

    console.log(req.body.id_item);
    console.log(req.body.desc_item);
     console.log(req.body.id_usuario);

     let ts = Date.now();

     let date_ob = new Date(ts);
         let date = ("0" + date_ob.getDate()).slice(-2);
         let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
         let year = date_ob.getFullYear();
       // hora-----------------------
       let date_ob2 = new Date();
 
       // current hours
       let hours = ("0" + date_ob2.getHours()).slice(-2);
       let minutes = ("0" + date_ob2.getMinutes()).slice(-2);
 
       console.log(hours + ":" + minutes);
       console.log(year + "-" + month + "-" + date);
 
       var v_fecha_paraguardar =    date + "/" + month + "/" + year + " " +hours + ":" + minutes; 
     
      consulta ="UPDATE items  SET desc_item= '" + req.body.desc_item  + "', fecha_item= '" + v_fecha_paraguardar +"' " +" WHERE id_item= " + req.body.id_item;
      console.log(consulta);

    bd.query(consulta, function(error,filas){
    console.log('consulta');
    if (error) {            
        console.log('error en UPDATE');
        console.log(error);
        return;
    }
    else{
        console.log('en CONFIRMAR MODIFICACION va a hacer select de comentarios')
        consulta1 = "select items.desc_item, items.id_item, items.fecha_item, usuarios.id_usuario, usuarios.usuario from items INNER JOIN usuarios ON usuarios.id_usuario=items.id_usuario WHERE usuarios.id_usuario <> " + req.session.id_usuario + "ORDER BY fecha_item DESC";
        consulta = "select items.desc_item, items.id_item, items.fecha_item, usuarios.id_usuario, usuarios.usuario from items INNER JOIN usuarios ON usuarios.id_usuario=items.id_usuario WHERE usuarios.id_usuario= "+req.session.id_usuario+" ORDER BY items.fecha_item DESC";
          console.log(consulta);
      
          bd.query(consulta, function(error,filas){
                  if (error) {            
                      console.log('error en CONFIRMAR MODIFICACIONla consulta SELECT de comentarios 2');
                      return;
                  }
                  if (filas.length>0) {
                    bd.query(consulta1, function(error,filas1){
                        if (error) {            
                            console.log('error en la consulta1 SELECT de comentarios' + consulta1 + ' '+ error);
                            return;
                        }
                        if (filas1.length>0) {
                            console.log('viene a verComentarios');
                            res.render('verComentarios',{notiene:false, notienen:false,items:filas, items1:filas1, usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                        }    
                        console.log('viene a verComentarios');
                        res.render('verComentarios',{notiene:false, notienen:true,items:filas, usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                    }); //consulta1
                  } // if habia filas del usuario
                  else
                  { //no hay coments del usuario pero puede haber de otros
                    bd.query(consulta1, function(error,filas1){
                        if (error) {            
                            console.log('error en la consulta1 SELECT de comentarios' + consulta1 + ' '+ error);
                            return;
                        }
                        if (filas1.length>0) {
                            console.log('viene a verComentarios');
                            res.render('verComentarios',{notiene:true, notienen:false,items1:filas1, usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                        }
                        else{    
                         // select usuario cuando no quedan items
                            console.log ('va a renderVerComentarios1 con req_params id_usuario= '+req.params.id_usuario);
                            res.render('verComentarios1',{usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                        }
                    }); //consulta1
              } //else no hay com de usuario
            });//query select items

    } //update

});//query de UPDATE
}); //route 



router.get('/baja/:id_item/:id_usuario',  function(req, res, next) {
    var id_item= req.params.id_item;
    var id_usuario = req.params.id_usuario;

    var consulta  ="delete FROM items  where id_item =" + id_item;
    bd.query(consulta, function(error,filas){
              if (error) {            
                  console.log('error en delete');
                  console.log(error);
                  return;
              }
          }); //query delete
          

          console.log('en BAJA va a hacer select de comentarios')
          consulta1 = "select  items.desc_item,items.id_item, items.fecha_item, usuarios.id_usuario, usuarios.usuario from items INNER JOIN usuarios ON usuarios.id_usuario=items.id_usuario WHERE usuarios.id_usuario <>" + req.session.id_usuario +" ORDER BY items.fecha_item DESC";
          consulta = "select items.desc_item, items.id_item, items.fecha_item, usuarios.id_usuario, usuarios.usuario from items INNER JOIN usuarios ON usuarios.id_usuario=items.id_usuario WHERE usuarios.id_usuario= "+req.session.id_usuario+" ORDER BY items.fecha_item DESC";

        
            console.log(consulta);
        
            bd.query(consulta, function(error,filas){
                    if (error) {            
                        console.log('error en la consulta SELECT de comentario');
                        return;
                    }
                    if (filas.length>0) {
                        bd.query(consulta1, function(error,filas1){
                            if (error) {            
                                console.log('error en la consulta1 SELECT de comentarios' + consulta1 + ' '+ error);
                                return;
                            }
                            if (filas1.length>0) {
                                console.log('viene a verComentarios');
                                res.render('verComentarios',{notiene:false, notienen:false,items:filas, items1:filas1, usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                            }    
                            console.log('viene a verComentarios');
                            res.render('verComentarios',{notiene:false, notienen:true,items:filas, usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                        });//consulta1
                    } 
                    else{
                        { //no hay coments del usuario pero puede haber de otros
                            bd.query(consulta1, function(error,filas1){
                                if (error) {            
                                    console.log('error en la consulta1 SELECT de comentarios' + consulta1 + ' '+ error);
                                    return;
                                }
                                if (filas1.length>0) {
                                    console.log('viene a verComentarios');
                                    res.render('verComentarios',{notiene:true, notienen:false,items1:filas1, usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                                }
                                else{    
                                 // select usuario cuando no quedan items
                                    console.log ('va a renderVerComentarios1 con req_params id_usuario= '+req.params.id_usuario);
                                    res.render('verComentarios1',{usuario:req.session.usuario,id_usuario:req.session.id_usuario});
                                }
                            }); //consulta1
                      } //else no hay com de usuario
                          }
                });//query select items
  });

module.exports = router;
