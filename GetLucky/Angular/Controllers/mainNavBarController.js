myApp.controller('mainNavBarController', function ($scope, authService) {

    $scope.logOut = function () {
        authService.logOut();
    }

    authService.fillAuthData();
    $scope.authentication = authService.authentication;
    console.log($scope.authentication);
});