var express		=	require('express');
var mysql = require('mysql');
var userModel = require.main.require('./models/user-model');

var router		=	express.Router();


router.get('*',function(request,response,next){
	if(request.session.customerlogin=='valid' ) response.redirect('/customer');
	else if(request.session.shopkeeperlogin=='valid' ) response.redirect('/shopkeeper');
	else next();
});


router.get('/dialogueLogin',function(request,response){

	user={
		notice: ' '
	};
	
	response.render('login/dialogueLogin',user);
});

router.get('/',function(request,response){

	user={
		notice: ' '
	};
	
	response.render('login',user);
});


router.post('/dialogueLogin',function(request,response){
	
	user={
		email			:	 request.body.email,
		password		:	 request.body.password
	};
	
	userModel.validateUser(user,function(result){
		
		if(result) 
		{
			userModel.getInfoByEmail(user.email,function(result){
		
				if(result[0].type=='customer')
				{
					request.session.customerlogin="valid";
					request.session.user_name=result[0].name;
					request.session.user_id=result[0].uid;
					request.session.user_type=result[0].type;
					//response.redirect('/customer');	
				}
				else if(result[0].type=='saler')
				{
					request.session.customerlogin="valid";
					request.session.user_name=result[0].name;
					request.session.user_id=result[0].uid;
					request.session.user_type=result[0].type;
					
				}
				else
				{
					request.session.un=result[0].uid;
					
				}
			});
		}
		else
		{
			user={
				notice: "invalid login"
			};
			
			response.render('login',user);
		}
	});
	
	
	
});





router.post('/',function(request,response){
	
	user={
	
		email			:	 request.body.email,
		password		:	 request.body.password
	};
	
	userModel.validateUser(user,function(result){
		
		if(result) 
		{
			userModel.getInfoByEmail(user.email,function(result){
		
				if(result[0].type=='customer')
				{
					request.session.customerlogin="valid";
					request.session.user_name=result[0].name;
					request.session.user_id=result[0].uid;
					request.session.user_type=result[0].type;
					
					// if(request.body.remember_me=='remember_me')
					// {
						// var cookieTime=100;
						// response.cookie("remember_me","valid",{maxAge : cookieTime} );
						// response.cookie("user_name",result[0].name,{maxAge : cookieTime} );
						// response.cookie("user_id",result[0].uid,{maxAge : cookieTime}  );
						// response.cookie("user_type",result[0].type,{maxAge : cookieTime}  );
					// }
					response.redirect('/customer');	
				}
				else if(result[0].type=='saler')
				{
					request.session.shopkeeperlogin="valid";
					request.session.user_name=result[0].name;
					request.session.user_id=result[0].uid;
					request.session.user_type=result[0].type;
					response.redirect('/shopkeeper');
				}
				else
				{
					request.session.un=result[0].uid;
					response.redirect('/admin');
				}
			});
		}
		else
		{
			user={
				notice: "invalid login"
			};
			
			response.render('login',user);
		}
	});
	
	
	
});


module.exports=router;