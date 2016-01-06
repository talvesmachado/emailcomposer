'use strict';
/**
 * @ngdoc function
 * @name emailcomposerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the emailcomposerApp
 */
angular.module('emailcomposerApp').controller('SnapshotCtrl', function($scope, $http, $location) {

  console.log("aqdsfqsdf");
  $scope.templateID = $location.path().split("/")[2] || null;
  $scope.templateObj = null;
  // Liste des objets composant le contenu du template
  $scope.list = [];
  // Vérification en Base de l'existance du template
  $scope.init = function() {
      $http.get('/services/template/' + $scope.templateID).then(function(res) {
        // Si l'objet éxiste, il est initialisé dans l'application angular
        // Si l'objet n'existe pas l'utilisateur est redirigé sur la racine (template pas encore exporté)
        if (res.data) {
          $scope.templateObj = res.data;
          $scope.list = res.data.list;
        } else {
          $location.path('/');
        };
      }, function(err) {
        console.log(err)
      });
    }
    // Si un ID est déclaré dans l'URL, la méthode INIT est lancée
  if ($scope.templateID) $scope.init();
  else console.log('NO ID');
  /*
  .d8888b.        d8888 888      888           88888888888 .d88888b.       8888888b.  8888888888 .d8888b. 88888888888             d8888 8888888b.  8888888b.
 d88P  Y88b      d88888 888      888               888    d88P" "Y88b      888   Y88b 888       d88P  Y88b    888                d88888 888   Y88b 888   Y88b
 888    888     d88P888 888      888               888    888     888      888    888 888       Y88b.         888               d88P888 888    888 888    888
 888           d88P 888 888      888               888    888     888      888   d88P 8888888    "Y888b.      888              d88P 888 888   d88P 888   d88P
 888          d88P  888 888      888               888    888     888      8888888P"  888           "Y88b.    888             d88P  888 8888888P"  8888888P"
 888    888  d88P   888 888      888               888    888     888      888 T88b   888             "888    888            d88P   888 888        888
 Y88b  d88P d8888888888 888      888               888    Y88b. .d88P      888  T88b  888       Y88b  d88P    888           d8888888888 888        888
  "Y8888P" d88P     888 88888888 88888888          888     "Y88888P"       888   T88b 8888888888 "Y8888P"     888          d88P     888 888        888
      Y88b         888b     d888  .d88888b.  888b    888  .d8888b.   .d88888b.  8888888b.  888888b.
       Y88b        8888b   d8888 d88P" "Y88b 8888b   888 d88P  Y88b d88P" "Y88b 888  "Y88b 888  "88b
        Y88b       88888b.d88888 888     888 88888b  888 888    888 888     888 888    888 888  .88P
 888888  Y88b      888Y88888P888 888     888 888Y88b 888 888        888     888 888    888 8888888K.
         d88P      888 Y888P 888 888     888 888 Y88b888 888  88888 888     888 888    888 888  "Y88b
 888888 d88P       888  Y8P  888 888     888 888  Y88888 888    888 888     888 888    888 888    888
       d88P        888   "   888 Y88b. .d88P 888   Y8888 Y88b  d88P Y88b. .d88P 888  .d88P 888   d88P
      d88P         888       888  "Y88888P"  888    Y888  "Y8888P88  "Y88888P"  8888888P"  8888888P"
*/
  // MAJ du modèle dans MongoDB
  $scope.synchPutToMongo = function() {
      $http.put('/services/template/' + $scope.templateID, {
          list: $scope.list
        })
        .then(function(res) {
          // it return obj
          console.log("###### PUT ######");
          console.log(res);
        }, function(err) {
          // No obj
          console.log(err);
        });
    }
    // Création du modèle dans MongoDB
  $scope.synchPostToMongo = function() {
      $http.post('/services/template/', {
          list: $scope.list
        })
        .then(function(res) {
          // it return obj
          console.log("###### POST ######");
          console.log(res);
          //window.location ='/templates/'+ res.data._id;
          $location.path('/templates/' + res.data._id)
        }, function(err) {
          // No obj
          console.log(err);
        });
    }
});
