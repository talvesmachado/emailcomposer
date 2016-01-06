var express = require('express');
var router = express.Router();
var phantom = require('phantom');
var Pageres = require('pageres');

var mongoose = require('mongoose');
var template = require('../models/template.js');

/*
8888888b.  8888888888 .d8888b. 88888888888           Y88b         888                                   888          888
888   Y88b 888       d88P  Y88b    888                Y88b        888                                   888          888
888    888 888       Y88b.         888                 Y88b       888                                   888          888
888   d88P 8888888    "Y888b.      888          888888  Y88b      888888 .d88b.  88888b.d88b.  88888b.  888  8888b.  888888 .d88b.  .d8888b
8888888P"  888           "Y88b.    888                  d88P      888   d8P  Y8b 888 "888 "88b 888 "88b 888     "88b 888   d8P  Y8b 88K
888 T88b   888             "888    888          888888 d88P       888   88888888 888  888  888 888  888 888 .d888888 888   88888888 "Y8888b.
888  T88b  888       Y88b  d88P    888                d88P        Y88b. Y8b.     888  888  888 888 d88P 888 888  888 Y88b. Y8b.          X88
888   T88b 8888888888 "Y8888P"     888               d88P          "Y888 "Y8888  888  888  888 88888P"  888 "Y888888  "Y888 "Y8888   88888P'
                                                                                               888
                                                                                               888
                                                                                               888
*/
router.get('/template', function(req, res, next) {
  template.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
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
router.post('/template', function(req, res, next) {
  template.create(req.body, function(err, post) {
    if (err) return next(err);
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
/*
8888888 888b     d888        d8888  .d8888b.  8888888888       .d8888b.  8888888888 888b    888 8888888888 8888888b.         d8888 88888888888 .d88888b.  8888888b.
  888   8888b   d8888       d88888 d88P  Y88b 888             d88P  Y88b 888        8888b   888 888        888   Y88b       d88888     888    d88P" "Y88b 888   Y88b
  888   88888b.d88888      d88P888 888    888 888             888    888 888        88888b  888 888        888    888      d88P888     888    888     888 888    888
  888   888Y88888P888     d88P 888 888        8888888         888        8888888    888Y88b 888 8888888    888   d88P     d88P 888     888    888     888 888   d88P
  888   888 Y888P 888    d88P  888 888  88888 888             888  88888 888        888 Y88b888 888        8888888P"     d88P  888     888    888     888 8888888P"
  888   888  Y8P  888   d88P   888 888    888 888             888    888 888        888  Y88888 888        888 T88b     d88P   888     888    888     888 888 T88b
  888   888   "   888  d8888888888 Y88b  d88P 888             Y88b  d88P 888        888   Y8888 888        888  T88b   d8888888888     888    Y88b. .d88P 888  T88b
8888888 888       888 d88P     888  "Y8888P88 8888888888       "Y8888P88 8888888888 888    Y888 8888888888 888   T88b d88P     888     888     "Y88888P"  888   T88b
*/
router.get('/snapshot/:id', function(req, res, next) {
var myURL = "localhost:4500/snapshot/"+req.params.id;
console.log('CALLED = ' + req.params.id)

  var pageres = new Pageres({delay: 2})
      .src(myURL, ['640x580', 'iphone 4s'], {crop: false})
      .dest(__dirname+'./../public/images/screens/'+req.params.id)
      .run()
      .then(function(result){
        console.log('done');
        console.log(result);
        res.json(result)
      });
});

/*
8888888888 888b     d888        d8888 8888888 888           8888888888 8888888b.         d8888 888b     d888 8888888888 888       888  .d88888b.  8888888b.  888    d8P       888888b.   888      .d88888b.   .d8888b.   .d8888b.
888        8888b   d8888       d88888   888   888           888        888   Y88b       d88888 8888b   d8888 888        888   o   888 d88P" "Y88b 888   Y88b 888   d8P        888  "88b  888     d88P" "Y88b d88P  Y88b d88P  Y88b
888        88888b.d88888      d88P888   888   888           888        888    888      d88P888 88888b.d88888 888        888  d8b  888 888     888 888    888 888  d8P         888  .88P  888     888     888 888    888 Y88b.
8888888    888Y88888P888     d88P 888   888   888           8888888    888   d88P     d88P 888 888Y88888P888 8888888    888 d888b 888 888     888 888   d88P 888d88K          8888888K.  888     888     888 888         "Y888b.
888        888 Y888P 888    d88P  888   888   888           888        8888888P"     d88P  888 888 Y888P 888 888        888d88888b888 888     888 8888888P"  8888888b         888  "Y88b 888     888     888 888            "Y88b.
888        888  Y8P  888   d88P   888   888   888           888        888 T88b     d88P   888 888  Y8P  888 888        88888P Y88888 888     888 888 T88b   888  Y88b        888    888 888     888     888 888    888       "888
888        888   "   888  d8888888888   888   888           888        888  T88b   d8888888888 888   "   888 888        8888P   Y8888 Y88b. .d88P 888  T88b  888   Y88b       888   d88P 888     Y88b. .d88P Y88b  d88P Y88b  d88P
8888888888 888       888 d88P     888 8888888 88888888      888        888   T88b d88P     888 888       888 8888888888 888P     Y888  "Y88888P"  888   T88b 888    Y88b      8888888P"  88888888 "Y88888P"   "Y8888P"   "Y8888P"
*/
router.get('/header-blocs', function(req, res, next) {
  res.json(headers);
});
router.get('/footer-blocs', function(req, res, next) {
  res.json(footers);
});
router.get('/contents-blocs', function(req, res, next) {
  res.json(contents);
});

var headers = [{
  id: 1,
  name: 'Bloc 100%',
  src: '/images/header.gif',
  dsc: 'Bloc header une seule ligne',
  srcTpl: '/images/header.gif',
  type: '/views/items/header.html',
}];
var footers = [{
  id: 2,
  name: 'Bloc 100%',
  src: '/images/footer.gif',
  dsc: 'Bloc footer une seule ligne',
  srcTpl: '/images/footer.gif',
  type: '/views/items/footer.html',
}];
var contents = [{
  id: 3,
  name: 'Bloc 100%',
  src: '/images/100.gif',
  dsc: 'Bloc de contenu une seule ligne',
  srcTpl: '/images/100.gif',
  type: '/views/items/100.html',
}, {
  id: 4,
  name: 'Bloc 100% bordures',
  src: '/images/100-brd.gif',
  dsc: 'Bloc de contenu une seule ligne avec bordure',
  srcTpl: '/images/100-brd.gif',
  type: '/views/items/100-brd.html',
}, {
  id: 5,
  name: 'Bloc 50% 50%',
  src: '/images/50-50.gif',
  dsc: 'Bloc de contenu en deux colonnes',
  srcTpl: '/images/50-50.gif',
  type: '/views/items/50-50.html',
}, {
  id: 6,
  name: 'Bloc 50% 50%  bordures',
  src: '/images/50-50-brd.gif',
  dsc: 'Bloc de contenu en deux colonnes avec bordures',
  srcTpl: '/images/50-50-brd.gif',
  type: '/views/items/50-50-brd.html',
}, {
  id: 7,
  name: 'Bloc 70% 30%',
  src: '/images/70-30.gif',
  dsc: 'Bloc de contenu en deux colonnes de tailles différentes',
  srcTpl: '/images/70-30.gif',
  type: '/views/items/70-30.html',
}, {
  id: 8,
  name: 'Bloc 70% 30% bordures',
  src: '/images/70-30-brd.gif',
  dsc: 'Bloc de contenu en deux colonnes de tailles différentes avec bordures',
  srcTpl: '/images/70-30-brd.gif',
  type: '/views/items/70-30-brd.html',
}, {
  id: 9,
  name: 'Bloc 30% 70%',
  src: '/images/30-70.gif',
  dsc: 'Bloc de contenu en deux colonnes de tailles différentes',
  srcTpl: '/images/30-70.gif',
  type: '/views/items/30-70.html',
}, {
  id: 10,
  name: 'Bloc 30% 70% bordures',
  src: '/images/30-70-brd.gif',
  dsc: 'Bloc de contenu en deux colonnes de tailles différentes avec bordures',
  srcTpl: '/images/30-70-brd.gif',
  type: '/views/items/30-70-brd.html',
}, {
  id: 11,
  name: 'Bloc 30% 30% 30%',
  src: '/images/30-30-30.gif',
  dsc: 'Bloc de contenu en Trois colonnes',
  srcTpl: '/images/30-30-30.gif',
  type: '/views/items/30-30-30.html',
}, ];

//#######################
module.exports = router;
