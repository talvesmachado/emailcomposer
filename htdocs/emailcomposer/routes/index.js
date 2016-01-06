var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get(['/', '/templates/*'], function(req, res, next) {
  res.render('index', {
    layout: false,
    title: 'Express'/*,
    id: null*/
  });
  //res.sendfile('./app/index.html');
});
/*router.get('/templates/:id', function(req, res, next) {

  res.render('index', {
    layout: false,
    title: 'Express',
    id: req.params.id
  });

});*/

module.exports = router;
