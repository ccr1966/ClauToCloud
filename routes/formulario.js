var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

//var bodyParser = require('body-parser');
router.use(express.urlencoded({ extended: false }));

//GET users listing.
router.get('/', function(req, res, next) {
  res.render('formulario',{usuario:req.session.usuario,id_usuario:req.session.id_usuario});
});

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'claudiarossi0707@gmail.com', // Cambialo por tu email
      pass: 'cmik nzph soik zria'   // password de la app.js
    },
    secure: false, // use SSL
    //tls: {
      //rejectUnauthorized: false
 // }
});


router.post('/enviar',  function(req, res, next) {
  
     var v_nombre = req.body.nombre;
     var v_asunto = req.body.asunto;
     var v_email = req.body.email;
     var v_mensaje = req.body.mensaje;
    
     const mailOptions = {
        from: v_nombre + "<" + v_email + ">",
        to: "servicios.desarrollo@gmail.com", // Cambia esta parte por el destinatario 'flavia.ursino@gmail.com'
        subject: v_asunto,
        html: "<font face=arial size=4><strong>Nombre:</strong> " + v_nombre + "<br/>"
        + "<strong>E-mail:</strong> " + v_email + " <br/>"
        + "<strong>Asunto:</strong> " + v_asunto  + " <br/>"
        + "<strong>Mensaje:</strong> " + v_mensaje
        };
  
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
          console.log(err)
        else
        {
          console.log("Mensaje enviado");
          res.render('MensajesAlUsuario',{mensaje:'Email recieved succesfully. I will contact you soon. Thank you!',pagina:'/Home/', usuario:req.session.usuario,id_usuario:req.session.id_usuario});
        }
        }); // transporter ----------------
     
});// post enviar-----------------

module.exports = router;
