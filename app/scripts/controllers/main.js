'use strict';

/**
 * @ngdoc function
 * @name listerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the listerApp
 */
angular.module('listerApp')
  .controller('MainCtrl', function ($location,
              $scope, 
              Links, 
              User, 
              fbAuth, 
              $route,
              $timeout,
              $rootScope) {


       $scope.addNewSection = false; 
       $scope.edit = true;
       $scope.showEditSection = false;
       $scope.showSaveMessage = false;
       $scope.location = $location;

       $scope.uid = typeof($rootScope.uid) !== "undefined" ?  $rootScope.uid : User.uid;
       //TODO switch to manuallly generated uid if $rootScope.uid does not contain any data
       $scope.Links = Links.getLinks($scope.uid);
       $scope.User = User;

       if(localStorage.getItem('listerData')) {
            var temp = JSON.parse(localStorage.getItem('listerData'));
            //TODO save all at once
            for(var t in temp) {
                $scope.Links.$add({
                    title: temp[t].title,
                    link: temp[t].link
                }
                );
            }
           
           if(User.authType !== 'anon') { 
                localStorage.removeItem('listerData');

                // show "Data being saved" message for a time interval
                $scope.showSaveMessage= true;
                $timeout(function() {
                    $scope.showSaveMessage= false;
                },2000);

           }

       }

       //TODO put in commonplace
       $scope.newRecord = {
           title: '',
           link: ''
       };


        $scope.addLink = function() {
            $scope.addNewSection = !$scope.addNewSection;
            $scope.newLinkForm.$setPristine();
        };

        $scope.saveLink = function() {
            var save = $scope.Links.$add({
                title: $scope.newRecord.title,
                link: $scope.newRecord.link
            }).then(function() {
                if(User.authType == 'anon') {
                    localStorage.setItem('listerData', JSON.stringify($scope.Links));
                }
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
                    if(User.authType == 'anon') {
                        localStorage.setItem('listerData', JSON.stringify($scope.Links));
                    }
                });
        };

        $scope.editLink = function(link) {
            $scope.Links.$save(link);
            if(User.authType == 'anon') {
                localStorage.setItem('listerData', JSON.stringify($scope.Links));
            }
        };

        $scope.fbLogin = function(service) {
           fbAuth.login(service).then(function(data) {
                User.authType = service;
                User.uid = data.uid;  
                User.uname = data[service];
                delete $rootScope.uid;
                $route.reload();
           }, function(error) {
               console.log(error);
                $route.reload();
           });
        };

        $scope.shareList = function() {
            if(User.authType == 'anon') {
            } else {
                $scope.uid = generatePushID(); 
                var shareLinks = Links.getLinks($scope.uid);
                             
                for(var t in $scope.Links) {
                    var data = $scope.Links[t];
                    if(data.hasOwnProperty('title')) {
                        shareLinks.$add({
                            title: data.title,
                            link: data.link
                        });
                    }
                }
            }
        };
  });
