var express = require('express');
var router = express.Router();
var nodemailer= require('nodemailer');
var novedadesModel = require('../models/novedadesModel');

/* GET HOME page. */
router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getNovedades()
  res.render('index', { 
    novedades
   });
});

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


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Analía Leyez fotografía', message: req.query.message === 'ok' ? 'Mensaje enviado correctamente' : '' });
});

module.exports = router;
