var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var basicAuth = require('basic-auth');

/* GET home page. */
router.get(['/', '/templates/*'], function(req, res, next) {
  // AUTH
  var user = basicAuth(req);
  if (!user || user.name !== 'user' || user.pass !== 'pass') {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };
  //###################
  res.render('index', {
    layout: false,
    title: 'Express'
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
