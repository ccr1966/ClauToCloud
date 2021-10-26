
var mysql = require('mysql');
var util = require('util');
//Para usar la conexion mediante dotenv
require('dotenv').config();

/* para HEROKU ---------------------------------------------------------------------------------------------------------
          LINK HEROKU  mysql://b7edf02f03c8fd:48d4a4c4@us-cdbr-east-04.cleardb.com/heroku_ed243507c04da6e?reconnect=true
            MYSQL_DB_NAME: 	heroku_ed243507c04da6e
            MYSQL_HOST:		us-cdbr-east-04.cleardb.com
            MYSQL_PASSWORD:	48d4a4c4
            MYSQL_USER: 	b7edf02f03c8fd

------------------------------------------------------------------------------------------------------------------------*/
var cliente = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME 
})

cliente.query = util.promisify(cliente.query);

/*
cliente.query("INSERT IGNORE INTO `usuarios` (`usuario`, `clave`, `nombre`, `apellido`) VALUES ('guest', '1234', 'My', 'Guest')", function (err, result) {  
  if (err) throw err;  
  console.log("Insertó user guest.");  
}); //insert
*/
module.exports=cliente;

