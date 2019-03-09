var slider = new Slider('#ex2', {});
var slideVal=[0,1000];
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







$.ajax({
	type: 'GET',
	url 		: 	'/stage/list',
  	success : 	function(got){
  		$('.ajaxloader').css({'display':'none'});
  		console.log(got.stage);
  		var str1 =got.stage;
  		var str = Object.keys(str1[0]);
  		var as=[];
  		for(i in str1){
  			as.push({
	  			Comp_Name : str1[i].Comp_Name,
	  			cost	  : str1[i].cost.Cost,
	  			image     : 'http://www.queenshall.co.uk/userfiles/Stage%20Dimensions.jpg',
	  			link	  : '/stage/'+str1[i]._id,
	  			link2	  : '/stage/'+str1[i]._id,
	  			contact	  : str1[i].Location.Contact1
	  		}); 
  		}
		console.log(as);
  		var options = {
  			valueNames: ['Comp_Name', 'cost',{ attr: 'src', name: 'image' },{ attr: 'href', name: 'link' },{ attr: 'href', name: 'link2' },'contact'],
  			item : '<div class="col-md-12 hov" id="stage1">'+
'<span>'+
'	<span class="col-md-3">'+
'		<a class="link"><img  class="img-responsive thumbnail image"></a>'+
'	</span>'+
'	<span>'+
'		<h2 class="Comp_Name"></h2>'+
'		<h5>cost:  <span class="cost"></span></h5>'+
'		<p>contact:'+
'			<p class="cont contact">'+
'				'+
'			</p>'+
'		</p>'+
'		<a class="link2" id="detail">for more details <i class="fa fa-caret-right"></i></a>'+
'	</span>'+
'</span>'+
'</div>'
  			// item: '<li><h3 class="Comp_Name"></h3><p class ="cost"</p></li>',
  		};
  		
  		var stageList = new List('test',options,as);
  		
  		slider.on('slide',function(da){
		console.log(da);
		$('.range-bubble').css({'display':'inline-block'});
		$('.lower').html(da[0]);
		$('.upper').html(da[1]);
		slideVal=da;
	});
	slider.on('change',function(da) {
	    stageList.filter(function(item) {
			if (item.values().cost > slideVal[0]  && item.values().cost<slideVal[1]) {
			   return true;
			} else {
			   return false;
			}
		});
	});
  	}
});




function closeRange(){
	slider.setValue([0,10000],true,true);
	$('.range-bubble').css({'display':'none'});
}

function activate(st){
	console.log();
	$(st).addClass('select');
	$(st).siblings().removeClass('select');
}