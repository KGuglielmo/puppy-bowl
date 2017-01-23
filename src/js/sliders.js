var $ = require('jquery');
var slick = require('../../node_modules/slick-carousel/slick/slick.js');

module.exports = function () {

	$('#PuppyBowlPetHappens .products').slick({
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

  $('#PuppyBowlPetHappens .slider-default').slick();

};
