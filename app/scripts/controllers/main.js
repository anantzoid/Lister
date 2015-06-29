'use strict';

/**
 * @ngdoc function
 * @name listerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the listerApp
 */
angular.module('listerApp')
  .controller('MainCtrl', function ($location, $scope, Links, User, fbAuth, $route) {

       $scope.addNewSection = false; 
       $scope.edit = true;
       $scope.showEditSection = false;
       $scope.Links = Links.getLinks(User.uid);
console.log($scope.Links);
       if(!$scope.Links.length && localStorage.getItem('u')) {
            var temp =JSON.parse(localStorage.getItem('u'));
            for(var t in temp) {
                $scope.Links.$add({
                    title: temp[t].title,
                    link: temp[t].link
                }
                );
            }
       }
console.log($scope.Links);
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
                localStorage.setItem('u', JSON.stringify($scope.Links));
           });        

            $scope.newRecord = {
                title: '',
                link: ''
            };
            $scope.addNewSection = false; 

        };

        $scope.removeLink = function(link) {
            $scope.Links.$remove(link)
                .then(function() {
                    localStorage.setItem('u', JSON.stringify($scope.Links));
                });
        };

        $scope.editLink = function() {
            localStorage.setItem('u', JSON.stringify($scope.Links));
        };

        $scope.fbLogin = function() {
           fbAuth.login().then(function(data) {
                console.log(data);
                User.authType = 'facebook';
                User.uid = data.uid;  
                $route.reload();
           }, function(error) {
               console.log(error);
           });
        };
  });
