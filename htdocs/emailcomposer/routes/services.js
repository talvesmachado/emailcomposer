var express = require('express');
var router = express.Router();
var phantom = require('phantom');
var Pageres = require('pageres');

var mongoose = require('mongoose');
var template = require('../models/template.js');

/* GET home page. */

router.get('/template', function(req, res, next) {
  template.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

router.post('/template', function(req, res, next) {
  template.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/template/:id', function(req, res, next) {
  template.findById(req.params.id, function(err, post) {
    console.log(err);
    if (err) {
      if (err.name == "CastError") res.sendStatus(404);
      else return next(err)
    };
    res.json(post);
  });
});

router.put('/template/:id', function(req, res, next) {
  template.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/template/:id', function(req, res, next) {
  template.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
