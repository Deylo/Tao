let path = '../views/templates/';

myApp.directive('mainNavBar', function () {
    return {
        restrict: 'E',
        templateUrl: path + 'mainNavBar.html',
        replace: true,
        transclude: true,
    }
})

myApp.directive('blogNavBar', function () {
    return {
        restrict: 'E',
        templateUrl: path + 'blogNavBar.html',
        replace: true,
        transclude: true,
    }
})

myApp.directive('createPostForm', function () {
    return {
        restrict: 'E',
        templateUrl: path + 'createPostForm.html',
        replace: true,
        transclude: true,
    }
})