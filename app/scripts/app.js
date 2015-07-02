'use strict';

/**
 * @ngdoc overview
 * @name listerApp
 * @description
 * # listerApp
 *
 * Main module of the application.
 */
var app = angular
.module('listerApp', [
        'ngRoute',
        'firebase',
        ])

.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    .when('/:id', {
        template: 'Loading Lists',
        controller: 'SharedListCtrl'
    })
    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
})

//Include your firebase app URL here
.value('fbURL', config.fbURL)
.factory('fbRef', function(User, fbURL) {
    var ref = new Firebase(fbURL+User.uid);
    return ref;
})
.factory('fbAuth', function(fbRef, $q) {

    var auth = {};
    auth.login = function(service) {
        var deferred = $q.defer();
        fbRef.authWithOAuthPopup(service, function(error, authData) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(authData);
            }
        });
        return deferred.promise;
    }
    return auth;
    
})
.factory('Links', function($firebaseArray, fbURL) {
    var links = {
        getLinks: function(uid) {
            var ref = new Firebase(fbURL+uid);
            return $firebaseArray(ref);
        }
    };
    return links;
})
.factory('User', function() {
    var user = {};
    user.authType = 'anon';
    user.uid = generatePushID();

    return user;
});

