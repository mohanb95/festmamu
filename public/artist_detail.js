$(document).ready(function(){
 	$('.carousel').carousel({full_width: true});
 	window.sr = ScrollReveal();
	sr.reveal('.reveal');
	var i=0;
	var waypoint = new Waypoint({
		element: document.getElementById('trigger'),
		handler: function(direction) {
			i++;
			$('#name').css({'left':'545px'});
			$('#name').css({'color':'white'});
			$('.a').css({'display':'none'});
			$('.nB').css({'display':'none'});
			if(i>2){
				$(".navbar").toggleClass('hd');
				$("#name").animate({left: '0px'});
				$('#name').css({'color':'black'});
				$('.msg').slideDown("slow",function(){
					$('.call').slideDown("slow");
					$('.nB').delay( 800 ).fadeIn( 400 );
				});
			}
			console.log('Scrolled to waypoint!');
		}
	});
	$('.nav-btn').on('click',function(){
		console.log($(this).attr('id'));
		select = $(this).attr('id');
		if(select=='Music'){
			$('#overview').css({"display":"none"});
			$('#music').css({"display":"block"});
			$(".navbar").toggleClass('hd');
		}else if(select== 'Overview'){
			$('#name').css({'left':'545px'});
			$('#name').css({'color':'white'});
			$('.a').css({'display':'none'});
			$('.nB').css({'display':'none'});
			$(".navbar").toggleClass('hd');
			$('#overview').css({"display":"block"});
			$('#music').css({"display":"none"});			
		}
	});
	$('.togg').click(function(){
		$(this).addClass('select');
		$(this).siblings().removeClass('select');
	});
});
