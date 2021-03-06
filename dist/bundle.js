
 $(document).ready(function(){ 
// process the form ------------------------------------------------------------
$('form').submit(function(event) {

    // clears the form after errors at first trail
    $('.form-group').removeClass('has-error'); // remove the error class
    $('.help-block').remove(); // remove the error text

    // get the form data
    var formData = {
        'name'              : $('input[name=name]').val(),
        'email'             : $('input[name=email]').val(),
        'superheroAlias'    : $('input[name=superheroAlias]').val()
    };
    // the  serielize option
    // var str = $( "form" ).serialize();


    // process the form
    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'mail.php', // the url where we want to POST
        data        : formData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode      : true
    })

    // using the done promise callback
    .done(function(data) {
        // log data to the console so we can see
        console.log(data);

        // here we will handle errors and validation messages
        if ( ! data.success) {

            // handle errors for name ---------------
            if (data.errors.name) {
                $('#name-group').addClass('has-error'); // add the error class to show red input
                $('#name-group').append('<div class="help-block">' + data.errors.name + '</div>'); // add the actual error message under our input
            }

            // handle errors for email ---------------
            if (data.errors.email) {
                $('#email-group').addClass('has-error'); // add the error class to show red input
                $('#email-group').append('<div class="help-block">' + data.errors.email + '</div>'); // add the actual error message under our input
            }

            // handle errors for superhero alias ---------------
            if (data.errors.superheroAlias) {
                $('#superhero-group').addClass('has-error'); // add the error class to show red input
                $('#superhero-group').append('<div class="help-block">' + data.errors.superheroAlias + '</div>'); // add the actual error message under our input
            }
            } else {
                // ALL GOOD! just show the success message!
                $('form').append('<div class="alert alert-success">' + data.message + '</div>');
                // usually after form submission, you'll want to redirect
                // window.location = '/thank-you'; // redirect a user to another page
            }
    })

    // using the fail promise callback
    .fail(function(data) {
        // show any errors
        // best to remove for production
        console.log(data);
    });

    event.preventDefault();
});


	// Header fixed with scroll ------------------
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();
		if (scroll >= 50) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});


	// Wow.js init ------------------
  var myWindow = $(window)
	if (myWindow.width() > 530) {
		new WOW().init();
	};


	// Makes the nav a active with the page scroll ------------------
	var sections = $('section');
  var	nav = $('nav[role="navigation"]');

	$(window).on('scroll', function () {
	  	var cur_pos = $(this).scrollTop();
	  	sections.each(function() {
	    	var top = $(this).offset().top - 76;
        var	bottom = top + $(this).outerHeight();
	    	if (cur_pos >= top && cur_pos <= bottom) {
	      		nav.find('a').removeClass('active');
	      		nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
	    	}
	  	});
	});


  // The animation between sections ------------------
	nav.find('a').on('click', function () {
  	var $el = $(this);
  	var id = $el.attr('href');
		$('html, body').animate({
			scrollTop: $(id).offset().top - 75
		}, 800);
	  return false;
	});


	// Mobile Navigation ------------------
	$('.nav-toggle').on('click', function() {
		$(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});
	nav.find('a').on('click', function() {
		$('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});

 }); // End document ready 
