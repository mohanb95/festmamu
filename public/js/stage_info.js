var next=document.querySelector(".next");
var prev=document.querySelector(".prev");
var img=document.querySelector("#img");
next.onclick=function next(){
	var i=0;
	img.src="http://www.queenshall.co.uk/userfiles/Stage%20Dimensions.jpg";
	i=1;
};
prev.onclick=function prev(){
	img.src="http://music.ucsc.edu/sites/default/files/stage_0.gif";
};





// =================================
//  transition reveal 
// =================================
window.sr = ScrollReveal();
sr.reveal('.reveal');
// ============*********************
