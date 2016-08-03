'use strict';
myApp.controller('loginController',function ($scope, $location, authService, jwtHelper) {

    if ($location.$$url.indexOf('confirmEmail') != -1) {
        alertify.notify('Now you can login', 'success', 5);
    }

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.login = function () {
        authService.login($scope.loginData).then(function (response) {
            alertify.notify('Successfully loged', 'success', 2);
            $location.path('/home');

        },
         function (err) {
             console.log(err.error_description);
             alertify.notify(err.error_description, 'failed', 5);
         });

        $scope.loginData = {
            userName: "",
            password: ""
        };
    };

});