var cliente = require('./bd');

async function listadoComentariosPropios(id){
    var consulta = "select items.desc_item, items.id_item, items.fecha_item, usuarios.id_usuario, usuarios.usuario from items INNER JOIN usuarios ON usuarios.id_usuario=items.id_usuario WHERE usuarios.id_usuario= "+ id +" ORDER BY items.fecha_item DESC";

    var items = await cliente.query(consulta);
    return items;

}
async function listadoComentariosAjenos(id){
    var consulta1 = "select items.desc_item, items.id_item, items.fecha_item, usuarios.usuario,usuarios.id_usuario from items INNER JOIN usuarios ON usuarios.id_usuario=items.id_usuario  WHERE usuarios.id_usuario <> " + id + " ORDER BY items.fecha_item DESC"
    
    var items1= await cliente.query(consulta1);
    return  items1;
    
}

async function bajaComentarios(id){
    var consulta  ="delete FROM items  where id_item = " + id;
    
    var items = await cliente.query(consulta,[id]) ;

    return items;
}

async function altaComentarios(des,id,fecha){
    try{
        
        var consulta= "INSERT INTO items (desc_item,id_usuario,fecha_item) VALUES ('"+des+"', "+id+",'"+fecha+ "')";
        console.log(consulta);
        var filas = await cliente.query(consulta);
        console.log(filas);
        return filas[0];
    }
    catch(error){
        throw error;
    }
}


async function encontrarComentarios(id){
    var consulta = "select * from items WHERE items.id_item= "+ id;

    var items = await cliente.query(consulta);
    return items;

}

async function modificarComentarios(obj, id){
    try{
        var consulta = "UPDATE items SET ? WHERE id_item =?";
        var filas = await cliente.query(consulta, [obj, id]);
        return filas; 
    } catch (eror){
        throw error;
    }
} // modificar---------------------------------------

module.exports = { listadoComentariosPropios, listadoComentariosAjenos, bajaComentarios, altaComentarios, encontrarComentarios, modificarComentarios }
