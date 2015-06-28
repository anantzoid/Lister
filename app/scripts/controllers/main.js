'use strict';

/**
 * @ngdoc function
 * @name listerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the listerApp
 */
angular.module('listerApp')
  .controller('MainCtrl', function ($location, $scope, Links, User, $route) {
        
       $scope.addNewSection = false; 
       $scope.edit = true;
       $scope.showEditSection = false;
       $scope.Links = Links;

       if(!$scope.Links.length && localStorage.getItem('listerData')) {
            $scope.Links = JSON.parse(localStorage.getItem('listerData'));
       }
       //TODO put in commonplace
       $scope.newRecord = {
           title: '',
           link: ''
       };


        $scope.addLink = function() {
            $scope.addNewSection = true;
        };

        $scope.saveLink = function() {
            var save = $scope.Links.$add({
                title: $scope.newRecord.title,
                link: $scope.newRecord.link
            }).then(function() {
                if(User.authType == 'anon') {
                    localStorage.setItem('listerData', JSON.stringify($scope.Links));
                }

                $scope.newRecord = {
                    title: '',
                    link: ''
                };
                $scope.addNewSection = false; 
    
            });        
        };

        $scope.removeLink = function(link) {
            $scope.Links.$remove(link);
        };

        $scope.editLink = function(link) {
            $scope['showEditSection'+link.$id] = true;
        };
  });
