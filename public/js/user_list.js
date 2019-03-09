$(function(){
	window.sr = ScrollReveal();
sr.reveal('.reveal');
	if ($('.stage').hasClass('active')) {
			$('.stage-data').removeClass('hid');
	}
	function activate(nav,content){
		$('.stage').removeClass('active');
		$('.sound').removeClass('active');
		$('.tent').removeClass('active');
		nav.classList.add('active');
		$('.main').addClass('hid');
		$("."+content).removeClass('hid');
		
	}
	$('.stage').click(function(){
		activate(this,"stage-data");
	});
	$('.sound').click(function(){
		activate(this,"sound-data");	
	});
	$('.tent').click(function(){
		activate(this,"tent-data");
	});
});
