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
    $scope.isEdit = false;

    authService.fillAuthData();
    $scope.authentication = authService.authentication;
    $scope.roleEnum = authService.roleEnum;

    let notificationDuration = 5;

    let _logOut = () => {
        authService.logOut();
    }

    let _deleteMessage = (messageId) => {
        $http.delete('api/Comments/' + messageId)
            .success((data, status, headers, config) => {
                _loadComments();
                alertify.notify('Message deleted', 'success', notificationDuration);
            })
            .error((data, status, headers, config) => {
                alertify.notify(data.Message, 'failure', notificationDuration);
            });
    }

    $scope.$watch('picFile',  () => {

        if (!$scope.picFile) return;

        $scope.currentPageData.PicturePath = URL.createObjectURL($scope.picFile);

    });

    let _uploadPic = (file) => {
        let s = new Date();
        console.log(s);
        file.upload = Upload.upload({
            url: 'api/BlogPages',
            data: {
                title: $scope.currentPageData.Title,
                content: $scope.currentPageData.Content,
                caption: $scope.currentPageData.PageName,
                date: s,
                file: file,
                userName: authService.authentication.userName
            },
        });

        file.upload.then((response) => {
            $timeout(() => {
                file.result = response.data;
                $scope.blogPageData = [];
                $scope.closePage();
                alertify.notify('Post created', 'success', notificationDuration);
            });
        }, (response) => {
            alertify.notify(response.data.message, 'error', notificationDuration);
        });
    }

    let _showCreatePostPage =  () => {
         $scope.currentPageData = {};
        $scope.isShowPage = true;
        $scope.isCreateForm = true;
       
    }

    let _editMessage = (message) => {
        $scope.message = message;
        $scope.isEdit = true;

    }

    let _confirmMessageChanges = () => {
        $http.put('api/comments/' + $scope.message.Id, $scope.message)
                .success((data) => {
                    alertify.notify('dsdada', 'success', notificationDuration);
                }
                ).error((data) => {
                    alertify.notify(data.message, 'error', notificationDuration);
                    
                });
        $scope.message = {};
    }

    let _sendComment = () => {
        $scope.message.Date = new Date();
        $scope.message.BlogPageId = $scope.currentPageId;
        $scope.message.userName = $scope.authentication.userName;

        $http.post('api/Comments', $scope.message)
            .success((data) => {
                $scope.currentPageData.Comments.push(data);
                alertify.notify('Comment sended', 'success', notificationDuration);
            })
            .error((data, status, headers, config) => {
                alertify.notify(data.message, 'error', 5);
                console.log('error');
            });
        $scope.message = {}
    }

    let _closePage = () => {
        $scope.isShowPage = false;
        $scope.isCreateForm = false;
        $('body').off('keydown', _arrowNavigation);
        $scope.currentPageData = {};
        $scope.currentPageData.PicturePath = " "; 
        $('#comments').removeClass('in');
    }

    let _edit = () => {
        $scope.isShowPage = true;
        $scope.isCreateForm = true;
    }

    let _showBlogPage = ($event) => {

        $scope.currentPageIndex = $event.currentTarget.dataset.index;
        $scope.currentPageData = $scope.blogPageData[$scope.currentPageIndex];
        $scope.currentPageId = $scope.currentPageData.Id;
        $scope.isShowPage = true;

        _loadComments();        
         
        $('body').on('keydown', _arrowNavigation);
    }

    let _pagination = () => {
        if ($scope.infinitePaginationDisabled) return;

        $scope.infinitePaginationDisabled = true;
        $http.get('api/BlogPages/?offset=' + $scope.blogPageData.length + '&limit=4')
            .success((data) => {
                $scope.blogPageData = $scope.blogPageData.concat(data);
                $timeout(() => { $scope.infinitePaginationDisabled = false; $scope.$broadcast('masonry.reload'); }, 1000);
            }).error((data) => {
                alertify.notify(data.message, 'error', notificationDuration);
            });
    }

    let _pageNavigation = (direction) => {

        switch (direction) {
            case 'previous':
                $scope.currentPageIndex = $scope.currentPageIndex == 0 ? +$scope.blogPageData.length - 1 : +$scope.currentPageIndex - 1;
                break;
            case 'next':
                $scope.currentPageIndex = $scope.currentPageIndex == $scope.blogPageData.length - 1 ? 0 : +$scope.currentPageIndex + 1;
                break;
        }

        $scope.currentPageData = $scope.blogPageData[$scope.currentPageIndex];
        $scope.currentPageId = $scope.currentPageData.Id;
        _loadComments();
    }    

    //$scope.textAreaTab = ($event) => {
    //    if ($event.which === 9) {
    //        $event.preventDefault();


    //        let start = $event.target.selectionStart;
    //        let end = $event.target.selectionEnd;

    //        if (!$scope.currentPageData.Content) $scope.currentPageData.Content = '';
    //        console.log($scope.currentPageData.Content);

    //        $scope.currentPageData.Content = $scope.currentPageData.Content.substring(0, start) + '\t' + $scope.currentPageData.Content.substring(end);
    //        console.log($scope.currentPageData.Content);
    //        angular.element($event.target).val($scope.currentPageData.Content);

    //        $event.target.selectionStart = $event.target.selectionEnd = start + 1;
    //    }
    //}

    let _loadComments = () => {
        $http.get('api/Comments/' + $scope.currentPageId)
            .success((data) => {
                $scope.currentPageData.Comments = data;
            })
            .error((data) => {
                alertify.notify(data.message, 'error', notificationDuration);
            });
    }

    let _arrowNavigation = (e) => {
        $timeout(() => {
            switch (e.keyCode) {
                case 37:
                    _pageNavigation('previous');

                    break;
                case 39:
                    _pageNavigation('next')
                    break;
            }

        });
    }

    $scope.logOut = _logOut;
    $scope.deleteMessage = _deleteMessage;
    $scope.uploadPic = _uploadPic;
    $scope.showCreatePostPage = _showCreatePostPage;
    $scope.sendComment = _sendComment;
    $scope.editPage = _edit;
    $scope.confirmMessageChanges = _confirmMessageChanges;
    $scope.editMessage = _editMessage;
    $scope.closePage = _closePage;
    $scope.showBlogPage = _showBlogPage;
    $scope.pagination = _pagination;
    $scope.pageNavigation = _pageNavigation;
});