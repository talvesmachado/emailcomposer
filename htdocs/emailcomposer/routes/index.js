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
router.get('/snapshot/*', function(req, res, next) {

  res.render('index-snapshot', {
    layout: false,
    title: 'SnapShot'
  });

});

module.exports = router;
