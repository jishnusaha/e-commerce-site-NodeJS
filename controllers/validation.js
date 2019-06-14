var password_length=3;

module.exports={
	password:function(pass,callback){
		if(pass.length<password_length) callback(false);
		else callback(true);
	}
	
	
	
	
	
}