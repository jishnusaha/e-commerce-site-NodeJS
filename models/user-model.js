var db = require('./db');

module.exports={
	
	insert: function(user, callback){
		var sql = "INSERT INTO user (name,email,password,type) values(?, ?, ?,?)";
		db.execute(sql, [user.name, user.email, user.password, user.type], function(success){
			callback(success);
		});
	},
	validateUser: function(user, callback){
		var sql = "select * from user where email=? and password=?";
		db.getResult(sql, [user.email, user.password], function(result){
			
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getInfoByEmail: function(email, callback){
		var sql = "select * from user where email=?";
		db.getResult(sql, [email], function(result){
			//console.log(result);
			callback(result);
		});
	},
	validatePassword:function(data,callback){
		console.log(data);
		console.log("in old validate password");
		var sql="select password from user where uid=? and password=?";
		db.getResult(sql,[data.id,data.password],function(result){
			if(result.length>0) callback(true);
			else callback(false);
		});
	},
	updatePassword: function(data, callback){
		console.log("in update passowrd");
		var sql = "UPDATE user set password=? where uid=?";
	
		db.execute(sql, [data.password, data.id], function(status){
			callback(status);
		});
	},
	get: function(userId, callback){
		var sql = "select * from user where uid=?";
		db.getResult(sql, [userId], function(result){
			//console.log(result);
			callback(result[0]);
		});
	},
	
	getInfo: function(email, callback){
		var sql = "select * from user where email=?";
		db.getResult(sql, [email], function(result){
			//console.log(result);
			callback(result);
		});
	},
	getAllName: function(callback){
		var sql = "SELECT email FROM user";
		db.getResult(sql, [], function(result){
			callback(result);
		});
	},
	
	getAll: function(callback){
		var sql = "SELECT * FROM user";
		db.getResult(sql, [], function(result){
			callback(result);
		});
	},
	update: function(user, callback){
		console.log(user);

		var sql = "UPDATE user set name=?,email=?, password=?, contact_number=?,address=? where uid=?";
	
		db.execute(sql, [user.name ,user.email, user.password,user.contact_number,user.address, user.uid], function(status){
			callback(status);
		});
	}
}