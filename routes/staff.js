var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('staff'); //busca staff.hbs
})

module.exports = router;