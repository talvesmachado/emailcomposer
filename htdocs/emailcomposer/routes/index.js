var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    layout: false,
    title: 'Express'
  });

  //res.sendfile('./app/index.html');
});
router.get('/templates/:id', function(req, res, next) {
  res.render('index', {
    layout: false,
    title: 'Express',
    id: req.params.id
  });

/*
  // Connexion à la BDD
  MongoClient.connect('mongodb://localhost:27017/emailcomposer', function(err, db) {
    if (err) {
      throw err;
    };
    // Récup de tous les IDS
    db.collection('templates').find().toArray(function(err, result) {
      if (err) {
        throw err;
      }
      console.log("#######all#########");
      console.log(result);
    });

    // Recherche du template demandé
    var templateID = req.params.id; //récup de l'id dans l'url
    if (templateID.length == 24) { // test si le format de l'id est OK
      var mongoID = mongo.ObjectID(templateID);
      db.collection('templates').find({
        _id: mongoID
      }).toArray(function(err, result) {
        if (err) {
          throw err;
        }
        console.log("#######SPEC RESULT#########");
        console.log(result);
        res.render('index', {
          layout: false,
          title: 'Express'
        });
      });

    } else {
      res.redirect('/');
    };
    // Mongo connection
  });
*/
});

module.exports = router;
