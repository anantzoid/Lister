'use strict';

/**
 * @ngdoc function
 * @name listerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the listerApp
 */
angular.module('listerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
