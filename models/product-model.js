
var db = require('./db');

module.exports={
	
	
	
	
	/*-------------for customer feature---------------*/
	
	getsearchSugession: function(key,callback){
		
		var sql = "select name from product where name like '%"+key+"%'";
		db.getResult(sql, [key], function(result){
			//console.log(result);
			callback(result);
		});
	
	},
	getProductData: function(key,callback){
		
		var sql = "select * from productinfo where pid=?";
		db.getResult(sql, [key], function(result){
			console.log(sql);
			callback(result);
		});
	
	},
	getCommentRating: function(key,callback){
		
		var sql = "select * from comment_rating where productid=?";
		db.getResult(sql, [key], function(result){
			console.log(sql);
			callback(result);
		});
	
	},
	getUserReview: function(user,callback){
		
		console.log(user);
		var sql = "select * from comment_rating where productid=? and customerid=?";
		db.getResult(sql, [user.pid,user.cid], function(result){
			console.log(sql);
			console.log(user.pid+" "+user.cid);
			callback(result);
		});
	
	},
	updateRating: function(user,callback){
		
		console.log("in update rating");
		var sql="select avg(rating) rating from comment_rating where productid=?";
		db.getResult(sql,[user.pid],function(res){
			if(res.length>0){
				console.log("avg found. updating...");
				sql="update product set rating=? where pid=?";
				db.execute(sql,[res[0].rating,user.pid],function(success){
					
					callback(success);
				});
				
			}
			else{
				console.log("avg not found");
			}
			
		});
	},
	
	reviewproduct: function(user, callback){
		
		//var sql = "UPDATE comment_rating SET comment = ?, rating = ? WHERE  productid=? and customerid=?"; 
		
		//console.log("in product model review product");
		console.log(user);
		var sql="DELETE FROM comment_rating WHERE  productid=? and customerid=?"
		
		db.execute(sql, [user.pid, user.cid], function(success){
			
			console.log('deletion done');
			sql = "insert into comment_rating values (?,?,?,?,?)"; 
			db.execute(sql, [user.pid, user.cid,user.review,user.rating,user.user_name], function(success){
				callback(success);
			});
		});
	},
	getCartData: function(userid,callback){
		
		//console.log("in product model car data");
		var sql="select * from cartinfo where customerid=? and status='incart'";
		//console.log(sql);
		db.getResult(sql,[userid],function(result){
			callback(result);
		});
	},
	getOrderedData: function(userid,callback){
		
		//console.log("in product model car data");
		var sql="select * from cartinfo where customerid=? and (status='ordered' or status='canceled')";
		//console.log(sql);
		db.getResult(sql,[userid],function(result){
			callback(result);
		});
	},
	deleteCartProduct: function(id,callback){
		
		console.log("in deleteCartProduct id : "+id);
		var sql="delete from cart where id=?";
		db.execute(sql,[id],function(result){
			callback(result);
		});
		
	},
	addtocart: function(user,callback){
		console.log("in productmodel :  addtocart");
		console.log(user);
		var sql="INSERT INTO cart (productid,quantity, customerid, status ) VALUES (?,?,?,'incart')";

		db.execute(sql,[user.pid,user.quantity,user.cid,'incart'],function(result){
			callback(result);
		});
	},
	changeQuantityInCart: function(user,callback){
		
		console.log("in changeQuantityInCart ");
		console.log(user);
		var sql="update cart set quantity=? where id=?";
		db.execute(sql,[user.quantity,user.cartid],function(res){
			
			//console.log("done");
			callback(res);
			
		});
	},
	CancelOrder: function(id,callback){
		
		console.log("in CancelOrder product model ");
		console.log(id);
		var sql="update cart set status=? where id=?";
		db.execute(sql,['canceled',id],function(res){
			
			console.log("done in product model");
			callback(res);
			
		});
	},
	confirmOrder: function(userid,callback){
		
		var sql="update cart set status=? where customerid=? and status='incart'"
		db.execute(sql,['ordered',userid],function(res){
			callback(res);
		});
	},
	getPidBykey: function(key,callback){
		
		//var sql="select pid,name,quantity,price,discount,current_price from productinfo where type like '%?%' or name like '%?%' or catagory like '%?%' ";
		
		//var sql="select pid,name,quantity,price,discount,current_price from productinfo where type like '%"+key+"%' or name like '%"+key+"%' or catagory like '%"+key+"%' ";
		var sql="select * from productinfo where type like '%"+key+"%' or name like '%"+key+"%' or catagory like '%"+key+"%' ";
		db.getResult(sql,[key,key,key],function(res){
			callback(res);
		});
		
		
	},
	getHomePageData: function(callback){
		
		//var sql="select pid,name,quantity,price,discount,current_price from productinfo where type like '%?%' or name like '%?%' or catagory like '%?%' ";
		console.log('in product model getHomePageData');
	
		//var sql="select pid,name,quantity,price,discount,current_price from productinfo";
		// var sql="select * from productinfo";
		// console.log(sql);
		// db.getResult(sql,function(res){
			// callback(res);
		// });

		var key='n';
		var sql="select pid,name,quantity,price,discount,current_price from productinfo where discount>0 order by discount desc ";
		db.getResult(sql,[key,key,key],function(res){
			callback(res);
		});
		
		
	}
	
	
}