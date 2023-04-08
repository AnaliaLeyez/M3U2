var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('bodas'); //busca bodas.hbs
})

module.exports = router;