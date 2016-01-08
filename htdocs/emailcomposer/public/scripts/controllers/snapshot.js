'use strict';
/**
 * @ngdoc function
 * @name emailcomposerApp.controller:SnapshotCtrl
 * @description
 * # SnapshotCtrl
 * Controller of the emailcomposerApp
 */
angular.module('emailcomposerApp').controller('SnapshotCtrl', function($scope, $http, $location) {
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
          location.replace('/');
        };
      }, function(err) {
        console.log(err)
      });
    }
    // Si un ID est déclaré dans l'URL, la méthode INIT est lancée
  if ($scope.templateID) $scope.init();
  else console.log('NO ID');
});
