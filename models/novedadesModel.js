var pool= require('./bd');

async function getNovedades(){
        var query = "select * from ultimos_trabajos";
        var rows = await pool.query(query);
        return rows;
}

async function insertNovedades(obj){
    try{
        var query= "insert into ultimos_trabajos set ? ";
        var rows= await pool.query(query, [obj]);
        return rows;
    } catch(error){
        console.log(error);
        throw error;
    }
}

async function deleteNovedadesById(id){
    var query = "delete from ultimos_trabajos where id= ?";
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getNovedadesById(id){
    var query = "select * from ultimos_trabajos where id= ?";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarNovedadById(obj, id){
    try{
        var query= "update ultimos_trabajos set ? where id=?";
        var rows= await pool.query(query, [obj, id]);
        return rows;
    } catch(error){
        console.log(error);
        throw error;
    }
}

async function buscarNovedades(busqueda){
    var query = "select * from ultimos_trabajos where titulo like ? OR subtitulo like ?";
    var rows = await pool.query(query, ['%' + busqueda + '%', '%' + busqueda + '%']);
    return rows;
}


module.exports= { getNovedades, deleteNovedadesById, insertNovedades, getNovedadesById, modificarNovedadById, buscarNovedades }