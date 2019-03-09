var gold=document.getElementById("gold");
var silver= document.getElementById("silver");
var bronze= document.getElementById("bronze");
var sp=document.querySelectorAll(".sp");
var style=document.querySelector("style");
gold.onclick= function check_button(){
	if(!(gold.classList.contains("select")))
	{
		gold.classList.add("select");
		silver.classList.remove("select");
		bronze.classList.remove("select");
		style.innerHTML="#block{background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(218, 165, 33, .15)), to(rgba(0, 0, 0, .25))), -webkit-gradient(linear, left top, right bottom, color-stop(0, rgba(218, 165, 33, 1)), color-stop(0.8, rgba(218, 165, 33, .1)), color-stop(0.501, rgba(218, 165, 33, 1)), color-stop(1, rgba(218, 165, 33, 1)));}";
	}
};
silver.onclick= function check_button(){
	if(!(silver.classList.contains("select")))
	{
		silver.classList.add("select");
		gold.classList.remove("select");
		bronze.classList.remove("select");
		style.innerHTML="#block{background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(168, 168, 168, .15)), to(rgba(0, 0, 0, .25))), -webkit-gradient(linear, left top, right bottom, color-stop(0, rgba(168, 168, 168, 1)), color-stop(0.8, rgba(168, 168, 168, .1)), color-stop(0.501, rgba(168, 168, 168, 1)), color-stop(1, rgba(168, 168, 168, 1)));}";
	}	

};
bronze.onclick= function check_button(){
	if(!(bronze.classList.contains("select")))
	{
		bronze.classList.add("select");
		gold.classList.remove("select");
		silver.classList.remove("select");
		style.innerHTML="#block{background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(205, 127, 50, .15)), to(rgba(0, 0, 0, .25))), -webkit-gradient(linear, left top, right bottom, color-stop(0, rgba(205, 127, 50, 1)), color-stop(0.8, rgba(205, 127, 50, .1)), color-stop(0.501, rgba(205, 127, 50, 1)), color-stop(1, rgba(205, 127, 50, 1)));}";
	}	

};
for(var i=0;i<sp.length;i++){
	sp[i].onclick= function doa(){
	window.location="./stage.html";
	};
}