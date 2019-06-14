

$(document).ready(function(){
	
	//alert('loaded');
	
	var quantity=1;
	
	var pid=$('#pid').html().trim();;
	//alert(pid);
	console.log(pid);
	
	$('#addtocart').click(function(){
		
		$.ajax({
			url: "/addtocart",
			method:"post",
			data:{
				pid		: pid,
				quantity: quantity
			},
			success:function(res){
				if(res) 
				{
					$('#dialogue').dialogBox({
						type: "correct",
						hasMask: true,
						autoHide: true,
						time: 1200,
						content: "added to cart"
					});
				}
				else 
				{
					$('#dialogue').dialogBox({
						title: "error",
						type: 'error',
						hasClose: true,
						content: "failed to add to cart"
					});
				}
			}
		});
	
	
		
		
		
		
	});
	
	
	
	
	
	
	
	$.ajax({
		url: "/getProductData",
		method:"post",
		data:{
			key: pid
		},
		success:function(res){
			var data="";
			//console.log('success :'+res[0].name  );
			$('#productName').html(res[0].name);
			data="";
			for(var i=0;i<res[0].rating;i++) data+="★";
			$('#rating').html(data);
			
			
			var feature=res[0].specification.split('\n');
			data="";
			for(var i=0;i<feature.length;i++)
			{
				 data+='<p>>'+feature[i]+'</p>'
			}
			 //alert(data);
			$('#feature').html(data);
			if(res[0].discount==0)
			{
				$('#price').html('<h3> price ৳'+res[0].price+'</h3>');
			}
			else
			{
				data="<h3>Price: </h3>";
				data+='<h3><s> ৳'+res[0].price+'</s> '+res[0].discount+'% off </h3>';
				data+="<h3>৳"+res[0].current_price+"</h3>";
				$('#price').html(data);
				
			}
			
			dpUI.numberPicker("#np", {
				start: 1,
				min: 1,
				max: res[0].quantity,
				step: 1,
				formatter: function(x){
					return " "+x;
				},
				afterChange()
				{
					quantity=this.number;
				}
				
			});
		}
	});
	
	$.ajax({
		url: "/getCommentRating",
		method:"post",
		data:{
			key: pid
		},
		success:function(res){
			console.log('success :'+res.length  );
			var value="";
			for(var i=0;i<res.length;i++)
			{
				console.log("added "+i);
				value+="<table><tr><th rowspan='2'><h1>"+res[i].username+"</h1></th><td><div style='color:#ffc700; '>";
				for(var j=0;j<res[i].rating;j++)
				{
					value+="★";
				}
				value+="</div></td></td></td></tr><tr><td>"+res[i].comment+"</td></tr></table><hr/>";
			}
			$('#review').html(value);
		}
	});
	
	
	
	
});
	