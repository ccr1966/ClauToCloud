const { response } = require('../app');
var cliente = require('./bd');
//var md5 = require('md5');

async function getUsuario(usuario, clave){
    try{ 
        var consulta= "select * from usuarios WHERE usuarios.usuario = '"+ usuario +"' and clave = '" + clave +"'";
        
        var filas = await cliente.query(consulta);
        console.log(filas);
        
        return filas[0];
    }
    catch(error){
        throw error;
    }
}

module.exports = { getUsuario }
