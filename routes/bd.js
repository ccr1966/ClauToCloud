
var mysql = require('mysql');
var util = requiere('util');

var cliente = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME
})

cliente.query = util.promisify(cliente.query);

/* para conexion local 
var cliente = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Esme1966Pasquini',
    port : 3306,
    database : 'basefinalwm'
 });
*/
 /*LINK HEROKU
 mysql://b80fba2a620d8d:14284f40@us-cdbr-east-04.cleardb.com/heroku_5f8e883e779f0b7?reconnect=true
          Usuario:b80fba2a620d8d
          pass: 14284f40
          host=us-cdbr-east-04.cleardb.com
          base= heroku_5f8e883e779f0b7
    MYSQL_HOST     : 'us-cdbr-east-04.cleardb.com',
    MYSQL_USER     : 'b80fba2a620d8d',
    MYSQL_PASSWORD : '14284f40',
    MYSQL_DB_NAME  : 'heroku_5f8e883e779f0b7'

  */

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

