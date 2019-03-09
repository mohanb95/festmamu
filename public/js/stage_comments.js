var refid= $(location).attr('href').split('/')[4];
var rating; 
	loadCom();
		$('.ui.rating')
  .rating({
    initialRating: 0,
    maxRating: 5,
    onRate: function(str){
    	rating=str;
    }
  });
  $('.disar').rating('disable');
function loadCom(){
		$.ajax({
  	type 		: 	'GET',
  	async   :   false,
  	url 		: 	'/comment/stage/'+refid,
  	success : 	function(got){
  		$.each(got,function(key,data){
  			console.log(data);	
         if(data.author==null)
        {
          data.author={username: "Unregistered User"};
        }
        time='Comented'+findDiff(""+data.time)+" ago";
        // console.log(time);
  			if(key%2==0)
  				pan='<div class="reveal'+key+' row"><div class=col-sm-1><div class=thumbnail><img class="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"></div></div><div class=col-md-9 id="str" ><div class="panel panel-default"><div class=panel-heading><strong>'+data.author.username+'</strong> <span class=text-muted>'+time+'</span><br><label class=control-label for=input-1>Rated This</label><span class="ui rating disar" data-rating='+data.rating+'></span></div><div class=panel-body>'+data.text+'</div></div></div></div>';
  			else
  				pan='<div class="reveal'+key+' row"><div class="col-sm-1 right"><div class=thumbnail><img class="img-responsive user-photo" src=https://ssl.gstatic.com/accounts/ui/avatar_2x.png></div></div><div class=col-md-9 id="str"><div class="panel-right panel-right-default"><div class=panel-right-heading><strong>'+data.author.username+'</strong> <span class=text-muted>'+time+'</span><br><label class=control-label for=input-1>Rated This</label><span class="ui rating disar" data-rating='+data.rating+'></span></div><div class=panel-right-body>'+data.text+'</div></div></div></div>';
  		$('#comi').append(pan);
  		
  		});
  	}
  });	
	}
  function getDateTime() {

    var d = new Date();
    var utc = d.getTime() - (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var date = new Date(utc + (3600000*1));
    
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour-12;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

  }
  function findDiff(time){
    curTime=getDateTime();
    curTime=curTime.split(":");
    time+="";
    time=time.split(":");
    str="";
    $.each(time,function(key,value){
      if(value!=curTime[key] && value<curTime[key])
      {
        diff=curTime[key]-value;
        // console.log(diff+" key="+key);
        
        switch(key){
          case 0:
            str=" "+diff+" Years";
            break;
          case 1:
            str=" "+diff+" Months";
            break;
          case 2:
            str=" "+diff+" days";
            break;
          case 3:
            str=" "+diff+" hours";
            break;
          case 4:
            str=" "+diff+" minutes";
            break;
          case 5:
            str=" "+diff+" Seconds";
            break;
        }
        if(str!="")
          return false;
      }
    });
      return str+" ";
  }
  $('#comi').children().css({'display':'none'});
  $(document).ready(function(){
    
    $('#comi').on('inview', function(event, isInView) {
      if (isInView) {
        $('#comi').children().show( "fade", 1000 );
      }
    });  
  });
  function addcom(){
  	var comment={rating:rating,comment: $('#comment_content').val(),refId: refid,userId:$('#uid').val()};
  	console.log(comment);
  	$.ajax({
  		type 			: 	'POST',
  		url       : '/comment/stage/new',
  		data      : comment,
  		success 	: function(data){
  			if(data=="success"){
  				$('#closeModal').click();		
  				loadCom();
  			}
  				
  		}
  	});
  }