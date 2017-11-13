$(function() {

	$('.hero-carousel').owlCarousel({
		items: 1,
		nav: true,
		dots: true,
		animateOut: 'fadeOut'
	});

});

yamap(60.967595, 69.045735);
		
function yamap(lat, lng) {
	ymaps.ready(init);
 
    function init() {
        var myMap = new ymaps.Map("map", {
            center: [lat, lng],
            zoom: 18,
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
	return false;
});
