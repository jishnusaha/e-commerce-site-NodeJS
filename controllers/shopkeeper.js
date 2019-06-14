var express		=	require('express');
var router		=	express.Router();
var fs			=	require('fs');
var dialog 		=   require('dialog');
var formidable  =   require('formidable');
var http 		=   require('http');

var productModel = require.main.require('./models/product-model');
var userModel = require.main.require('./models/user-model');


function getUser()
{
	user={
			shopkeeperlogin	:	request.session.shopkeeperlogin,
			user_name		:	request.session.user_name,
			user_id			:	request.session.user_id,
			user_type		:	request.session.user_type,
			search_textbox	:	"" //request.param('search_textbox')
		};
	return user;
}

router.get('/',function(request,response)
{
	user={
		shopkeeperlogin	:	request.session.shopkeeperlogin,
		user_name		:	request.session.user_name,
		user_id			:	request.session.user_id,
		user_type		:	request.session.user_type,
		search_textbox	:	"" //request.param('search_textbox')
	};
	response.render('shopkeeper/eshopping',user);
});
router.get('/home',function(request,response)
{
	user={
		shopkeeperlogin	:	request.session.shopkeeperlogin,
		user_name		:	request.session.user_name,
		user_id			:	request.session.user_id,
		user_type		:	request.session.user_type,
		search_textbox	:	"" //request.param('search_textbox')
	};
	response.render('shopkeeper/eshopping',user);
});

router.get('/',function(request,response)
{
	response.render('shopkeeper/login',user);
});

//product advertisement
router.get('/proadver',function(request,response)
{
	user={
			shopkeeperlogin	:	request.session.shopkeeperlogin,
			user_name		:	request.session.user_name,
			user_id			:	request.session.user_id,
			user_type		:	request.session.user_type,
			search_textbox	:	"" //request.param('search_textbox')
		};
	response.render('shopkeeper/proadver',user);
});

router.post("/proadver", function(request,response)
{
	product={
				//pid 			: request.body.pid,
				names        	: request.body.names,
				salerid         : request.session.user_id,
				specification	: request.body.specification,
				gender			: request.body.gender,
				types			: request.body.types,
				quantity		: request.body.quantity,
				catagory		: request.body.catagory,
				price			: request.body.price,
				discount		: request.body.discount,
			}; 
				//console.log(product);
		if(product.names!="")
		{
			if(product.specification!="")
			{
				if(product.quantity!="")
				{
					if(product.price!="")
					{
						productModel.insert(product, function(status)
						{

							if(status)
							{
								response.redirect('/shopkeeper/availproduct');
							}
							else
							{
								response.send('Errors');
							}
						
						});
					}
					else
						dialog.info("Price can not be empty");
				}
				else
					dialog.info("Quantity can not be empty");
			}
			else
				dialog.info("Specification can not be empty");
		}
		else
			dialog.info("Name can not be empty");
});

/*var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      	var oldpath = files.filetoupload.path;
	      var newpath = 'C:/Users/Noman' + files.filetoupload.name;
	      fs.rename(oldpath, newpath, function (err) {
	        if (err) throw err;
	        res.write('File uploaded and moved!');
	        res.end();
	      });
    });
  });*/


//profile
router.get('/profile', function(request, response)
{
	userId = request.session.user_id;
	userModel.get(userId,function(result)
	{
		response.render('shopkeeper/profile', {user: result, nom:"noman"});
	});
});

router.get('/edit/:uid', function(request, response)
{
	var userId = request.params.uid;
	userModel.get(userId, function(result)
	{
		response.render('shopkeeper/edit', {user: result});
	});
});

router.post('/edit/:uid', function(request, response)
{
	 user={
			uid 			: request.body.uid,
			name        	: request.body.name,
			email			: request.body.email,
			password		: request.body.password,
			contact_number	: request.body.contact_number,
			address			: request.body.address
		  }; 
		
	if(user.name!="")
	{
		if(user.email!="")
		{
			if(user.password!="")
			{
				if(user.contact_number!="")
				{		
					userModel.update(user, function(status)
					{
						if(status)
						{
							response.redirect('/shopkeeper/profile');
						}
						else
						{
							response.send('Errors');
						}
					});
				}
				else
					dialog.info("Contact number can not be empty");
			}
			else
				dialog.info("Password can not be empty");
		}
		else
			dialog.info("Email can not be empty");
	}
	else
		dialog.info("Name can not be empty");
});

router.get('/availproduct', function(request, response)
{
	productModel.getAll(function(result)
	{
		response.render('shopkeeper/availproduct', {product: result});
	});
});

router.get('/updateproduct/:pid', function(request, response)
{
	var productId = request.params.pid;
	productModel.get(productId, function(result)
	{
		response.render('shopkeeper/updateproduct', {product: result});
	});
});

router.post('/updateproduct/:pid', function(request, response)
{
	 product={
				pid 			: request.body.pid,
				name        	: request.body.name,
				specification			: request.body.specification,
				quantity		: request.body.quantity,
				price	: request.body.price,
				discount	: request.body.discount,
			}; 
	if(product.name!="")
		{
			if(product.specification!="")
			{
				if(product.quantity!="")
				{
					if(product.price!="")
					{
						productModel.update(product, function(status)
						{
							if(status)
							{
								response.redirect('/shopkeeper/availproduct');
							}
							else
							{
								response.send('Errors');
							}
						});
				}
				else
					dialog.info("Price can not be empty");
			}
			else
				dialog.info("Quantity can not be empty");
		}
		else
			dialog.info("Specification can not be empty");
	}
	else
		dialog.info("Name can not be empty");
});

router.get('/deleteproduct/:pid', function(request, response)
{
	response.render('shopkeeper/deleteproduct');
});

router.post('/deleteproduct/:pid', function(request, response)
{
	var pid = request.params.pid;
	productModel.Delete(pid, function(status)
	{
		if(status)
		{
			response.redirect('/shopkeeper/availproduct');
		}
		else
		{
			response.send('Error');
		}
			
	})
});


router.get('/discount', function(request, response)
{
	productModel.getDiscount(function(result)
	{
		response.render('shopkeeper/discount', {product: result});
	});
});

router.get('/discount/:pid', function(request, response)
{
	var productId = request.params.pid;
	productModel.get(productId, function(result)
	{
		response.render('shopkeeper/updateproduct', {product: result});
	});
});

router.post('/discount/:pid', function(request, response)
{
	product={
				pid 			: request.body.pid,
				name        	: request.body.name,
				specification			: request.body.specification,
				quantity		: request.body.quantity,
				price	: request.body.price,
			}; 
	if(product.name!="")
	{
		if(product.specification!="")
		{
			if(product.quantity!="")
			{
				if(product.price!="")
				{
					productModel.update(product, function(status)
					{
						if(status)
						{
							response.redirect('/shopkeeper/availproduct');
						}
						else
						{
							response.send('Errors');
						}
						
					});
				}
				else
					dialog.info("Price can not be empty");
			}
			else
				dialog.info("Quantity can not be empty");
		}
		else
			dialog.info("Specification can not be empty");
	}
	else
		dialog.info("Name can not be empty");
});


//pending request
router.get('/pendingreq', function(request, response)
{
	productModel.combine(function(result)
	{
		response.render('shopkeeper/pendingreq', {product:result});
	});
});

//pendingrequest
router.get('/acceptproduct/:productid', function(request, response)
{
	var productId = request.params.productid;
	productModel.getproduct(productId, function(result)
	{
		response.render('shopkeeper/acceptproduct', {product:result});
	});
});



router.post('/acceptproduct/:productid', function(request, response)
{
	product={
				Id 					: request.body.id,
				productId 			: request.body.productid,
				customerId 			: request.body.customerid,
				availablequantity		: request.body.availablequantity,
				requestquantity	: request.body.requestquantity,
				remainingquantity: request.body.availablequantity-request.body.requestquantity,
				
				
			}; 
	if(product.requestquantity>product.availablequantity)
	{
		dialog.info("Do not have enough product");
	}
	else
	{
		productModel.updatequantity(product, function(status)
		{
			if(status)
			{
				productModel.updatestatus(product, function(status)
				{
					if(status)
					{
						response.redirect('/shopkeeper/pendingreq');
					}
					else
					{
						response.send('Error');
					}
				});
			}
			else
			{
				response.send('Error');
			}
		});
	}
});	

module.exports=router;