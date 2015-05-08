'use strict';

/**
 * @ngdoc overview
 * @name TimesheetApp
 * @requires ngRoute
 * @requires ngMaterial
 * @requires ngStorage
 * @todo Implement a NoSQL storage such as MongoDB
 * @todo Implement backend with NodeJS
 * @description
 * Main application module.
 */

angular.module('TimesheetApp', [
  'ngRoute',
  'ngMaterial',
  'ngStorage',
  'partials'])
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'home.html',
            controller: 'TimesheetController'
          })
          .when('/success', {
            templateUrl: 'success.html',
            controller: 'SuccessController'
          })
          .otherwise({
            redirectTo: '/'
          });
      }]);
