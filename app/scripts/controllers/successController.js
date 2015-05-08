'use strict';

/**
 * @ngdoc controller
 * @name SuccessController
 * @requires $scope
 * @requires $location
 * @requires $localStorage
 * @description
 * Manage post user navigation
 */

angular.module('TimesheetApp')
  .controller('SuccessController', [
    '$scope',
    '$location',
    '$localStorage',
    function($scope, $location, $localStorage) {
      // Loads user from the storage
      // @todo If there's no user, do something like flash a message and go back to home
      $scope.user = $localStorage.user;

      /**
       * Navigate to the desired page
       * @param {string} url
       */
      $scope.goTo = function(url) {
        $location.path(url);
      };

      /**
       * Clean the localStorage sevice and navigate to the home page
       */
      $scope.restart = function() {
        $localStorage.$reset();
        $location.path('/');
      };
    }]);
