myApp.controller('mainNavBarController', function ($scope, authService) {

    authService.fillAuthData();
    $scope.authentication = authService.authentication;
    $scope.roleEnum = authService.roleEnum;

    let _logOut =  () => {
        authService.logOut();
    }
    
    $scope.logOut = _logOut;
});