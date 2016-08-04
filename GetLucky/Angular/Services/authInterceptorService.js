'use strict';
myApp.factory('authInterceptorService', function ($q, $location, localStorageService) {

    let authInterceptorServiceFactory = {};

    let _request = (config) => {

        config.headers = config.headers || {};

        let authData = localStorageService.get('authorizationData');

        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    let _responseError = (rejection) => {
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
});