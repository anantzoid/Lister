'use strict';

/**
 * @ngdoc overview
 * @name listerApp
 * @description
 * # listerApp
 *
 * Main module of the application.
 */
angular
.module('listerApp', [
        'ngRoute',
        'firebase'
        ])
.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
})
.value('fbURL', 'https://burning-fire-3132.firebaseio.com/')
.factory('Links', function(fbURL, $firebaseArray) {
    var ref = new Firebase(fbURL);
    return $firebaseArray(ref);
});
