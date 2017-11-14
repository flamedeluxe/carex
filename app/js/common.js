$(function() {

    if($('.hero-carousel').length) carousel();

    var lat = $('#links a').first().attr('data-lat'),
        lng = $('#links a').first().attr('data-lng');
    yamap(lat, lng, "map_footer", 14, 'img/marker.png', [90, 95]);


    var lat = $('#markers li').first().attr('data-lat'),
        lng = $('#markers li').first().attr('data-lng');
    yamap(lat, lng, "map", 14, 'img/marker.svg', [31, 36]);

    $('#links a').click(function(event) {
        $('#links a').removeClass('active');
        $(this).addClass('active');
        $('#map_footer').html('');
        var lat = $(this).attr('data-lat');
            lng = $(this).attr('data-lng');
        yamap(lat, lng, "map_footer", 12, 'img/marker.png', [90, 95]);
        return false;
    });

    $('.menubutton,.menu .close').click(function(event) {
        $('.menu').toggleClass('active');
    });
});

$(window).on("load",function(){
    $(".mCustomScrollbar").mCustomScrollbar({
        scrollInertia: 400
    });
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
            zoom: zoom,
            controls: []
        });
        var myPlacemark = new ymaps.Placemark(myMap.getCenter(),{}, {
            iconLayout: 'default#image',
            iconImageHref: marker,
            iconImageSize: size,
            iconImageOffset: [0, 0]
        });
        myMap.behaviors.disable(['scrollZoom', 'rightMouseButtonMagnifier'])                    
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
