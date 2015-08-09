$(document).ready(function(){
	/// Animate cover image.

	var cover = $('#cover');	

	cover.velocity({
		backgroundPositionX: '100%'
	},{loop: 1000, duration: 50000}, 'easeInOutQuad');



	/// Mobile navigation

	var navToggle = $('.toggleNav');
	var navPanel = $('nav');
	var navLinks = $('nav ul.navigation li a')
	var toggled = false;

	if(navToggle.is(':visible')){
		navPanel.velocity({
			translateX: "-100%",
			opacity: 0
		}, {duration: 0});

		navToggle.on('click', function(e){
			e.preventDefault();
			if(!toggled){
				toggled = !toggled;
				navPanel.velocity('stop')
				.velocity({
					opacity: 1,
					translateX: "-25%"
				});
			} else {
				toggled = !toggled;
				navPanel.velocity('stop')
				.velocity({
					opacity: 0,
					translateX: "-100%"
				});
			}
		});
	}


	// Cover scroll button. Scrolls to about section.
	var introBtn = $('a.introBtn')

	introBtn.on('click', function(e){
		e.preventDefault();
		var go = $('#'+$(this).data('goto'));
		go.velocity('scroll', {offset:-navPanel.parent().outerHeight(), duration: 1100});

	});

	/// Links in navigation also close navPanel, and then scroll
	//  to designated section.
	navLinks.on('click', function(e){
		e.preventDefault();
		var go = $('#'+$(this).data('goto'));

		if(navToggle.is(':visible')){
			if(!toggled){
				toggled = !toggled;
				navPanel.velocity('stop')
				.velocity({
					opacity: 1,
					translateX: "-25%"
				});
			} else {
				toggled = !toggled;
				navPanel.velocity('stop')
				.velocity({
					opacity: 0,
					translateX: "-100%"
				});

				setTimeout(function(){
					go.velocity('scroll', {offset:-navPanel.parent().outerHeight(), duration: 1100});
				}, 25);
			}
		}

		if(navToggle.is(':hidden'))
			go.velocity('scroll', {offset:-navPanel.parent().outerHeight(), duration: 1100});

	});




	/// Header background changes if below certain point
	//  for readability.

	var header = $('header');

	header.velocity({
		backgroundColor: '#2C3742',
		backgroundColorAlpha: 0
	}, {duration: 0});

	$(window).scroll(function(){
		if($(this).scrollTop() > 20){
			header.velocity('stop')
				.velocity({
				backgroundColorAlpha: .65
			}, {duration: 185});
		} else if($(this).scrollTop() < 20) {
			header.velocity('stop')
				.velocity({
				backgroundColorAlpha: 0
			}, {duration: 185});
		}
			
	});


	/// Tapping/clicking on project thumb expands 
	//  more information (projectMeta)

	var projectBtn = $('.projectFade');
	$('.projectMeta').hide();

	projectBtn.click(function(e){
		e.preventDefault();
		var project = $(this).parent().parent();
		var meta = $(this).parent().siblings();
		var otherMeta = $(this).parent().parent().siblings().find('.projectMeta');
		var otherMetaOverlays = $(this).parent().parent().siblings().find('.projectFade');

		// Fade out overlay on current project.
		$(this).velocity({
			opacity: 0
		});

		if(meta.is(':hidden'))
		// Slide meta info in to view.
			meta.velocity("slideDown", {duration: 400, display:'flex'});		
		
		setTimeout(function() {
			// While new meta info slides in to view,
			// slide all others out.		
		    otherMeta.velocity("slideUp");
		    otherMetaOverlays.velocity({
		    	opacity: 1
		    });
		}, 0);
		// Scroll to top of clicked project thumbnail.
		project.velocity('scroll', {delay: 400, offset:-navPanel.parent().outerHeight()});

		if(meta.is(':visible')){
			meta.velocity("slideUp", {duration: 400});
			$(this).velocity({
				opacity: 1
			});
		}
	});


	/// Contact form validation.

	var form = $('form#contactForm');
	var labels = $('form#contactForm label');
	labels.hide();

	var inputs = $("input[type='text'], input[type='email'], textarea");
	var button = $('button.send');
	var name = $("[name='name']");
	var email = $("[name='email']");
	var message = $("[name='message']");

	inputs.on('input', function(e){
		if(name.val().length > 0 &&
			email.val().length > 0 &&
			message.val().length > 0)
			button.prop('disabled', false);
	});

	form.on('submit', function(e){
		e.preventDefault();
		$.ajax({
		    url: "https://formspree.io/andy.pyle@gmail.com", 
		    method: "POST",
		    data: {
		    	name: name.val(),
		    	message: message.val(),
		    	_replyto: email.val(),
		    	_subject: 'New message: ' + name.val()
		    },
		    dataType: "json",
		    beforeSend: function(){
		    	$('button.send').prop('disabled', true).html("<span class='collecticon collecticon-arrow-loop rotate'></span>");
		    },
		    success: function(data, status){
		    	form.velocity("fadeOut", {
		    		duration: 250,
		    		complete: function(){
		    			form.remove();
		    			$('#contact').append('<p class=\'sendSuccess\'>Thank you! I\'ll get back to you soon!</p>');
		    		}
		    	});
		    },
		    error: function(error){
		    	$('#contact').append('<p class=\'sendError\'>Oops! Sorry, but there was an error while sending. Try again later!</p>');
		    }
		});

		/*
		if(name.val().length <= 0){
			name.next('label')
				.velocity("fadeIn", {duration: 30})
				.velocity("callout.shake");
		} else {
			name.next('label')
				.velocity("fadeOut", {duration: 100});
		}

		if(email.val().length <= 0){
			email.next('label')
				.velocity("fadeIn", {duration: 30})
				.velocity("callout.shake");
		} else {
			email.next('label')
				.velocity("fadeOut", {duration: 100});
		}

		if(message.val().length <= 0){
			message.next('label')
				.velocity("fadeIn", {duration: 30})
				.velocity("callout.shake");
		} else {
			message.next('label')
				.velocity("fadeOut", {duration: 100});
		}
		*/

	});
});