$(document).ready(function () {
    // Set the minimum height for the right side and bind on resize or orientation change
    jgtMinHeight();
    $(window).bind('resize orientationchange', function () {
        jgtMinHeight();
    });

    $('.right-wrap #menu').find('li:first').addClass('active');
    $('.right-wrap .main-section:first').addClass('active');

});


var tabsNav = $('.site-nav');
var tabsWrap = $('#main');

tabsNav.find('a').click(function (e) {
    if ($(this).parent().hasClass('active')) {
        e.preventDefault();
    } else {
        tabsWrap.find('.main-section').removeClass('active');
        tabsWrap.find($($(this).attr('href'))).addClass('active');
        tabsNav.find('li').removeClass('active');
        $(this).parent().addClass('active');
        e.preventDefault();

    }

});

$('#menu-left a').click(function (e) {
    if (menuOpened) {
        e.preventDefault();
    } else {
        openMenu();
        menuOpened = true;
    }


});

// Set the minimum height for the right side
function jgtMinHeight() {
    var leftWrap = $('.left-wrap')
        , rightWrap = $('.right-wrap')
        , animation = 'height 1s ease 0s';

    if (Modernizr.mq('only screen and (max-width: 1200px)') == true) {
        //	rightWrap.css({ 'min-height': $(window).height() - leftWrap.height() });
        rightWrap.css({
            'min-height': $(window).height() + 1
        });
        leftWrap.css({
            'height': $(window).height() - 120
            , '-webkit-transition': animation
            , '-moz-transition': animation
            , '-ms-transition': animation
            , '-o-transition': animation
            , 'transition': animation
        });
        console.log('narrow');

    } else {
        rightWrap.removeAttr('style');
        leftWrap.removeAttr('style');

        console.log('wide');
    }
};

var menuOpened = false;

function openMenu() {
    var settings = {
        'menu': ('.panel')
        , 'push': ('.push')
    }

    var menu = $(settings.menu);
    var push = $(settings.push);

    if (menuOpened) {
        console.log('closed');
        menu.removeClass('open');
        push.removeClass('open');
        menuOpened = false;
        $('.easter').removeClass('active');

    } else {
        console.log('open');
        menu.addClass('open');
        push.addClass('open');
        menuOpened = true;
        $('.easter').addClass('active');
    }

};

$('.menu-link').on('click', function (e) {
    e.preventDefault();
    openMenu();

});

$("a.slide-link").click(function () {
    $('html, body').animate({
        scrollTop: $("#content").offset().top
    }, 1000);
    return false;

});

var busy = false;
$('a[href*=#]:not([href=#]):not(.menu-link)').click(function () {
    if (!busy) {
        busy = true;
        var target = $('.right-wrap');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000, function () {
                busy = false;
            });
            return false;
        }
    }
});