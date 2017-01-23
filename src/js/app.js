var $ = require('jquery');
var jQuery = require('jquery');
window.jQuery = jQuery;

var modal = require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal');
var videoPlayer = require('./videoPlayer');
var sliders = require('./sliders');

$(document).ready( function (){
  videoPlayer();
  sliders();
});
