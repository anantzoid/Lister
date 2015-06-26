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

       //TODO put in commonplace
       $scope.newRecord = {
           title: '',
           link: ''
       };
       $scope.Links = Links;

       $scope.links = [
            {
                title: 'Link1',
                link: 'http://lnks.com'     
            },
            {
                title: 'Link2',
                link: 'http://lnks.com'     
            }
        ]; 

        $scope.addLink = function() {
            $scope.addNewSection = true;
        };

        $scope.saveLink = function() {

           $http.get($scope.newRecord.link)
           .then(function(data) { 

               //TODO stautus validation
                
            console.log(data); 
               var matches = data.data.match(/<title>(.*?)<\/title>/);
               console.log(matches);
                $scope.newRecord.title = matches[0];

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

           });
        };
  });
