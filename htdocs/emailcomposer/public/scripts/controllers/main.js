'use strict';

/**
 * @ngdoc function
 * @name portageApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portageApp
 */
angular.module('emailcomposerApp').controller('MainCtrl', function($scope, $http, $location ) {


  $scope.init = function(initID) {
    console.log('checktemplate');
    console.log(initOBJ);
    $scope.templateID = initID;
    console.log($scope.templateID);

    var returnedObj = null;

    $http.post('/services/getcontent', {
      id: $scope.templateID
    }).then(function(res) {
      // it return obj
      console.log(res);
      returnedObj = res;
    }, function(err) {
      // No obj
      console.log(err);
    });

  }
$scope.init();
  // changement de type d'item à afficher (header, content, footer)
  $scope.showItemsMenu = function(item) {
    $scope.selectedType = item;
  };

  // Verification de l'élément à afficher pour activer le style CSS d'affichage
  $scope.isSelected = function(section) {
    return $scope.selectedType === section;
  };

  $scope.logs = function(param) {
    console.log(param);
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

  $scope.logEvent = function(message, event) {
    console.log(message, '(triggered by the following', event.type, 'event)');
    console.log(event);
  };
  $scope.logListEvent = function(action, event, index, external, type) {
    var message = external ? 'External ' : '';
    message += type + ' element is ' + action + ' position ' + index;
    $scope.logEvent(message, event);
  };

  // Gestion de l'affichage de l'email au format rwd
  $scope.switchChange = function() {
    console.log($scope.isRWD);
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
  $scope.updateCanvas = function() {
      console.log('canvas');
    }
    // Télechargement de l'image
  $scope.forcedownload = function() {
    console.log($location.path());
    console.log($scope.list);
    var pId = $location.path().split("/")[2]||"Unknown";
    console.log(pId);
    var returnedObj = null;
    $http.post('/services/getcontent', {
      id: pId
    }).then(function(res) {
      // it return obj
      console.log(res);
      returnedObj = res;
    }, function(err) {
      // No obj
      console.log(err);
    });


/*    var contentHtml = $('#backgroundTable').prop('outerHTML');
    $http.post('http://www.emailcomposer.dev/capture', {
      width: $scope.isRWD.width,
      list: $scope.list
    }).then(function(res) {
      console.log(res);

    }, function(res) {
      console.log(res);
    });
*/
  }

  $scope.$watchCollection('list', function() {
    $scope.updateCanvas();
  });

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
  $scope.mycv = null;
  $scope.isRWD = {
    'width': 640,
    'height': 'auto',
    'overflow': 'scroll'
  };
  $scope.selectedType = 1;
  $scope.selected = null;

  $scope.list = [];
  $scope.templateUrl = '/views/main.html';

  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
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
