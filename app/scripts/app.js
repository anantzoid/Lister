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
/*
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
*/
//Include your firebase app URL here
.value('fbURL', 'https://burning-fire-3132.firebaseio.com/')
.factory('fbRef', function(User, fbURL) {
    var ref = new Firebase(fbURL+User.uid);
    return ref;
})
/*
.factory('fbAuth', function(authType, fbRef, $q) {
    var defer = $q.defer(); 
    var auth =  {
        login: function(authType) {
            switch(authType) {
                case 'anon':
                    fbRef.authAnonymously().then(function(auth) {
                        defer.resolve(auth);
                    });
                    return defer.promise;
            }
        }
    };
    return auth;

/*    
    var auth = {};
    auth.login = function() {
        fbRef.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                return false;
            } else {
                return authData;
            }
        });
    }
    return auth;
    
})
*/
.factory('Links', function(fbRef, $firebaseArray, $q) {
 return $firebaseArray(fbRef);
/* 
           fbAuth.login().then(function(auth) {
            var links = $firebaseArray(fbRef);
            defer.resolve(links);
           });
    return defer.promise;
*/
})
.factory('User', function() {
    var user = {};
    user.authType = 'anon';
    user.uid = generatePushID();

    return user;
});

