
const mysql = require('mysql');

/* para conexion local
var cliente = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Esme1966Pasquini',
    port : 3306,
    database : 'basefinalwm'
 });
*/
 /*para HEROKU
 
 mysql://b80fba2a620d8d:14284f40@us-cdbr-east-04.cleardb.com/heroku_5f8e883e779f0b7?reconnect=true
          Usuario:b80fba2a620d8d
          pass: 14284f40
          host=us-cdbr-east-04.cleardb.com
          base= heroku_5f8e883e779f0b7
 */

var cliente = mysql.createConnection({
    host     : 'us-cdbr-east-04.cleardb.com',
    user     : 'b80fba2a620d8d',
    password : '14284f40',
    database : 'heroku_5f8e883e779f0b7',
    port: '8889'
  });

/* codigo de web para cortar el error de heroku*/
var connection;
function handleDisconnect() {
  connection = mysql.createConnection(cliente); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();



//fin codigo para HEROKU ********************************************************************/

  cliente.query("CREATE TABLE IF NOT EXISTS usuarios (`id_usuario` int(100) NOT NULL AUTO_INCREMENT,`usuario` varchar(20) NOT NULL,      `clave` varchar(20) NOT NULL,`nombre` varchar(50) NOT NULL,      `apellido` varchar(50) NOT NULL,  PRIMARY KEY (`id_usuario`), UNIQUE(`usuario`)    ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ", function (err, result) {  
    if (err) throw err;  
    console.log("query de creacion de tabla USUARIOS ok. Si no existe se crea. ");  
	
   });  //create table usuarios
  

   cliente.query("CREATE TABLE IF NOT EXISTS items (`id_item` int(100) NOT NULL AUTO_INCREMENT, `id_usuario` int(100), `fecha_item` datetime, `desc_item` varchar(255) NOT NULL,  PRIMARY KEY (`id_item`)    ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ", function (err, result) {  
    if (err) throw err;  
    console.log("query de creacion de tabla ITEMS ok. Si no existe se crea.");  
    });

    cliente.query("SELECT * FROM  usuarios", function (err, filas) {  
          if (err) throw err;  
          console.log("paso por select  de usuarios.");
          if (filas.length<0) {
                console.log("va a insertar USUARIOS si no hay... ");  
                cliente.query("INSERT IGNORE INTO `usuarios` (`usuario`, `clave`, `nombre`, `apellido`) VALUES ('flavia', 'ursino', 'Flavia', 'Ursino'),  ('claudia', 'rossi', 'Claudia Cecilia', 'Rossi')", function (err, result) {  
                        if (err) throw err;  
                        console.log("paso por inserts de usuarios.");  
                   }); //insert
            } // if no hay filas 
    }); //select para chequear si hay

module.exports=cliente;
