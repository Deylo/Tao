myApp.controller('blogController', ($scope, $http, $timeout, Upload, authService) => {

    $scope.blogPageData = [];
    $scope.currentPageData = {};
    $scope.message = {};
    $scope.newBlog = {};
    $scope.isShowPage = false;
    $scope.isCreateForm = false;
    $scope.infinitePaginationDisabled = false
    $scope.blogNavigation = 'discover';
    $scope.authentication = {};
    $scope.logOut = function () {
        authService.logOut();
    }

    authService.fillAuthData();
    $scope.authentication = authService.authentication;
    console.log($scope.authentication);

    $scope.$watch('picFile',  () => {
        console.log($scope.picFile);
        if (!$scope.picFile) return;

        $scope.currentPageData.PicturePath = URL.createObjectURL($scope.picFile);

    });

    $scope.uploadPic = (file) => {
        file.upload = Upload.upload({
            url: 'api/BlogPages',
            data: {
                title: $scope.currentPageData.Title,
                content: $scope.currentPageData.Content,
                caption: $scope.currentPageData.PageName,
                file: file
            },
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                $scope.blogPageData.unshift($scope.currentPageData); //&&&&&&&&&&&&&&&&&&
                $scope.closePage();
                alertify.notify('Post created', 'success', 5);
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });
    }

    $scope.showCreatePostPage = () => {
         $scope.currentPageData = {};
        $scope.isShowPage = true;
        $scope.isCreateForm = true;
       
    }

    $scope.sendComment = () => {
        $scope.message.Date = new Date();
        $scope.message.BlogPageId = $scope.currentPageId;
        //$scope.message.userName = $scope.authentication.userName;

        $http.post('api/Comments', $scope.message)
            .success((data, status, headers, config) => {
                $scope.currentPageData.Comments.push(data);
                alertify.notify('Comment sended', 'success', 5, () => { console.log(headers)});
            })
            .error((data, status, headers, config) => {
                alertify.notify('Sending failed', 'failed', 5, () => { console.log(headers) });
                console.log('error');
            });

        console.log($scope.currentPageData);
        $scope.message = {}
    }

    $scope.closePage = () => {
        $scope.isShowPage = false;
        $scope.isCreateForm = false;
        $('body').off('keydown', arrowNavigation);
        $scope.currentPageData = {};
        $scope.currentPageData.PicturePath = " "; //&&&&&&&&&&&&&&&&&&&&&&&+
        $('#comments').removeClass('in');
    }

    $scope.showBlogPage = ($event) => {

        $scope.currentPageIndex = $event.currentTarget.dataset.index;
        $scope.currentPageData = $scope.blogPageData[$scope.currentPageIndex];
        $scope.currentPageId = $scope.currentPageData.Id;
        $scope.isShowPage = true;

        loadComments();        
         
        $('body').on('keydown', arrowNavigation);
    }

    $scope.pagination = () => {
        if ($scope.infinitePaginationDisabled) return;

        $scope.infinitePaginationDisabled = true;
        console.log('pagination');
        $http.get('api/BlogPages/?offset=' + $scope.blogPageData.length + '&limit=4')
            .success((data) => {
                console.log($scope.blogPageData);
                $scope.blogPageData = $scope.blogPageData.concat(data);
                console.log($scope.blogPageData);
                $timeout(() => { $scope.infinitePaginationDisabled = false; }, 1000);
            });
    }
        
    $scope.previousPage = () => {
        $scope.currentPageIndex = $scope.currentPageIndex == 0 ? +$scope.blogPageData.length - 1 : +$scope.currentPageIndex - 1;
        $scope.currentPageData = $scope.blogPageData[$scope.currentPageIndex];
        $scope.currentPageId = $scope.currentPageData.Id;
        loadComments();
    }

    $scope.nextPage = () => {
        $scope.currentPageIndex = $scope.currentPageIndex == $scope.blogPageData.length - 1 ? 0 : +$scope.currentPageIndex + 1;
        $scope.currentPageData = $scope.blogPageData[$scope.currentPageIndex];
        $scope.currentPageId = $scope.currentPageData.Id;
        loadComments();
    }

    $scope.textAreaTab = ($event) => {
        if ($event.which === 9) {
            $event.preventDefault();


            let start = $event.target.selectionStart;
            let end = $event.target.selectionEnd;

            if (!$scope.currentPageData.Content) $scope.currentPageData.Content = '';
            console.log($scope.currentPageData.Content);

            $scope.currentPageData.Content = $scope.currentPageData.Content.substring(0, start) + '\t' + $scope.currentPageData.Content.substring(end);
            console.log($scope.currentPageData.Content);
            angular.element($event.target).val($scope.currentPageData.Content);

            $event.target.selectionStart = $event.target.selectionEnd = start + 1;
        }
    }

    function loadComments() {
        $http.get('api/Comments/' + $scope.currentPageId).success((data) => {
            $scope.currentPageData.Comments = data;
            console.log(data);
        });
    }

    function arrowNavigation(e) {
        $timeout(() => {
            switch (e.keyCode) {
                case 37:
                    $scope.previousPage();

                    break;
                case 39:
                    $scope.nextPage();
                    break;
            }

        });
    }

});