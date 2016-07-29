'use strict'
let myApp = angular.module('myApp', ['ui.router', 'wu.masonry', 'infinite-scroll', 'ngFileUpload']);

myApp.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })
        .state('blog', {
            url: '/blog',
            templateUrl: 'views/blog.html'
        }).
        state('otherwise', {
            url: '/home',
            templateUrl: 'views/home.html'
        });
});