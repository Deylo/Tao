myApp.controller('homeController', ($scope, $location) => {
    $scope.initHome = () => {
        $(window).on('scroll', _toggleVisibility)
                .on('resize', _toggleVisibility)
                .on('scroll', _toggleUpButonVisibility)
                .on('resize', _toggleUpButonVisibility);
    }

    let _goUp = () => {
        $('html, body').stop().animate({
            scrollTop: $('landing-page:first').offset().top
        }, 1000);
    }

    let _goDown = ($event) => {
        $('html, body').stop().animate({
            scrollTop: $($event.currentTarget)
                .next('landing-page')
                .offset().top
        }, 1000);
    }

    $scope.$on("$destroy", function () {
        $(window).off('scroll', _toggleVisibility)
                 .off('resize', _toggleVisibility)
                 .off('scroll', _toggleUpButonVisibility)
                 .off('resize', _toggleUpButonVisibility);
    });

    function _toggleUpButonVisibility() {        
        let $window = $(window);
        let windowHeight = $window.height();
        let windowScroll = $window.scrollTop();
        let $upButton = $('.button-up');
        let $page = $('landing-page:first');
        let elemBottomPosition = $page.offset().top + $page.outerHeight();

        if ((elemBottomPosition - windowScroll) < 0)
            $upButton
                .removeClass('hover')
                .stop()
                .animate({ opacity: 1 }, 1000);
        else $upButton
                .addClass('hover')
                .hide()
                .stop()
                .css({ opacity: 0 });
    }

    function _toggleVisibility() {
        let $window = $(window);
        let windowHeight = $window.height();
        let windowScroll = $window.scrollTop();

        $('.button-down').each((i, elem) => {
            let $elem = $(elem);
            let elemPosition = $elem.offset().top - windowScroll;

            if (elemPosition < windowHeight && elemPosition > 0)
                $elem.stop().animate({ opacity: 1}, 1000);

            else $elem.css({ opacity: 0});
        });
    }

    $scope.goDown = _goDown;
    $scope.goUp = _goUp;
});