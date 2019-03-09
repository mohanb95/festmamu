window.sr = ScrollReveal();
sr.reveal('.reveal');
sr.reveal('.reveal-9s',{ duration: 6000 });
if (/Mobi/.test(navigator.userAgent)) {
    
  	var card=document.querySelectorAll("#card");
        var x=0;
	  	for(var i=0;i<card.length;i++){
	  		card[i].classList.add("flipped");
	  	}
}
else{
var x=0;
var waypoint = new Waypoint({
  element: document.getElementById('trigger'),
  handler: function(direction) {
  	var card=document.querySelectorAll("#card");
  	go();
  	function go(){
	  	for(var i=0;i<card.length;i++){
	  		card[i].classList.add("flipped");
	  		if(++x<20)
	  		setTimeout(go, 2000);
	  	}
	  
  	}
    console.log('Scrolled to waypoint!');
  }
});

}