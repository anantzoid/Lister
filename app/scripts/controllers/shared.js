'use strict';

angular.module('listerApp')
    .controller('SharedListCtrl', function($rootScope, $routeParams, $location) {
        $rootScope.uid = $routeParams.id;
        $location.path('/');
    });
