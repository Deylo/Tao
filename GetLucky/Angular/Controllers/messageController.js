//myApp.controller('messageController', function ($scope, $http, authService) {
//    $scope.sendComment = () => {
//        $scope.message.Date = new Date();
//        $scope.message.BlogPageId = $scope.currentPageId;
//        $scope.message.userName = $scope.authentication.userName;

//        $http.post('api/Comments', $scope.message)
//            .success((data, status, headers, config) => {
//                $scope.currentPageData.Comments.push(data);
//                alertify.notify('Comment sended', 'success', 5, () => { console.log(headers) });
//            })
//            .error((data, status, headers, config) => {
//                alertify.notify('Sending failed', 'failed', 5, () => { console.log(headers) });
//                console.log('error');
//            });

//        console.log($scope.currentPageData);
//        $scope.message = {}
//    }

//});