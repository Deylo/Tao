myApp.controller('adminPanelController', function ($scope, $http, authService) {
    $scope.userData = [];
    authService.fillAuthData();
    $scope.authentication = authService.authentication;

    let notificationDuration = authService.notificationDuration;

    let _saveChanges = (userData) => {
        $http.put('api/accounts/user/' + userData.userName + '/roles', [userData.userRole])
            .success((data) => {
                alertify.notify('Changes successfully saved', 'success', notificationDuration);
            })
            .error((data) => {
                alertify.notify(data.message, 'error', notificationDuration);
            });
    }

    let _deleteUser = (userName) => {
        $http.delete('api/accounts/user/' + userName)
            .success((data) => {
                alertify.notify('User successfully deleted', 'success', notificationDuration);
                _getUserList();
            })
            .error((data) => {
                alertify.notify(data.message, 'error', notificationDuration);
            });
    }

    let _getUserList = () => {
        $http.get('api/accounts/users')
               .success((data) => {
                   $scope.userData = [];
                   data.forEach((item) => {
                       $scope.userData.push(
                           {
                               userName: item.userName,
                               userRole: item.roles[0]
                           }
                       );
                   });
               }).error((data) => {
                   alertify.notify(data.message, 'error', notificationDuration);
               });
    }
    _getUserList();

    $scope.roles = ['User', 'PremiumUser', 'Admin'];

    $scope.roleEnum = authService.roleEnum;
    $scope.saveChanges = _saveChanges;
    $scope.deleteUser = _deleteUser;
});