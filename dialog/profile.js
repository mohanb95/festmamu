var builder 		=		require('botbuilder');
var numExtract  =  function(str){
	var ch,str1="";
	for(i=0;i<str.length;i++){
		ch=str.charAt(i);
		if(ch>='0' && ch<='9'){
			str1+=ch;
		}
	}
	return str1;
};
profile = {
	Label	: 	'Profile',
	Dialog	: 	[
		function(session,args,next){
			if(!args){
				next();
			}else{
				session.send("ok so what would you want to know?");
				session.endDialog();
			}
		},
		function(session,args,next){
			if(!session.userData.name){
				session.send("Before we start...");
				// session.send('So let us get to know each other before starting');
				builder.Prompts.text(session,'What is your name?');
			}
			else{
				// session.userData.name=args;
				next();
			}
		},
		function(session,args,next){
			if(args.response){
				if(/my name is/i.test(args.response))
				{
					var match = /my name is/i.exec(args.response);
					args.response = args.response.substring(match[0].length,args.response.length);
				}
				session.userData.name= args.response;	
			}
			if (!session.userData.age) {
				session.send("and how old are you?");
				session.send('Please give it in a range');
				builder.Prompts.text(session,'ex: (20-25)');
			}
			else{
				next();
			}
		},
		function(session,args,next){
			if (args.response) {
				session.userData.age = args.response;
			}
			if (!session.userData.phone) {
				builder.Prompts.text(session,"If you dont mind, may I have your phone number to contact you with updates?");
			}
			else
				next();
		},
		function(session,args,next){
			if (args.response) {
				res = args.response;	
				if(res.match(/[0-9]+/)){
					session.userData.phone=numExtract(res);
					next();
				}else if(res.match(/(no|nope)/)){
					session.send("I'll take that as a no..That's alright.");
					session.userData.phone="0";
					next();
				}else if(res.match(/(yes|ya|sure|yup)/)){
					builder.Prompts.text(session,"Thanks and your number is?");	
				}
			}
			else
				next();
		},
		function(session,args,next){
			if(args.response){
				console.log("here");
				session.userData.phone=args.response;
			}
			next();
		},
		function(session,results){
			session.send(session.userData.name);
			session.send(session.userData.age);
			session.send(session.userData.phone);
			session.send(session.userData.greet);
			session.userData.profile=true;
			session.send("thats it for now");
			// session.send("Hi %s I think this is your number : %s",session.userData.name,session.userData.phone);
			// session.send("Thank You! This is all I can do...");
			// session.send("For now 😎");
			session.endDialog();	
		}
	]
};

module.exports = profile;