$(document).ready(function(){

	'use strict';

	// Smooth scrolling 
	$('.navigation button').on('click', function(){
		var scroll = $(this).data('scroll');

		if(scroll != 0){

			$('html,body').animate({
	    	scrollTop: $('' + scroll).offset().top
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
		var iframe = activeContent.find('iframe');
		var src = iframe.attr('src');

		if(iframe){
			iframe.attr('src', ' ');
			iframe.attr('src', src);
		}
		activeDot.removeClass('active');
		activeContent.removeClass('active').slideUp('100');
		$('.dots-list[data-slide-dots="' + currentSlideData +'"]').addClass('active');
	});

	// Dots
	$('.dot-item').on('click', function(){
		var data = $(this).data('dot');
		var dataItem = $('.dot-content-item[data-dot-content="' + data +'"]');

		$(this).toggleClass('active');
		$(this).siblings().removeClass('active');

		if(dataItem.hasClass('active')){
			dataItem.removeClass('active');
		} else {
			dataItem.addClass('active').slideDown(600);
			$('html,body').animate({
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

		if(parentData != ''){
			targetDot.removeClass('active');	
			parent.removeClass('active');
		} else {
			parent.removeClass('active');
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
		$('.imprint-content').slideToggle(600);
	});

});