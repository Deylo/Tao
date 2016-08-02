myApp.controller('homeController', ($scope) => {
    $scope.initHome = () => {
        $(window).on('scroll', toggleVisibility)
                .on('resize', toggleVisibility)
                .on('scroll', toggleUpButonVisibility)
                .on('resize', toggleUpButonVisibility);
    }

    $scope.goUp = function () {
        $('html, body').stop().animate({
            scrollTop: $('#page1').offset().top
        }, 1000);
    }

    $scope.goDown = (anchor) => {
        $('html, body').stop().animate({
            scrollTop: $(anchor).offset().top
        }, 1000);
    }

    $scope.$on("$destroy", function () {
        $(window).off('scroll', toggleVisibility)
                 .off('resize', toggleVisibility)
                 .off('scroll', toggleUpButonVisibility)
                 .off('resize', toggleUpButonVisibility);
    });

    function toggleUpButonVisibility() {
        console.log('tere');
        let $window = $(window);
        let windowHeight = $window.height();
        let windowScroll = $window.scrollTop();
        let $upButton = $('.button-up');
        let $page = $('#page1');
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

    function toggleVisibility() {
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
});