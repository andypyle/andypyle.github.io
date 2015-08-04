$(document).ready(function(){
	var navToggle = $('.toggleNav');
	var navPanel = $('nav');


	var projectBtn = $('.projectFade');
	$('.projectMeta').hide();

	projectBtn.click(function(e){
		e.preventDefault();
		var meta = $(this).parent().siblings();
		var otherMeta = $(this).parent().parent().siblings().find('.projectMeta');

		meta.velocity("slideDown", {duration: 400, display:'flex'});
		//$(this).parent().velocity("scroll", {duration: 400});
		$('html').velocity('scroll', {offset:$(this).parent().offset().top});
		
		setTimeout(function() {
		    otherMeta.velocity("slideUp", {queue:false});
		    
		}, 0);
		

	});
});