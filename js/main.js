
	// Header fixed with scroll
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();

		if (scroll >= 50) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});


	// Wow.js init
  var myWindow = $(window)
	if (myWindow.width() > 530) {
		new WOW().init();
	};


	// Makes the nav a active with the page scroll
	var sections = $('section');
  var	nav = $('nav[role="navigation"]');

	$(window).on('scroll', function () {
	  	var cur_pos = $(this).scrollTop();
	  	sections.each(function() {
	    	var top = $(this).offset().top - 76;
        var	bottom = top + $(this).outerHeight();

	    	if (cur_pos >= top && cur_pos <= bottom) {
	      		nav.find('a').removeClass('active');
	      		nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
	    	}
	  	});
	});


  // The animation between sections
	nav.find('a').on('click', function () {
  	var $el = $(this);
  	var id = $el.attr('href');

		$('html, body').animate({
			scrollTop: $(id).offset().top - 75
		}, 800);

	  return false;
	});


	// Mobile Navigation
	$('.nav-toggle').on('click', function() {
		$(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});
	nav.find('a').on('click', function() {
		$('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});
