var express = require('express');
var router = express.Router();
var nodemailer= require('nodemailer');
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;

router.post('/', async(req, res, next) => {
  var nombre=req.body.nombre;
  var email=req.body.email;
  var asunto=req.body.asunto;
  var mensaje=req.body.mensaje;

  var obj = {
    to: 'any15015@gmail.com',
    subject: 'Contacto Web por fotografia',
    html: nombre + ' se contactó a través de la web y requiere más información a este correo: ' + email + ". <br> Además dejó un mensaje con el asunto: " + asunto + ". <br> El msj es: " + mensaje
  }

  var transport =nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }

  });

  var info= await transport.sendMail(obj);

  res.redirect('/?message=ok#contacto');
  });


/* GET home page: */
router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getNovedades()
  novedades= novedades.splice(-3); //selecciona los últimos 3 elementos del array
  //novedades= novedades.splice(0,3); //selecciona los primeros 3 elementos del array
  novedades= novedades.map(novedad=>{
    if(novedad.img_principal_id){
        const imagen= cloudinary.url(novedad.img_principal_id, {
            crop: 'fill',
        });

      let imagen1, imagen2, imagen3;

      if (novedad.img_1_id) {
        imagen1 = cloudinary.url(novedad.img_1_id, {
          crop: 'fill'
        });
      }

      if (novedad.img_2_id) {
        imagen2 = cloudinary.url(novedad.img_2_id, {
          crop: 'fill'
        });
      }

      if (novedad.img_3_id) {
        imagen3 = cloudinary.url(novedad.img_3_id, {
          crop: 'fill'
        });
      }

      return {
        ...novedad,
        imagen,
        imagen1: imagen1 || null,
        imagen2: imagen2 || null,
        imagen3: imagen3 || null
      };
    } else {
            return{
                ...novedad,
                imagen:'/images/backContacto.jpeg'
            }
        }
    });


  res.render('index', { 
    novedades
   });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Analía Leyez fotografía', message: req.query.message === 'ok' ? 'Mensaje enviado correctamente' : '' });
});

module.exports = router;
