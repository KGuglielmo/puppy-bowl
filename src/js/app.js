var $ = require('jquery');
var jQuery = require('jquery');
window.jQuery = jQuery;

var bootstrap = require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap');
var slick = require('../../node_modules/slick-carousel/slick/slick.js');

$(document).ready( function (){

	$('.products').slick({
		arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
    	{
    		breakpoint: 768,
	    	settings: {
	    		slidesToShow: 1,
	    		slidesToScroll: 1,
	    		centerMode: true,
	    		variableWidth: true
	    	}
    	}
    ]
  });

  $('.slider-default').slick();

});
