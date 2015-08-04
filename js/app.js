$(document).ready(function(){
	/// Animate cover image.
	var cover = $('#cover');

	
	cover.velocity('stop');

	cover.velocity({
		backgroundPositionX: '100%'
	},{loop: 1000, duration: 50000}, 'easeInOutQuad');


	/// Mobile navigation
	var navToggle = $('.toggleNav');
	var navPanel = $('nav');
	var navLinks = $('nav ul.navigation li a')
	var toggled = false;

	//navPanel.hide();

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

	navLinks.on('click', function(e){
		e.preventDefault();
		var go = $('#'+$(this).data('goto'));

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
				go.velocity('scroll', {offset:-navPanel.parent().outerHeight()});
			}, 25);
		}
	});

	var header = $('header');

	header.velocity({
		backgroundColor: '#2C3742',
		backgroundColorAlpha: 0
	}, {duration: 0});

	$(window).scroll(function(){
		if($(this).scrollTop() >= ($('#about').offset().top - navPanel.parent().outerHeight())){
			header.velocity({
				backgroundColorAlpha: .45
			}, {duration: 225});
		} else {
			header.velocity({
				backgroundColorAlpha: 0
			}, {duration: 225});
		}
			
	});



	/// Project buttons
	var projectBtn = $('.projectFade');
	$('.projectMeta').hide();

	projectBtn.click(function(e){
		e.preventDefault();
		var project = $(this).parent().parent();
		var meta = $(this).parent().siblings();
		var otherMeta = $(this).parent().parent().siblings().find('.projectMeta');

		meta.velocity("slideDown", {duration: 400, display:'flex'});
		//$(this).parent().velocity("scroll", {duration: 400});
		
		
		setTimeout(function() {
			
		    otherMeta.velocity("slideUp");
		    
		}, 0);
		project.velocity('scroll', {delay: 400});

	});
});