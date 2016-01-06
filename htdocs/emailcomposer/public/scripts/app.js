'use strict';

/**
 * @ngdoc overview
 * @name emailcomposerApp
 * @description
 * # emailcomposerApp
 *
 * Main module of the application.
 */
angular
  .module('emailcomposerApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'dndLists',
    'ngMaterial',
  ])
  .config([
    '$compileProvider', '$routeProvider', '$locationProvider',
    function($compileProvider, $routeProvider, $locationProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
      // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
      $routeProvider
        .when('/snapshot/:id', {
          templateUrl: '/views/snapshot.html',
          controller: 'SnapshotCtrl'
        })
        .when('/', {
          templateUrl: '/views/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({
          templateUrl: '/views/main.html',
          controller: 'MainCtrl'
        });

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
    }
  ])
