'use strict';
myApp.factory('authService', function ($http, $q, localStorageService, jwtHelper) {

    let serviceBase = 'http://localhost:56620/';
    let authServiceFactory = {};

    let _authentication = {
        isAuth: false,
        userName: "",
        role: {
            Admin: false,
            SuperAdmin: false,
            test: false
        }
    };

    let _saveRegistration = (registration) => {

        _logOut();

        return $http.post(serviceBase + 'api/accounts/create', registration).then((response) => {
            return response;
        });

    };

    let _login = (loginData) => {

        let data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        let deferred = $q.defer();

        $http.post(serviceBase + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success((response) => {
            let decodedData = jwtHelper.decodeToken(response.access_token);

            _authentication.isAuth = true;
            _authentication.userName = decodedData.unique_name;

            if (decodedData.role) {
                for (let i in _authentication.role) {
                    if (decodedData.role.indexOf(i) != -1) _authentication.role[i] = true;
                }
            }

            localStorageService.set('authorizationData', {
                token: response.access_token,
                userName: _authentication.userName,
                role: _authentication.role
            });

 

            deferred.resolve(response);

        }).error((err, status) => {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    let _logOut = () => {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.role = {
            Admin: false,
            SuperAdmin: false,
            test: false
        };

    };

    let _fillAuthData = () => {

        let authData = localStorageService.get('authorizationData');
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