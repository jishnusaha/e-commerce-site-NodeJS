

$(document).ready(function(){
	
	var max_product=6;
	var customerlogin=$('#customerlogin').html().trim();
	
	function add_to_cart(id){
		
		
		var quantity=$('#q'+id).html().trim();
		
		$.ajax({
			url: "/addtocart",
			method:"post",
			data:{
				pid		: id,
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
		
		
	}
	$.ajax({
		url: "/getHomePageData",
		method: "post",
		data:{
			key: "nodata"
		},
		success: function(res){
			
			var data="";
			for(var i=0;i<res.length && i<max_product;i++)
			{
				
				data+="<div class='productSearch'>";
					data+="<a href='/customer/showproduct/"+res[i].pid+"'>";
					data+="<div class='pictureSearch'>";
						data+="<img src='/uploads/"+res[i].pid+".jpg' alt='picture'>";
					data+="</div>";
					data+="</a>";
					data+="<div class='description'>";
						data+="<h3>"+res[i].name+"</h3>";
						if(res[i].discount==0) data+="<h3>"+res[i].current_price+"</h3>";				
						else data+="<h3>"+res[i].current_price+"&nbsp&nbsp -"+res[i].discount+"% off</h3>";
			
					if(customerlogin=="valid") 
					{
			
						data+="<div id='np"+res[i].pid+"'></div>";
						data+="<br/>";
						data+="<button id='b"+res[i].pid+"' class='buttonshowsearch'>add to cart</button>	";
						data+="<div style='display: none;' id='q"+res[i].pid+"'>1</div>";
					}

					data+="</div>";
				data+="</div>";
			}
			$('#area').html(data);	
			for(var i=0;i<res.length && i<max_product;i++)
			{
				//console.log("in np "+ res[i].id);
				dpUI.numberPicker("#np"+res[i].pid, {
					start: 1,
					min: 1,
					max: res[i].maxQuantity,
					step: 1,
					formatter: function(x){
						return " "+x;
					},
					afterChange(){
						var p=this.id;
						var value=p.substr(2,p.length);
						//console.log(value);
						var id=parseInt(value);
						
						$('#q'+id).html(this.number);
					}
				});
			}
			$(".buttonshowsearch").click(function(evnt) {
						
				var p=$(evnt.target).attr('id');
						
				console.log(p);
				var value=p.substr(1,p.length);
				console.log(value);
				var id=parseInt(value);
				console.log(id);
				add_to_cart(id);
			});
		}
	});
	
	
});
	