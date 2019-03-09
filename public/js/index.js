
var serv=document.querySelectorAll("#service-color");
var style= document.querySelector("style");
var description= document.querySelectorAll("#description");
var serviceid=["stage","sponsor","dj","makeT"];
var img=["http://cdn.pcwallart.com/images/tiesto-concert-crowd-wallpaper-4.jpg",
	"http://www.kdpr.com.au/wp-content/uploads/2015/03/sponsorship.png"
	,"https://akadjblaze.files.wordpress.com/2013/01/704689_415721191833247_604565919_o.jpg",
	"http://image.dhgate.com/albu_341417082_00/1.0x0.jpg"];
var s= document.querySelectorAll(".he");


if (/Mobi/.test(navigator.userAgent)) {
	$('#service-color').css({'min-height': '50%'});
	$('.he').css({'min-height': '50%'});
	$('.ff').css({'min-height': '50%'});
	$('#festfeed').css({'min-height':'50%'});
    $('.abt').html("mobile phone");
    var j=1000;
    var sid;
for(var k=0;k<s.length;k++){

	s[k].addEventListener("click",function(){
		check=document.getElementsByClassName("col-xs-6")
		if((j!==1000)&&(this.id!==serviceid[j])&&check.length>0)
		{
			for(var i=0;i<serv.length;i++)
			if(i===j){
				serv[i].classList.toggle("col-xs-1");
				serv[i].classList.toggle("col-xs-6");
				document.querySelector(".ff").classList.toggle("col-xs-12");
				document.querySelector(".ff").classList.toggle("col-xs-8");
				style.innerHTML=".img:before{background-image: url("+img[i]+");";
				description[i].classList.toggle("vis");
				sid=document.getElementById(serviceid[i]);
				document.querySelectorAll(".btn")[i].classList.toggle("col-xs-offset-3");
				document.querySelectorAll(".btn")[i].classList.toggle("active");

				
				j=i;

			}
			else
			{
				serv[i].classList.toggle("col-xs-1");
				serv[i].classList.toggle("col-xs-2");
		
			}
			console.log(sid);
		sid.classList.toggle("st_act");
		sid.classList.toggle("text-center");
		sid.classList.toggle("up");
		sid.classList.toggle("img");
		document.querySelector(".ff").classList.toggle("col-xs-8");
		
	  }
		

		for(var i=0;i<serv.length;i++)
			if(this.id===serviceid[i]){
				serv[i].classList.toggle("col-xs-1");
				serv[i].classList.toggle("col-xs-6");
				style.innerHTML=".img:before{background-image: url("+img[i]+");";
				description[i].classList.toggle("vis");
				sid=document.getElementById(serviceid[i]);
				document.querySelectorAll(".btn")[i].classList.toggle("col-xs-offset-3");
				document.querySelectorAll(".btn")[i].classList.toggle("active");
				document.querySelector(".ff").classList.toggle("col-xs-12");
				document.querySelector(".ff").classList.toggle("col-xs-8");
				j=i;

			}
			else
			{
				serv[i].classList.toggle("col-xs-1");
				serv[i].classList.toggle("col-xs-2");
		
			}
			console.log(sid);
		sid.classList.toggle("st_act");
		sid.classList.toggle("text-center");
		sid.classList.toggle("up");
		sid.classList.toggle("img");
		
	});
}
}
else{
	if(checkBrowser()=="Firefox"){
		console.log("firefox yo");
	$('#service-color').css({'min-height': '80%'});
	$('.he').css({'min-height': '100%'});
	$('.ff').css({'min-height': '80%'});
	$('#festfeed').css({'min-height':'100%'});	
	}
	else{
		$('#service-color').css({'min-height': '80%'});
	$('.he').css({'min-height': '80%'});
	$('.ff').css({'min-height': '80%'});
	$('#festfeed').css({'min-height':'80%'});	
	}
	
	
	
	
// 	$('.he').hover(function(){
// 	window.setTimeout( function(){
// 		console.log("slow down something");
// 	}, 5000 );
// 	$(this).parent().parent().children().toggleClass('col-md-1 col-md-2');
// 	$(this).parent().toggleClass('col-md-2');
// 	console.log();
// 	$(this).children().toggleClass('vis');
// 	$(this).find('h2').toggleClass('vis');
// 	$(this).find('a.btn.btn-default.active').removeClass('active');
// 	$(this).find('a.btn.btn-default').removeClass('vis');
// 	// $(this).find('a.btn').addClass('active');
// 	$('.ff').toggleClass('col-md-12 col-xs-12 col-xs-8 col-md-2 col-md-1 col-md-8');
// 	$(this).parent().toggleClass('col-md-6 up st_act');
// 	$(this).toggleClass('img');
	
// },
// function(){
// 	$(this).parent().parent().children().toggleClass('col-md-1 col-md-2');
// 	$(this).parent().toggleClass('col-md-2');
// 	console.log($(this));
// 	$(this).children().toggleClass('vis');
// 	$(this).find('h2').toggleClass('vis');
	
// 	$('.ff').toggleClass('col-md-12 col-xs-12 col-xs-8 col-md-2 col-md-1 col-md-8');
// 	$(this).parent().toggleClass('col-md-6 up st_act');
// 	$(this).toggleClass('img');
	
// });




	
	
	
	
	
	var j=1000;

for(var k=0;k<s.length;k++){

	s[k].addEventListener("click",function(){
		check=document.getElementsByClassName("col-md-6")
		if((j!==1000)&&(this.id!==serviceid[j])&&check.length>0)
		{
			for(var i=0;i<serv.length;i++)
			if(i===j){
				serv[i].classList.toggle("col-md-1");
				serv[i].classList.toggle("col-md-6");
				document.querySelector(".ff").classList.toggle("col-md-12");
				document.querySelector(".ff").classList.toggle("col-md-12");
				style.innerHTML=".img:before{background-image: url("+img[i]+");";
				description[i].classList.toggle("vis");
				sid=document.getElementById(serviceid[i]);
				// document.querySelectorAll(".btn")[i].classList.toggle("col-md-offset-3");
				document.querySelectorAll(".btn")[i].classList.toggle("active");

				
				j=i;

			}
			else
			{
				serv[i].classList.toggle("col-md-1");
				serv[i].classList.toggle("col-md-2");
		
			}
		sid.classList.toggle("st_act");
		sid.classList.toggle("text-center");
		sid.classList.toggle("up");
		sid.classList.toggle("img");
		document.querySelector(".ff").classList.toggle("col-md-8");
		
	  }
		

		for(var i=0;i<serv.length;i++)
			if(this.id===serviceid[i]){
				serv[i].classList.toggle("col-md-1");
				serv[i].classList.toggle("col-md-6");
				style.innerHTML=".img:before{background-image: url("+img[i]+");";
				description[i].classList.toggle("vis");
				sid=document.getElementById(serviceid[i]);
				// document.querySelectorAll(".btn")[i].classList.toggle("col-md-offset-3");
				document.querySelectorAll(".btn")[i].classList.toggle("active");
				document.querySelector(".ff").classList.toggle("col-md-12");
				document.querySelector(".ff").classList.toggle("col-md-8");
				j=i;

			}
			else
			{
				serv[i].classList.toggle("col-md-1");
				serv[i].classList.toggle("col-md-2");
		
			}
		sid.classList.toggle("st_act");
		sid.classList.toggle("text-center");
		sid.classList.toggle("up");
		sid.classList.toggle("img");
		
	});
}
}


$( "#go" ).click(function() {
			$(this).toggleClass('tr');

			if($(this).hasClass('tr')){
				$('.chat').addClass('tri-right');
				$( ".chat" ).animate({
				    width: "500px",
				    height:'450px',
				    // opaxcity: 0.4,
				    marginRight: "1.5em",
				    fontSize: "3em",
				    borderWidth: "10px"
				  }, 1000 );
			}else{
				$('.chat').removeClass('tri-right');
				$( ".chat" ).animate({
				    width: "0px",
				    height:'0px',
				    opaxcity: 0.4,
				    marginRight: "0in",
				    fontSize: "0em",
				    borderWidth: "0px"
				  }, 1000 );
			}
		});

function checkBrowser(){
	var browser;
    c = navigator.userAgent.search("Chrome");
    f = navigator.userAgent.search("Firefox");
    m8 = navigator.userAgent.search("MSIE 8.0");
    m9 = navigator.userAgent.search("MSIE 9.0");
    if (c > -1) {
        browser = "Chrome";
    } else if (f > -1) {
        browser = "Firefox";
    } else if (m9 > -1) {
        browser ="MSIE 9.0";
    } else if (m8 > -1) {
        browser ="MSIE 8.0";
    }
    return browser;
}