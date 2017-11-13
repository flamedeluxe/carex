$(function() {

	$('.hero-carousel').owlCarousel({
		items: 1,
		nav: true,
		dots: true,
		animateOut: 'fadeOut'
	});

	$(window).on("load",function(){
        $(".mCustomScrollbar").mCustomScrollbar({
			scrollInertia: 400
        });
    });

});

var lat = $('#markers li').first().attr('data-lat');
var lng = $('#markers li').first().attr('data-lng');
yamap(lat, lng);
		
function yamap(lat, lng) {
	ymaps.ready(init);
 
    function init() {
        var myMap = new ymaps.Map("map", {
            center: [lat, lng],
            zoom: 16,
            controls: []
        });
        var myPlacemark = new ymaps.Placemark(myMap.getCenter(),{}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/marker.svg',
            iconImageSize: [50, 60],
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
	yamap(lat, lng);
	$(this).closest('ul').find('li').removeClass('active');
	$(this).addClass('active');
});
