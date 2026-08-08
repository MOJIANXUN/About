(function($) {
	
	"use strict";
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}

	//Add One Page nav
	if($('.scroll-nav').length) {
		$('.scroll-nav ul').onePageNav();
	}

	$('[data-toggle="tooltip"]').tooltip();
	
	//Hide Bootstrap Onepage Menu On Click
	$('.mobile-menu .scroll-nav .navigation li a').on('click', function(){
		var windowWidth = $(window).width();
		if (windowWidth <= 1199) {
			$('.mobile-menu .navbar-toggle').trigger( "click" );
		}
	});

	//Typing animation
	$('.typed-title').typed({
		stringsElement: $('.typing-title'),
		backDelay: 1000,
		typeSpeed: 0,
		loop: true
	});

	//Custom scrollbar
	function customScrollbar() {
		var windowWidth = $(window).width();
		if (windowWidth > 1199) {
			$(".card-inner").niceScroll();
		}
	}
	customScrollbar();
	
	//Header Menu Desktop
	var container = $('.card-outer .container');
	var innerbox = $('.card-outer .card-inner-box');
	var card_items = $('.card-item');
	var animation_in = container.data('animation-in');
	var animation_out = container.data('animation-out');
	
	$('.main-menu').on('click', 'a', function(){
		var id = $(this).attr('href');
		var card_item = $(id);
		var menu_items = $('.main-menu li');
		var menu_item_home = $('.main-menu li.home');
		var menu_item = $(this).closest('li');
		
		if(!menu_item.hasClass('active') & $('#home').length) {
			menu_items.removeClass('active');
			container.find(card_items).removeClass('animated '+animation_in);
			if($(container).hasClass('opened')) {
				container.find(card_items).addClass('animated '+animation_out);
			}
			menu_item.addClass('active');
			container.addClass('opened');
			container.find(card_item).removeClass('animated '+animation_out);
			container.find(card_item).addClass('animated '+animation_in);
			$(card_items).addClass('hide-item');
			$(card_item).removeClass('hide-item');
			$(card_item).addClass('active');
		}

		if(!menu_item_home.hasClass('active')) {
			$(innerbox).addClass('offsetleft');
		} else {
			$(innerbox).removeClass('offsetleft');
		}
		return false;
	});

	//Jquery Knob animation (skill dials)
	if($('.dial').length){
		$('.dial').appear(function(){
			var elm = $(this);
			var color = elm.attr('data-fgColor');
			var perc = elm.attr('value');
			elm.knob({
				'value': 0,
				'min': 0,
				'max': 100,
				'skin': 'tron',
				'readOnly': true,
				'thickness': 0.12,
				'dynamicDraw': true,
				'displayInput': false
			});
			$({value: 0}).animate({ value: perc }, {
				duration: 2000,
				easing: 'swing',
				progress: function () { elm.val(Math.ceil(this.value)).trigger('change'); }
			});
		},{accY: 0});
	}

	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : { media : {} }
		});
	}

	//Elements Animation (WOW.js)
	if($('.wow').length){
		var wow = new WOW({
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       0,
			mobile:       true,
			live:         true
		});
		wow.init();
	}

	//Fact Counter
	if($('.count-box').length){
		$('.count-box').appear(function(){
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
		},{accY: 0});
	}

	//Page load
	$(window).on('load', function() {
		handlePreloader();
	});

	//Page resize
	$(window).on('resize', function() {
		customScrollbar();
	});

	// Theme colors: smooth transition based on time of day
	// 9-17 full light, 17-21 gradual dark, 21-5 full dark, 5-9 gradual light
	function mixColor(a, b, f) {
		return [
			Math.round(a[0] + (b[0] - a[0]) * f),
			Math.round(a[1] + (b[1] - a[1]) * f),
			Math.round(a[2] + (b[2] - a[2]) * f)
		];
	}

	function rgbStr(c) {
		return 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
	}

	function getDarkFactor() {
		var now = new Date();
		var t = now.getHours() + now.getMinutes() / 60.0;
		if (t >= 9 && t < 17) return 0;
		if (t >= 17 && t < 21) return (t - 17) / 4;
		if (t >= 21 || t < 5) return 1;
		return 1 - (t - 5) / 4;
	}

	function updateThemeColors() {
		var f = getDarkFactor();
		$('body').toggleClass('dark-version', f > 0.5);

		var gradStart = rgbStr(mixColor([145,71,255], [40,40,40], f));
		var gradEnd = rgbStr(mixColor([121,39,245], [25,25,25], f));
		$('.page-background').css('background-image',
			'linear-gradient(110deg, ' + gradStart + ' 0%, ' + gradEnd + ' 100%)');

		$('.card-item, .author-info').css('background-color',
			rgbStr(mixColor([255,255,255], [42,42,42], f)));

		$('.header').css('background-color',
			rgbStr(mixColor([248,233,233], [31,31,31], f)));

		$('.header ul li').css('border-bottom-color',
			rgbStr(mixColor([240,226,226], [51,51,51], f)));
	}

	updateThemeColors();
	setInterval(updateThemeColors, 60000);

})(window.jQuery);
