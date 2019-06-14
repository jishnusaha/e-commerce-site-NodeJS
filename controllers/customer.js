var express		=	require('express');
var router		=	express.Router();

var validation	= require('./validation');


var productModel = require.main.require('./models/product-model');
var userModel = require.main.require('./models/user-model');


router.get('*',function(request,response,next){
	//console.log("Cookies :  ", request.cookies);
	
	//console.log(request.cookie);
	// request.session.customerlogin="valid";
	// request.session.user_name="jishnu saha";														//get *
	// request.session.user_id=10;
	// request.session.user_type='customer';
	// console.log("userid setted : "+request.session.user_id);
	
	// if(response.cookie.customerlogin=='valid')
	// {
		// console.log("cookie found");
		// request.session.customerlogin=response.cookie.customerlogin;
		// request.session.user_name=response.cookie,user_name;														//get *
		// request.session.user_id=response.cookie.user_id;
		// request.session.user_type=response.cookie.user_type;
	// }
	// else
	// {
		// console.log("cookie not found");
		
	// }
	next();
});







router.get('/',function(request,response){
	user={
		customerlogin	:	request.session.customerlogin,
		user_name		:	request.session.user_name,
		user_id			:	request.session.user_id,
		user_type		:	request.session.user_type,												//get /
		search_textbox	:	"" //request.param('search_textbox')
	};
	response.render('customer/eshopping',user);
	
});


router.get('/showcart',function(request,response){
	
	if(request.session.customerlogin!='valid') response.redirect('/logout');
	else
	{
		user={
			customerlogin	:	request.session.customerlogin,
			user_name		:	request.session.user_name,											// get showcart
			user_id			:	request.session.user_id,
			user_type		:	request.session.user_type,
			search_textbox	:	""
			
		};
		response.render("customer/showcart",user);
	}
	
	
});

router.get('/changepassword',function(request,response){
	
	if(request.session.customerlogin!='valid') response.redirect('/logout');
	else
	{
		user={
			customerlogin	:	request.session.customerlogin,
			user_name		:	request.session.user_name,											//get change password
			user_id			:	request.session.user_id,
			user_type		:	request.session.user_type,
			search_textbox	:	"",
			oldvalid		:	"",
			newvalid		:	""
			
		};
		response.render("customer/changepassword",user);
	}
	
	
});
router.get('/showordered',function(request,response){
	
	if(request.session.customerlogin!='valid') response.redirect('/logout');
	else
	{
		user={
			customerlogin	:	request.session.customerlogin,
			user_name		:	request.session.user_name,
			user_id			:	request.session.user_id,											//show ordered
			user_type		:	request.session.user_type,
			search_textbox	:	""
			
		};
		response.render("customer/showordered",user);
	}
	
	
});

router.get('/reviewproduct/:pid',function(request,response){
	
	
	if(request.session.customerlogin!='valid') response.redirect('/logout');
	else
	{
		user={
			customerlogin	:	request.session.customerlogin,
			user_name		:	request.session.user_name,
			user_id			:	request.session.user_id,
			user_type		:	request.session.user_type,											//review prouct
			search_textbox	:	"", //request.param('search_textbox')
			product_id		:	request.params.pid
		};
		response.render('customer/reviewprouct',user);
	}
	
});


router.get('/eshopping',function(request,response){
	user={
		customerlogin	:	request.session.customerlogin,
		user_name		:	request.session.user_name,
		user_id			:	request.session.user_id,											//home eshopping
		user_type		:	request.session.user_type,
		search_textbox	:	"" //request.param('search_textbox')
		
	};
	response.render('customer/eshopping',user);
});

router.get('/search/:key',function(request,response){
	console.log('in search get request params');
	user={
		customerlogin	:	request.session.customerlogin,
		user_name		:	request.session.user_name,
		user_id			:	request.session.user_id,											//search/key
		user_type		:	request.session.user_type,
		search_textbox	:	request.params.key
	};
	//console.log(user.search_textbox);
	response.render('customer/search',user);
	
});


router.get('/search',function(request,response){
	console.log('in search get request');
	
	
	var search_textbox_val = request.query.search_textbox;
	
	console.log("searched : "+search_textbox_val);
	user={
		customerlogin	:	request.session.customerlogin,
		user_name		:	request.session.user_name,
		user_id			:	request.session.user_id,											//search
		user_type		:	request.session.user_type,
		search_textbox	:	search_textbox_val
	};
	response.render('customer/search',user);
	
});

router.get('/showproduct/:id',function(request,response){
	
	var pid= request.params.id;
	user={
		customerlogin	:	request.session.customerlogin,
		user_name		:	request.session.user_name,
		user_id			:	request.session.user_id,
		user_type		:	request.session.user_type,											//show prouct
		product_id		:	pid
	};
	response.render('customer/showproduct');
	
	
});

router.get('/login',function(request,response){
	
	
	
	
	response.redirect('/login');																//login
});













//ajax.............................ajax...............................ajax.......................ajax.........................ajax








router.post('/getCommentRating',function(request,response){
	
	console.log('in getCommentRating key : '+request.body.key);
	productModel.getCommentRating(request.body.key,function(result){
		if(result.length>0)
		{
			//alert(result);
			//console.log(result);
			response.send(result);
		}																					//getCommentRating
		else
		{
			response.send([]);
			console.log("no result");
		}
	});
});


router.post('/reviewproduct',function(request,response){
	
	console.log('in post reviewproduct pid : '+request.body.pid);
	var pid=Number(request.body.pid);
	var rating=Number(request.body.rating);
	
	user={
		pid			:	 pid,
		review		:	 request.body.review,
		rating		:	 rating,
		cid			:	 request.session.user_id,											//reviewproduct	
		user_name	:	 request.session.user_name
	};
	console.log(user);
	productModel.reviewproduct(user,function(result){
		if(result){
			productModel.updateRating(user,function(result){
				if(result){
						response.send(true);
				}else{
					console.log("rating not updated");
					response.send(false);
				}
			});
			
		}
		else response.send(false);
	});
});









router.post('/getUserReview',function(request,response){
	
	console.log('in getUserReview key : '+request.body.key);
	user={
	
		pid		:	 request.body.key,
		cid		:	 request.session.user_id
	};
	productModel.getUserReview(user,function(result){									//getUserReview
		if(result.length>0)
		{
			//alert(result);
			//console.log(result);
			response.send(result);
		}
		else
		{
			response.send([]);
			console.log("no result");
		}
	});
});



router.post('/getProductData',function(request,response){
	
	console.log('in getProductData key : '+request.body.key);
	productModel.getProductData(request.body.key,function(result){
		if(result.length>0)
		{
			//alert(result);
			//console.log(result);
			response.send(result);
		}
		else
		{
			response.send([]);
			console.log("no result");
		}
	});
});


router.post('/getSearchData',function(request,response){
	
	//console.log('in getsearchdata key : '+request.body.key);
	productModel.getsearchSugession(request.body.key,function(result){
		if(result.length>0)
		{
			//alert(result);
			//console.log(result);
			response.send(result);
		}
		else
		{
			response.send([]);
			console.log("no result");
		}
	});
});


router.post('/deleteCartProduct',function(request,response){
	
	//console.log('in deleteCartProduct key : '+request.body.key);
	productModel.deleteCartProduct(request.body.key,function(result){
		
		response.send(result);
		
	});
});







router.post('/addtocart',function(request,response){
	
	
	console.log("in addtocart");
	user={
	
		pid			:	 Number(request.body.pid),
		quantity	:	 Number(request.body.quantity),
		cid			:	 request.session.user_id
	};
	console.log(user);
	productModel.addtocart(user,function(result){
		console.log(result);
		response.send(result);
		
	});
});





router.post('/changeQuantityInCart',function(request,response){
	
	
	console.log("in changeQuantityInCart");
	user={
	
		cartid		:	 Number(request.body.cartid),
		quantity	:	 Number(request.body.quantity)
	};
	console.log(user);
	productModel.changeQuantityInCart(user,function(result){
		
		console.log("in customer");
		console.log(result);
		response.send(result);
		
	});
});

router.post('/confirmOrder',function(request,response){
	
	
	if(request.session.customerlogin=='valid')
	{
		console.log("in confirm order");
		productModel.confirmOrder(request.session.user_id,function(result){
			
			if(result) console.log("done confrim");
			else console.log("not done confirm");
			response.send(result);
			
		});
	
	
	}
});




router.post("/getCartData",function(request,response){
	
	console.log(" in get cart data");
	if(request.session.customerlogin=="valid")
	{
		console.log('in getCartData');
		productModel.getCartData(request.session.user_id,function(result){
			if(result.length>0)
			{
				//alert(result);
				console.log(result);
				response.send(result);
			}
			else
			{
				response.send([]);
				console.log("no result");
			}
		});
	}
	else response.send([]);
				
	
});



router.post("/getOrderedData",function(request,response){
	
	console.log("in getOrderedData");
	if(request.session.customerlogin=="valid")
	{
		console.log('in getOrderedData');
		productModel.getOrderedData(request.session.user_id,function(result){
			if(result.length>0)
			{
				//alert(result);
				console.log(result);
				response.send(result);
			}
			else
			{
				response.send([]);
				console.log("no result");
			}
		});
	}
	
				
	
});

router.post("/CancelOrder",function(request,response){
	
	console.log("in CancelOrder");
	if(request.session.customerlogin=="valid")
	{
		console.log('in CancelOrder login valid');
		productModel.CancelOrder(request.body.key,function(result){
			response.send(result);
		});
	}
});


router.post("/changepassword",function(request,response){
	
	
	if(request.session.customerlogin=='valid') 
	{
		submission={
			oldpass: request.body.oldpassword,
			newpass: request.body.newpassword	
		};
		console.log("validating old password");
		data={
			id : request.session.user_id,
			password: submission.oldpass
		};
		userModel.validatePassword(data,function(result){
			
			if(result){
				console.log("ok old password");
				console.log("validating new password");
				validation.password(submission.newpass,function(result){
					
					if(result){
						console.log("ok new password");
						console.log("updating new password");
						data={
							id : request.session.user_id,
							password: submission.newpass
						};
						userModel.updatePassword(data,function(result){
							
							if(result){
								console.log("updated");
								response.send("done");
							}else{
								console.log('not updated');
								response.send("error");	
							}
						});
					}
					else{
						response.send("invalidNew");	
					}
				});
				
			}
			else{
				console.log("passwor not valid");
				response.send("invalidOld");	
			}
			
		});
	}
	
	
	
});




router.post('/getKyeSearchedData',function(request,response){
	
	var key=request.body.key;
	
	productModel.getPidBykey(key,function(result){
		
		console.log(result);
		response.send(result);
		
		
	});
	
	
});

router.post('/getHomePageData',function(request,response){
	
	console.log('in getHomePageData');
	
	
	productModel.getHomePageData(function(result){
		
		console.log(result);
		response.send(result);
		
		
	});
	
	
});










module.exports=router;
