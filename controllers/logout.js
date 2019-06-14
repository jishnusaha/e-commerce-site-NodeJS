var express		=	require('express');
var router		=	express.Router();
router.get('/',function(request,response){
	
	request.session.destroy(function(error){
		// console.log(+" printing");
	});
	response.redirect('/customer');
});

module.exports=router;