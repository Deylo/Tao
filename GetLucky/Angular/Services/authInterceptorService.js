'use strict';
myApp.factory('authInterceptorService', function ($q, $location, localStorageService) {

    let authInterceptorServiceFactory = {};

    let _request = function (config) {

        config.headers = config.headers || {};

        let authData = localStorageService.get('authorizationData');

        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    let _responseError = function (rejection) {
        //if (rejection.status === 401) {
        //    $location.path('/login');
        //}
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
});