$(document).ready(function(){

	'use strict';

	var body = $('html,body');

  function pauseVideo(){
  	var active = $('.dot-content-item.active');
		var iframe = active.find('iframe');
		var player;

		iframe.each(function(el){
			player = new Vimeo.Player( $(iframe[el]) );
			player.pause();
		});
  }

	// Smooth scrolling 
	$('.navigation button').on('click', function(){
		var scroll = $(this).data('scroll');

		if(scroll){

			body.animate({
	    	scrollTop: $(scroll).offset().top
			}, 2000);		
		}
	});

	// Portfolio item, show list
	$('.portfolio-item__image').on('click', function(){
		var sibl = $(this).siblings('.portfolio-item__list');
		var li = sibl.find('li');

		sibl.toggleClass('active');
		li.each(function(i){
	    var liCurrent = $(this);
		  setTimeout(function() {
        liCurrent.toggleClass('active', !liCurrent.hasClass('active'));
      }, 100*i);
		  
		});
	});

	// Mobile menu button
	$('.header__menu-button').on('click', function(){
		$('.navigation--header').toggleClass('active');
	});

	// Portfolio slider
	var portfolioSlider = $('.portfolio-slider');

	portfolioSlider.on('init', function(){
		var currentSlideData = $('.portfolio-slider .slick-current').data('slide');
		$('.dots-list[data-slide-dots="' + currentSlideData +'"]').addClass('active');
	});

	portfolioSlider.slick({
		autoplay: false,
		arrows: true,
		dots: false
	});

	portfolioSlider.on('beforeChange', function(){
		var currentSlideData = $('.portfolio-slider .slick-current').data('slide');

		$('.dots-list[data-slide-dots="' + currentSlideData +'"]').removeClass('active');
	});

	portfolioSlider.on('afterChange', function(){
		var currentSlideData = $('.portfolio-slider .slick-current').data('slide');
		var activeDot = $('.dot-item.active');
		var activeContent = $('.dot-content-item.active');

		activeDot.removeClass('active');
		activeContent.removeClass('active').slideUp('100');
		$('.dots-list[data-slide-dots="' + currentSlideData +'"]').addClass('active');
	});

	$('.slick-prev, .slick-next').on('click', function(){
		pauseVideo();
	});

	// Dots
	$('.dot-item').on('click', function(){
		var data = $(this).data('dot');
		var dataItem = $('.dot-content-item[data-dot-content="' + data +'"]');

		$(this).toggleClass('active');
		$(this).siblings().removeClass('active');

		pauseVideo();

		if(dataItem.hasClass('active')){
			dataItem.removeClass('active');
		} else {
			dataItem.addClass('active').slideDown(600);
			body.animate({
	    	scrollTop: $('.dot-content-item.active').offset().top
			}, 500);

			dataItem.siblings('.active').removeClass('active');
		}
	});

	// Close dot content
	$('.dot-content-item__close').on('click', function(){
		var parent = $(this).parent();
		var parentData = parent.data('dot-content');
		var targetDot = $('.dot-item[data-dot="'+ parentData +'"]');
		var iframe = parent.find('iframe');

		pauseVideo();

		if(parentData){
			targetDot.removeClass('active');	
			parent.removeClass('active');
		} else {
			parent.slideUp(400);
		}
		
	});

	// Bookmarks
	$('.tab-item__title').on('click', function(){
		var parent = $(this).parent();
		var text = parent.find('.tab-item__text');

		parent.addClass('active');
		parent.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
		  function(e) {
		  	text.addClass('active');
	  });
		parent.siblings().removeClass('active');
		parent.siblings().find('.tab-item__text').removeClass('active');
	});

	// Team slider
	$('.section-team-slider').slick({
		autoplay: true,
		autoplaySpeed: 600,
		arrows: false,
		dots: false,
		fade: true
	});

	// Show imprint
	$('.imprint-button').on('click', function(){
		$('.imprint-content').slideToggle(400);
	});

});