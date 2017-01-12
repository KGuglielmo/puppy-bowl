var $ = require('jquery');
var jQuery = require('jquery');
window.jQuery = jQuery;

var bootstrap = require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap');
var slick = require('../../node_modules/slick-carousel/slick/slick.js');

$(document).ready( function (){
	$('.regular').slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });
	
});
