'use strict';

/**
 * @ngdoc function
 * @name listerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the listerApp
 */
angular.module('listerApp')
  .controller('MainCtrl', function ($location, $scope, Links, fbRef, $route) {
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

        $scope.fbLogin = function() {
            fbRef.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                }
            });
        };
  });
