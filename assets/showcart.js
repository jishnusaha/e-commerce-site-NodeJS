

$(document).ready(function(){
	
	//alert("ajax load");
	loadData();
	
	function delete_product(p){
		
		//p is remove button id. ex. #b0 #b1
		console.log(p);
		var value=p.substr(1,p.length);
		console.log(value);
		var id=parseInt(value);
	
		console.log(id);
		$.ajax({
			url: "/deleteCartProduct",
			method: "post",
			data:{
				key: id
			},
			success:function(res){
				if(res) 
				{
					loadData();
				}
				else 
				{
					$('#dialogue').dialogBox({
						hasMask: true,
						title: "error",
						type: 'error',
						autoHide: true,
						time: 1400,
						content: "error removing"
					});
				}
			}
		});
	


		
	}
	function changeQuantity(id,quantity,change){
		
		//here quantity is current spinner quantity. numeric value 
		//is is current spinner id ex #np7 #np15 where numeric value is cartid
		//console.log("id: "+id+" quantity : "+quantity);
		//console.log("quantity : "+quantity +" is a "+ typeof quantity);
		
		var temp=id.substr(2,id.length);
		var cartid=parseInt(temp);
		//console.log("cartid "+cartid);
		
		var unit_price=parseInt($('#unit'+cartid).html().trim());
		//console.log("unit_price : "+unit_price +" is a "+ typeof unit_price);
		
		var grand_total= parseInt($('#grand').html().trim());
		//console.log("grand : "+grand_total +" is a "+ typeof grand_total);
		
		$.ajax({
			url: "/changeQuantityInCart",
			method: "post",
			data:{
				quantity: quantity,
				cartid: cartid
			},
			success:function(res){
				
				//alert(res);
				if(res){
					$('#total'+cartid).html( unit_price*quantity );
					if(change=='inc') $('#grand').html( grand_total+unit_price );
					else $('#grand').html( grand_total-unit_price );
					
				}
				else{
					
					//alert("in false");
					$('#dialogue').dialogBox({
						hasMask: true,
						title: "error",
						type: 'error',
						hasClose: true,
						autoHide: true,
						time: 4000,
						content: "change failed. connection error!!"
					});
				}
			}
		});
		
		
	}
	function confirmOrder(){
		
		$.ajax({
			url: '/confirmOrder',
			method: 'post',
			data:{
				key:"nodata"
			},
			success: function(res){
				
				if(res){
					$('#dialogue').dialogBox({
						type: "correct",
						//effect: 'fall',
						hasMask: true,
						autoHide: true,
						time: 1200,
						content: "order confirmed",
						close: function(){
							console.log("closse");
						}
					});
					
					window.setTimeout(function(){
						window.location.href="/customer/showordered";
					},2200);
					
					
				}
				else{
					
					//alert("in false");
					$('#dialogue').dialogBox({
						hasMask: true,
						title: "error",
						type: 'error',
						autoHide: true,
						time: 4000,
						hasClose: true,
						content: "confirmation failed. connection error!!"
					});
				}
			}
			
		});
		
	}
	
	function loadData(){
		
		//alert("ajax running");
		$.ajax({
			url: "/getCartData",
			method: "post",
			data:{
				key: "nodata"
			},
			success:function(res){
				//alert("ajax success");
				//alert(ff);
				var grand_total=0;
				if(res.length>0)
				{
					var data='<table border="1" style="border-collapse: collapse;">';
							data+='<tr>'
									data+='<th style="width:500px">Item</th>';
									data+='<th style="width:200px">Unit price</th>';
									data+='<th style="width:200px">Qanatity</th>';
									data+='<th style="width:200px">Total</th>';
							data+='</tr>';
							
					for(var i=0;i<res.length;i++)
					{
						
						data+="<tr>";
							data+="<td style='align:left'>";
								data+="<div class='showproductShowcart'>";
									data+="<a href='/customer/showproduct/"+res[i].productid+"'>";
									data+="<div class='pictureShowcart'>";
										data+="<img src='/uploads/"+res[i].productid+".jpg' alt='picture' height='20' width='20'>"; 
									data+="</div>";
									data+="</a>";
									data+="<div class='infoShowcart' >";
										data+="<p>"+res[i].name+"</p>";
										data+="<button id='b"+res[i].id+"' class='button_action'>remove</button>	";	
									data+="</div>";
								data+="</div>";
							data+="</td>";
							data+="<th> <div id='unit"+res[i].id+"'>"+res[i].unit_price+"</div></th>";
							data+="<th> <div id='np"+res[i].id+"'></div></th>";
							data+="<th> <div id='total"+res[i].id+"'>"+res[i].total_price+"</div></th>";
						data+="</tr>";
						grand_total+=res[i].total_price;
						//console.log(i);
					}
					data+="<tr>";
							data+="<th colspan='2' ></th>";
							data+="<th>total amount</th>";
							data+="<th> <div id='grand'>"+grand_total+"</div></th>";
					data+="</tr>";
					data+="</table>";
					data+="<button id='confirm' class='button'>Confirm Order</button>"
					$('#cart').html(data);
					
					
					for(var i=0;i<res.length;i++)
					{
						//console.log("in np "+ res[i].id);
						dpUI.numberPicker("#np"+res[i].id, {
							start: res[i].quantity,
							min: 1,
							max: res[i].maxQuantity,
							step: 1,
							formatter: function(x){
								return " "+x;
							},
							afterIncrease()
							{
								changeQuantity(this.id,this.number,'inc');
							},
							afterDecrease()
							{
								changeQuantity(this.id,this.number,'dec');
							}
						});
					}
					$(".button_action").click(function(evnt) {
						
						var id=$(evnt.target).attr('id');
						
						delete_product(id);
					});
					$('#confirm').on('click',function(){
						confirmOrder();
					});

				}
				else
				{
					var data="<h1>cart empty</h1>";
					data+="<h2><a href='/customer'>continue shopping</a></h2>";
					$('#cart').html(data);
					
				}
			}
		});
		
		
	}
	
});
	