$(function() {

    if($('.hero-carousel').length) $('.hero-carousel').bxSlider({easing: 'ease-in'});
    sticky_menu();

    if($(window).width() >= 1200) {
        $('.wr').height($('.menu').outerHeight());    
    }else {
        $('.wr').css({
            height: 'auto'
        });
    }
    

    var lat = $('#links a').first().attr('data-lat'),
        lng = $('#links a').first().attr('data-lng');
    yamap(lat, lng, "map_footer", 17, 'img/marker.png', [90, 95]);


    var lat = $('#markers li').first().attr('data-lat'),
        lng = $('#markers li').first().attr('data-lng');
    yamap(lat, lng, "map", 17, 'img/marker.svg', [31, 36], 0, 0);

    $('#links a').click(function(event) {
        if(!$(this).hasClass('active')) {
            $('#links a').removeClass('active');
            $(this).addClass('active');
            $('#map_footer').html('');
            var lat = $(this).attr('data-lat');
                lng = $(this).attr('data-lng');
            yamap(lat, lng, "map_footer", 17, 'img/marker.png', [90, 95]);

            $('.map-container-caption .item').toggleClass('hidden');
        }
        return false;
    });

    $('.menubutton,.menu .close').click(function(event) {
        $('.menu').toggleClass('active');
    });
});

$(window).on("resize",function(){
    if($(window).width() >= 1200) {
        $('.wr').height($('.menu').outerHeight());    
    }else {
        $('.wr').css({
            height: 'auto'
        });
    }
});

$(window).on("load",function(){
    $(".mCustomScrollbar").mCustomScrollbar({
        scrollInertia: 400,
        documentTouchScroll: false
    });
});

function sticky_menu() {
    $(window).scroll(function() {
        var top = $(document).scrollTop();

        if (top > $('.top').outerHeight()) {
            $(".menu").addClass('sticky');
        }
        else {
            $(".menu").removeClass('sticky');
        }

    });
}

$('body').on('click', 'a[name]', function(event) {
    
    $('.section').removeClass('blur');
    $('body').removeClass('overflow-hidden');
    $('#modal').removeClass('show');
    $('#modal').html('');

    var aTag = $(this).attr('name');
    $('html,body').animate({scrollTop: $(aTag).offset().top - 40}, 'slow');
    return false;
});

function carousel() {
    $('.hero-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        animateOut: 'fadeOut'
    });
}

function yamap(lat, lng, selector, zoom, marker, size) {
    ymaps.ready(init);
 

    function init() {
        var myMap = new ymaps.Map(selector, {
            center: [lat, lng],
            zoom: zoom
        });
        var myPlacemark = new ymaps.Placemark(myMap.getCenter(),{}, {
            iconLayout: 'default#image',
            iconImageHref: marker,
            iconImageSize: size,
            iconImageOffset: [0, 0]
        });
        myMap.behaviors.disable(['scrollZoom', 'rightMouseButtonMagnifier']);       
        myMap.behaviors.disable('multiTouch');
        myMap.geoObjects.add(myPlacemark);
    }
}


$('body').on('click', '#markers li', function() {
    var lat = parseFloat($(this).attr('data-lat'));
    var lng = parseFloat($(this).attr('data-lng'));
    $('#map').html('');
    yamap(lat, lng, "map", 15, 'img/marker.svg', [31, 36]);
    $(this).closest('ul').find('li').removeClass('active');
    $(this).addClass('active');
});