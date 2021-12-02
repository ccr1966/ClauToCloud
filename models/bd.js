
var mysql = require('mysql');
var util = require('util');
//Para usar la conexion mediante dotenv
require('dotenv').config();

/* para HEROKU ---------------------------------------------------------------------------------------------------------
          LINK HEROKU  mysql://ba67b75b3a76c0:735e4798@us-cdbr-east-04.cleardb.com/heroku_f6f8eaaaa6b8fd3?reconnect=true
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

