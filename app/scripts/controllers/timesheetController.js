'use strict';

/**
 * @ngdoc controller
 * @name TimesheetController
 * @requires $scope
 * @requires $location
 * @requires $timeout
 * @requires $interval
 * @requires $localStorage
 * @description
 * Manage the user timesheet
 */

angular.module('TimesheetApp')
  .controller('TimesheetController', [
    '$scope',
    '$location',
    '$timeout',
    '$interval',
    '$localStorage',
    function($scope, $location, $timeout, $interval, $localStorage) {
      // Don't show the loader when load initialize the app
      // @note more safe than use ng-init
      $scope.showLoader = false;

      // Load the persisted user or initialize a new one
      // @note It's better than use a service that will lost data after any reload
      if ($localStorage.hasOwnProperty('user')) {
        $scope.user = $localStorage.user;
      } else {
        $scope.user = {};
      }

      /**
       * Flash an error message
       * @param {string} msg message
       */
      $scope.showError = function(msg) {
        $scope.error = msg;

        $timeout(function() {
          $scope.error = null;
        }, 3000);

        return;
      };

      /**
       * Validate one field
       * @param {string} field
       * @param {string} msg message
       */
      $scope.validateField = function(field, msg) {
        if (!$scope.user.hasOwnProperty(field) || typeof($scope.user[field]) === 'undefined') {
          $scope.showError(msg);
          return false;
        } else {
          return true;
        }
      };

      /**
       * Validate a collection of fields
       * @param {array} fields
       */
      $scope.validateFields = function(fields) {
        var validation = true;

        fields.forEach(function(element) {
          if (!$scope.validateField(element.field, element.msg)) {
            validation = false;
          }
        });

        return validation;
      };

      /**
       * Clear the form fields and the localStorage
       */
      $scope.clearFields = function() {
        $localStorage.$reset();
        $scope.user = null;
      };

      /**
       * Validate form and persist data into the localStorage
       * @requires moment
       */
      $scope.submit = function() {
        /**
         * Validate the form and the user object
         * @note null and undefined means that the object was not initialized
         *   but Object.keys validation is trying to catch users that was initialized
         *   but are empty
         */
        if (typeof($scope.user) === 'undefined' || $scope.user === null) {
          $scope.showError('All fields are required');
          return;
        } else if (Object.keys($scope.user).length < 1) {
          $scope.showError('All fields are required');
          return;
        }

        var isValid = $scope.validateFields([{
            field: 'email', msg: 'Is your email valid?'
          }, {
            field: 'submissionTime', msg: 'How much time do you worked?'
          }, {
            field: 'typeOfWork', msg: 'What type of work you did?'
          }
        ]);

        if (!isValid) {
          return;
        }

        // Parse time
        $scope.user.submissionTimeParsed = moment($scope.user.submissionTime, 'HH:mm').toDate();

        // Better than Service, the data will be there even after reload ;)
        $localStorage.user = $scope.user;

        // Show loader when init
        $scope.showLoader = true;

        // Faking navigation, simulate the delay phase
        $scope.mode = 'query';
        $scope.determinateValue = 5;
        $scope.determinateValue2 = 30;

        $interval(function() {
          $scope.determinateValue += 10;
          $scope.determinateValue2 += 8;

          if ($scope.determinateValue > 100) {
            $scope.determinateValue = 5;
            $scope.determinateValue2 = 30;
          }
        }, 100, 30, true);

        $interval(function() {
          $scope.mode = ($scope.mode === 'query' ? 'determinate' : 'query');
        }, 7200, 30, true);

        // Real navigation
        $timeout(function() {
          // Navigate to the next step
          $location.path('success');
        }, 1000);
      };
    }]);
