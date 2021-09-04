var express = require('express');
var router = express.Router();
var comentariosModel = require('../../models/comentariosModel');

router.get('/:id_usuario', async function(req, res, next) {
    console.log("entra al GET de comentarios.js");

    var notiene=false; // controla si el usuario tiene comentarios propios  
    var notienen=false; // controla hay  comentarios de otros usuarios  
    req.session.id_usuario = req.params.id_usuario;

    var items = await comentariosModel.listadoComentariosPropios(req.session.id_usuario);
    if (JSON.stringify(items)=='[]'){
         notiene= true;
    }
    var items1= await comentariosModel.listadoComentariosAjenos(req.session.id_usuario);
    if (JSON.stringify(items1)=='[]'){
        notienen= true;
    }
    res.render('admin/comentarios', {
            layout: 'layout',
            usuario: req.session.usuario,
            id_usuario: req.session.id_usuario,
            notiene: notiene,
            notienen: notienen,
            items,
            items1
    });
});

router.get('/baja/:id_item/:id_usuario',  async (req, res, next) => {
    var id_item= req.params.id_item;
    var notiene=false;
    var notienen=false;
    req.session.id_usuario = req.params.id_usuario;

    await comentariosModel.bajaComentarios(id_item);

    var items = await comentariosModel.listadoComentariosPropios(req.session.id_usuario);
    if (JSON.stringify(items)=='[]'){
         notiene= true;
    }
    var items1= await comentariosModel.listadoComentariosAjenos(req.session.id_usuario);
    if (JSON.stringify(items1)=='[]'){
        notienen= true;
    }
    res.render('admin/Comentarios', {
            layout: 'layout',
            usuario: req.session.usuario,
            id_usuario: req.session.id_usuario,
            notiene: notiene,
            notienen: notienen,
            items,
            items1
    });
 }); //Baja de items------------------------------------------------------------------------

//Alta de registros
//Capturamos la ruta del alta y mostramos la plantilla correspondiente 
router.get('/alta/:id_usuario', function(req, res, next) {
    req.session.id_usuario = req.params.id_usuario;
    res.render('altaComentarios',{
        usuario:req.session.usuario,
        id_usuario:req.session.id_usuario});
  });

//Cuando se presiona el botón submit procedemos a capturar dicha ruta donde procedemos a cargar los datos en la tabla de la base de datos
router.post('/alta',  async (req, res, next) =>{
    try{
        var notiene=false;
        var notienen=false;
        req.session.id_usuario =req.body.id_usuario ;
        /*armar fecha y hora para grabar ----------*/
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
        var v_fecha_paraguardar = year + "-" + month + "-" + date + " " +hours + ":" + minutes; 
        console.log(v_fecha_paraguardar);
        /* fin fecha-------------*/          


        if(req.body.desc_item != ""){
                    await comentariosModel.altaComentarios(req.body.desc_item,req.session.id_usuario,v_fecha_paraguardar);

                    var items = await comentariosModel.listadoComentariosPropios(req.session.id_usuario);
                    if (JSON.stringify(items)=='[]'){
                        notiene= true;
                    }
                    var items1= await comentariosModel.listadoComentariosAjenos(req.session.id_usuario);
                    if (JSON.stringify(items1)=='[]'){
                        notienen= true;
                    }
                    res.render('admin/comentarios', {
                    layout: 'layout',
                    usuario: req.session.usuario,
                    id_usuario: req.session.id_usuario,
                    notiene: notiene,
                    notienen: notienen,
                    items,
                    items1
            });
        }
        else
        {
            res.render('altaComentarios',{
                error:true,
                mensaje:'You have to write something...',
                id_usuario: req.session.id_usuario
            });
        }//else

    }//try
    catch(error){
        console.log(error);
        res.render('altaComentarios',{
            error:true,
            mensaje:'Ops...something wrong has happend. The comment was not added.',
            id_usuario: req.session.id_usuario
        });

    }//catch

 });    //router post alta--------------------------------------------------------------


router.get('/modificar/:id_item/:id_usuario', async (req, res, next) =>{
        var id_item= req.params.id_item;
        var items = await comentariosModel.encontrarComentarios(id_item);

        res.render('modificarItems', {
            items: items
        });
    });

router.post('/confirmarModificacion',  async (req, res, next) => {

    try{

        var notiene=false;
        var notienen=false;
        req.session.id_usuario =req.body.id_usuario ;
        // fecha----------------------------------------------
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
    
        var v_fecha_paraguardar = year + "-" + month + "-" + date + " " +hours + ":" + minutes;        
        var obj ={
            desc_item: req.body.desc_item,
            id_usuario: req.body.id_usuario,
            fecha_item: v_fecha_paraguardar        
        }
        await comentariosModel.modificarComentarios(obj, req.body.id_item);
        
                var items = await comentariosModel.listadoComentariosPropios(req.session.id_usuario);
                var items = await comentariosModel.listadoComentariosPropios(req.session.id_usuario);
                if (JSON.stringify(items)=='[]'){
                    notiene= true;
                }
                var items1= await comentariosModel.listadoComentariosAjenos(req.session.id_usuario);
                if (JSON.stringify(items1)=='[]'){
                    notienen= true;
                }
                res.render('admin/comentarios', {
                    layout: 'layout',
                    usuario: req.session.usuario,
                    id_usuario: req.session.id_usuario,
                    notiene: notiene,
                    notienen: notienen,
                    items,
                    items1
            });
    }//try
    catch (error){
            console.log(error);
            res.render('admin/modificar',{
                error:true,
                mensaje:'Comment not updated. Try again!'
            })
    }
})//confirmar modificar ---------------------

module.exports = router;
