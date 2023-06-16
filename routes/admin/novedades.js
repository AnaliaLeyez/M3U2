// este es el controlador de las rutas de novedades

var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel'); 

var util =require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy= util.promisify(cloudinary.uploader.destroy);

// listar novedades:
router.get('/', async function(req,res,next){

    var novedades 
    if(req.query.q===undefined){
        novedades = await novedadesModel.getNovedades();
    } else{
        novedades= await novedadesModel.buscarNovedades(req.query.q);
    }

    novedades= novedades.map(novedad=>{
        if(novedad.img_principal_id){
            const imagen_principal=cloudinary.image(novedad.img_principal_id, {
                width: 70,
                height:70,
                crop: 'fill'
            });
            return{
                ...novedad,
                imagen_principal
            } 
        } else {
                return{
                    ...novedad,
                    imagen_principal:''
                }
            }
        });

    res.render('admin/novedades',{
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades,
        is_search: req.query.q !== undefined,
        q: req.query.q
    });
});

// para eliminar una novedad:
router.get('/eliminar/:id', async (req,res,next) =>{
    const id= req.params.id;

    let novedad= await novedadesModel.getNovedadesById(id);
    if(novedad.img_principal_id){
        await(destroy(novedad.img_principal_id))
    }

    if(novedad.img_1_id){
        await(destroy(novedad.img_1_id))
    }

    if(novedad.img_2_id){
        await(destroy(novedad.img_2_id))
    }

    if(novedad.img_3_id){
        await(destroy(novedad.img_3_id))
    }
    await novedadesModel.deleteNovedadesById(id);
    res.redirect('/admin/novedades')
});

// para que aparezca el form de agregar:
router.get('/agregar', (req,res,next)=>{
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })
});

// agrega > post > insert:
router.post('/agregar', async(req,res, next) => {
    try{
        var img_principal_id= '';
        var img_1_id= '';
        var img_2_id= '';
        var img_3_id= '';
        if(req.files && Object.keys(req.files).length>0){
            imagen_principal= req.files.imagen_principal;
            img_principal_id=(await uploader(imagen_principal.tempFilePath)).public_id;
            imagen_1= req.files.imagen_1;
            img_1_id=(await uploader(imagen_1.tempFilePath)).public_id;
            imagen_2= req.files.imagen_2;
            img_2_id=(await uploader(imagen_2.tempFilePath)).public_id;
            imagen_3= req.files.imagen_3;
            img_3_id=(await uploader(imagen_3.tempFilePath)).public_id;
        }

        if(req.body.titulo != "" && req.body.subtitulo != ""){
            await novedadesModel.insertNovedades({...req.body, img_principal_id, img_1_id, img_2_id, img_3_id});
            res.redirect('/admin/novedades')
        } else{
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true, message: 'Todos los campos son requeridos'
            })
        }
    } catch(error){
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true, message: 'No se cargo la novedad'
        });
    }
});

// muestra el diseño de "modificar" con los datos de una sola novedad:
router.get('/modificar/:id', async (req,res,next)=>{
    var id= req.params.id;
    var novedad= await novedadesModel.getNovedadesById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    })
});

// modifica la novedad:
router.post('/modificar', async(req,res, next) => {
    try{
      let img_principal_id= req.body.img_principal_original;
      let img_1_id= req.body.img_1_original;
      let img_2_id= req.body.img_2_original;
      let img_3_id= req.body.img_3_original;
      let borrar_img_principal_vieja= false;
      let borrar_img_1_vieja= false;
      let borrar_img_2_vieja= false;
      let borrar_img_3_vieja= false;


      if(req.body.img_principal_delete==="1"){
          img_principal_id=null;
          borrar_img_principal_vieja=true;
      } else{
          if(req.files && req.files.imagen_principal){
              imagen_principal=req.files.imagen_principal;
              img_principal_id=(await
                  uploader(imagen_principal.tempFilePath)).public_id;
                  borrar_img_principal_vieja=true;
          }
      }
      if(borrar_img_principal_vieja && req.body.img_principal_original){
          await(destroy(req.body.img_principal_original));
      }


      if(req.body.img_1_delete==="1"){
          img_1_id=null;
          borrar_img_1_vieja=true;
      } else{
          if(req.files && req.files.imagen_1){
              imagen_1=req.files.imagen_1;
              img_1_id=(await
                  uploader(imagen_1.tempFilePath)).public_id;
                  borrar_img_1_vieja=true;
          }
      }
      if(borrar_img_1_vieja && req.body.img_1_original){
          await(destroy(req.body.img_1_original));
      }


      if(req.body.img_2_delete==="1"){
          img_2_id=null;
          borrar_img_2_vieja=true;
      } else{
          if(req.files && req.files.imagen_2){
              imagen_2=req.files.imagen_2;
              img_2_id=(await
                  uploader(imagen_2.tempFilePath)).public_id;
                  borrar_img_2_vieja=true;
          }
      }
      if(borrar_img_2_vieja && req.body.img_2_original){
          await(destroy(req.body.img_2_original));
      }


      if(req.body.img_3_delete==="1"){
          img_3_id=null;
          borrar_img_3_vieja=true;
      } else{
          if(req.files && req.files.imagen_3){
              imagen_3=req.files.imagen_3;
              img_3_id=(await
                  uploader(imagen_3.tempFilePath)).public_id;
                  borrar_img_3_vieja=true;
          }
      }
      if(borrar_img_3_vieja && req.body.img_3_original){
          await(destroy(req.body.img_3_original));
      }

        let obj= {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            img_principal_id,
            img_1_id,
            img_2_id,
            img_3_id,
        }
        await novedadesModel.modificarNovedadById(obj,req.body.id);
        res.redirect('/admin/novedades');
    } 
    catch(error){
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true, message: 'No se modificó la novedad'
        });
    }
});


module.exports = router;