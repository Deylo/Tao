'use strict';
myApp.controller('loginController',function ($scope, $location, authService, jwtHelper) {

    $scope.passwordRegExp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).*$";
    let notificationDuration = 5;
    if ($location.$$url.indexOf('confirmEmail') != -1) {
        alertify.notify('Now you can login', 'success', notificationDuration);
    }

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.login = function () {
        authService.login($scope.loginData).then(function (response) {
            alertify.notify('Successfully loged', 'success', notificationDuration);
            $location.path('/home');

        },
         function (err) {
             console.log(err.error_description);
             alertify.notify(err.error_description, 'error', notificationDuration);
         });

        $scope.loginData = {
            userName: "",
            password: ""
        };
    };

});