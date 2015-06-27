'use strict';

/**
 * @ngdoc function
 * @name listerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the listerApp
 */
angular.module('listerApp')
  .controller('MainCtrl', function ($scope, $http, Links) {
       
       $scope.addNewSection = false; 
       $scope.edit = true;
       $scope.showEditSection = false;
       $scope.Links = Links;

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
            });        

            $scope.newRecord = {
                title: '',
                link: ''
            };

            if(save) {
                console.log('success');
                $scope.addNewSection = false; 
            } else {
                console.log('error');
            }

        };

        $scope.removeLink = function(link) {
            $scope.Links.$remove(link);
        };

        $scope.editLink = function(link) {
            $scope['showEditSection'+link.$id] = true;
        };

  });
