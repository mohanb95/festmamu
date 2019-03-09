!function(a){
	"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function i(){var b,c,d={height:f.innerHeight,width:f.innerWidth};return d.height||(b=e.compatMode,(b||!a.support.boxModel)&&(c="CSS1Compat"===b?g:e.body,d={height:c.clientHeight,width:c.clientWidth})),d}function j(){return{top:f.pageYOffset||g.scrollTop||e.body.scrollTop,left:f.pageXOffset||g.scrollLeft||e.body.scrollLeft}}function k(){if(b.length){var e=0,f=a.map(b,function(a){var b=a.data.selector,c=a.$element;return b?c.find(b):c});for(c=c||i(),d=d||j();e<b.length;e++)if(a.contains(g,f[e][0])){var h=a(f[e]),k={height:h[0].offsetHeight,width:h[0].offsetWidth},l=h.offset(),m=h.data("inview");if(!d||!c)return;l.top+k.height>d.top&&l.top<d.top+c.height&&l.left+k.width>d.left&&l.left<d.left+c.width?m||h.data("inview",!0).trigger("inview",[!0]):m&&h.data("inview",!1).trigger("inview",[!1])}}}var c,d,h,b=[],e=document,f=window,g=e.documentElement;a.event.special.inview={add:function(c){b.push({data:c,$element:a(this),element:this}),!h&&b.length&&(h=setInterval(k,250))},remove:function(a){for(var c=0;c<b.length;c++){var d=b[c];if(d.element===this&&d.data.guid===a.guid){b.splice(c,1);break}}b.length||(clearInterval(h),h=null)}},a(f).on("scroll resize scrollstop",function(){c=d=null}),!g.addEventListener&&g.attachEvent&&g.attachEvent("onfocusin",function(){d=null})});

var artist=["dj","band","stand","head"];
$(function(){
		function moveDown(ch){
			if(i<73){
				$("."+ch).css({'top':i+'px'});
				i+=2;
				var time=window.setTimeout(function(){
					moveDown(ch);
				},10);
			}
			else
			{
				return 0;
			}
		}
		function moveUp(ch){
			if(j>73){
				$("."+ch).css({'top':j+'px'});
				j-=2;
				var time=window.setTimeout(function(){
					moveUp(ch);
				},10);
			}
			else
			{
				return 0;
			}
		}
		function hover_effect(ch){
			$("."+ch).hover(function(){
					$("."+ch+"-back").addClass("fliped");
					$(".fliped").removeClass(ch+"-back");
					$(".fliped").addClass(ch+"-back"+2);

				}, function(){
					$("."+ch+"-back"+2).removeClass("fliped");
					$("."+ch+"-back"+2).addClass(ch+"-back");
					$("."+ch+"-back").removeClass(ch+"-back"+2);

				});
		}
		var i=-300;
		moveDown("dj");
		var j=300;
		moveUp("band");
		i=-300;
		moveDown("stand");
		j=300;
		moveUp("head");
		for(i=0;i<artist.length;i++)
			hover_effect(artist[i]);
		
		
});
$("img").each(function(key,value){
			if($(value).attr("src").indexOf(".jpg")==-1)
			$(value).attr("src",$(value).attr("src")+".jpg");	
		});
	
function navigate(Id) {
			$('html, body').animate({ scrollTop: $("#"+Id).offset().top - 40 }, 2000);
		}