'use strict';
myApp.factory('authService', function ($http, $q, localStorageService, jwtHelper) {

    var serviceBase = 'http://localhost:56620/';
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        role: []
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/accounts/create', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post(serviceBase + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            console.log(jwtHelper.decodeToken(response.access_token).role);
            var decodedData = jwtHelper.decodeToken(response.access_token);
            localStorageService.set('authorizationData', {
                token: response.access_token,
                userName: decodedData.unique_name,
                role: decodedData.role
            });

            _authentication.isAuth = true;
            _authentication.userName = decodedData.unique_name;
            _authentication.role = decodedData.role;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.role = [];

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.role = authData.role;
        }

    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
});