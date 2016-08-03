myApp.controller('mainNavBarController', function ($scope, authService) {

    authService.fillAuthData();
    $scope.authentication = authService.authentication

    let _logOut =  () => {
        authService.logOut();
    }
    
    $scope.logOut = _logOut;
});