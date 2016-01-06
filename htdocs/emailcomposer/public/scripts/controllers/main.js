'use strict';
/**
 * @ngdoc function
 * @name emailcomposerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the emailcomposerApp
 */
angular.module('emailcomposerApp').controller('MainCtrl', function($scope, $http, $location) {
  // Objest isRWD par défaut (affichage du mail en 640);
  $scope.isRWD = {
    'width': 640,
    'height': 'auto',
    'overflow': 'scroll'
  };
  // Param de la tool bar à afficher par défaut (header/ountent/footer)
  $scope.selectedType = 2;
  //  $scope.selected = null;
  // Liste des objets composant le contenu du template
  $scope.list = [];
  // template Angular associé au controler
  //  $scope.templateUrl = '/views/main.html';
  // objets de base
  $scope.templateID = $location.path().split("/")[2] || null;
  $scope.templateObj = null;
  // Vérification en Base de l'existance du template
  $scope.init = function() {
      $http.get('/services/template/' + $scope.templateID).then(function(res) {
        console.log("INIT ID");
        console.log(res.data);
        console.log("**********");
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
  // changement de type d'item à afficher (header, content, footer)
  $scope.showItemsMenu = function(item) {
    $scope.selectedType = item;
  };
  // Verification de l'élément à afficher pour activer le style CSS d'affichage
  $scope.isSelected = function(section) {
    return $scope.selectedType === section;
  };
  // Affichage de la poubelle
  $scope.showTrash = function() {
      TweenMax.to($('.trash'), 0.4, {
        autoAlpha: 1,
        display: 'block'
      });
    }
    // Masquer la poubelle
  $scope.hideTrash = function() {
    var tl = new TimelineMax();
    tl.add(TweenMax.fromTo($('.trash'), 0.4, {
      backgroundColor: "#E74C3C"
    }, {
      backgroundColor: "#C0392B"
    }));
    tl.add(TweenMax.to($('.trash'), 0.4, {
      autoAlpha: 0,
      display: 'none'
    }));
  };
  // Gestion de l'affichage de l'email au format rwd (l'ojbet est MAJ avec les valeurs saisies dans le template main.html)
  $scope.switchChange = function() {
      $('.drop-zone').css('overflow', $scope.isRWD.overflow);
      if ($scope.isRWD.width == 320) {
        $('.drop-zone').addClass('fluid');
        $('.email').addClass('mobile');
      } else {
        $('.email').removeClass('mobile');
      }
      TweenMax.to($('.drop-zone'), 0.4, {
        width: $scope.isRWD.width,
        height: $scope.isRWD.height,
        onComplete: function() {
          if ($scope.isRWD.width == 640) $('.drop-zone').removeClass('fluid');
        }
      });
    }
    //  Si le template est existant, Mise à jour de la liste du template => Sync avec la base Mongo
  $scope.updateCanvas = function() {
      if ($scope.templateObj) {
        $scope.synchPutToMongo();
      };
    }
    // Si le template est existant => téléchargement de l'image
    // Si le template n'existe pas => enregistrement en base
  $scope.forcedownload = function() {
      if ($scope.templateID) {
        $scope.synchPutToMongo();
      } else {
        scope.synchPostToMongo();
      }
    }
    // Ecoute du changement de la liste du template
  $scope.$watchCollection('list', function() {
    $scope.updateCanvas();
  });


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
    /*
        8888888b.        d888888888888888    d8888 .d8888b.
        888  "Y88b      d88888    888       d88888d88P  Y88b
        888    888     d88P888    888      d88P888Y88b.
        888    888    d88P 888    888     d88P 888 "Y888b.
        888    888   d88P  888    888    d88P  888    "Y88b.
        888    888  d88P   888    888   d88P   888      "888
        888  .d88P d8888888888    888  d8888888888Y88b  d88P
        8888888P" d88P     888    888 d88P     888 "Y8888P"
    */
  $scope.headers = [{
    id: 1,
    name: 'Bloc 100%',
    src: '/images/header.gif',
    dsc: 'Bloc header une seule ligne',
    srcTpl: '/images/header.gif',
    type: '/views/items/header.html',
  }];
  $scope.footers = [{
    id: 2,
    name: 'Bloc 100%',
    src: '/images/footer.gif',
    dsc: 'Bloc footer une seule ligne',
    srcTpl: '/images/footer.gif',
    type: '/views/items/footer.html',
  }];
  $scope.contents = [{
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
});
