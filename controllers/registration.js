var express		=	require('express');
var mysql = require('mysql');
var userModel = require.main.require('./models/user-model');

var router		=	express.Router();


router.get('*',function(request,response,next){
	if(request.session.customerlogin=='valid') response.redirect('/customer');
	else next();
});


router.get('/',function(request,response){

	response.render('registration');
});

router.post('/',function(request,response){
	
	user={
		name			:	request.body.name,
		email			:	request.body.email,
		password		:	request.body.password,
		type			:	request.body.type
	};
	
	userModel.insert(user,function(result){
		
		if(result) 
		{
			response.redirect('/login');
			
		}
		else
		{
			response.redirect('/registration');
			
		}
	});
	
	
	
});


module.exports=router;