'use strict';
myApp.controller('signupController', function ($scope, $location, $timeout, authService) {

    $scope.savedSuccessfully = false;
    $scope.message = "";
    $scope.passwordRegExp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).*$";
    $scope.passwordMatch = true;
    $scope.registration = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",

    };

    let notificationDuration = 5;

    let _passwordMatchCheck = function () {
        if ($scope.registration.password == $scope.registration.confirmPassword)
            $scope.passwordMatch = true;
        else $scope.passwordMatch = false;
    }

    let _signUp = () => {

        authService.saveRegistration($scope.registration).then(function (response) {

            $scope.savedSuccessfully = true;
            alertify.notify('User has been registered successfully, please check your email for end registration', 'success', notificationDuration);
            _startTimer();

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             alertify.notify('Failed to register user due to:' + errors.join(' '), 'error', notificationDuration);
         });
    };

    let _startTimer = () => {
        let timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    }

    $scope.signUp = _signUp;
    $scope.passwordMatchCheck = _passwordMatchCheck;
});