

$(document).ready(function(){
	
	//alert("ajax load");
	loadData();
	
	function cancel_order(p){
		
		//p is cancel button id. ex. #b0 #b1
		console.log(p);
		var value=p.substr(1,p.length);
		console.log(value);
		var id=parseInt(value);
	
		console.log(id);
		$.ajax({
			url: "/CancelOrder",
			method: "post",
			data:{
				key: id
			},
			success:function(res){
				if(res) 
				{
					$('#dialogue').dialogBox({
						type: 'correct',
						autoHide: true,
						time: 3000,
						content: "cancel request done"
					});
					$('#orderstatus'+id).html('requested for cancel order');
				}
				else 
				{
					$('#dialogue').dialogBox({
						title: "error",
						type: 'error',
						autoHide: true,
						time: 1400,
						content: "error connection"
					});
				}
			}
		});
	


		
	}
	
	function loadData(){
		
		//alert("ajax running");
		$.ajax({
			url: "/getOrderedData",
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
										data+="<div id='orderstatus"+res[i].id+"' style='color: gray;'>";
										
									if(res[i].status=='ordered')
									{		
										data+="<button id='b"+res[i].id+"' class='button_action'>Cancel Order</button>	";	
									}
									else if(res[i].status='accept')
									{
										data+="shipping under project";
										
										//data+="<button id='b"+res[i].id+"' class='button_action'>Cancel Order</button>	";
									}
									else
									{
										data+="requested for cancel order";
									}
										data+="</div>";
									data+="</div>";
								data+="</div>";
							data+="</td>";
							data+="<th> <div id='unit"+res[i].id+"'>"+res[i].unit_price+"</div></th>";
							data+="<th>"+res[i].quantity+"</th>";
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
					$('#ordered').html(data);
					
					
					
					$(".button_action").click(function(evnt) {
						
						var id=$(evnt.target).attr('id');
						console.log(id);
						//cancel_order(id);
						
						$('#dialogue').dialogBox({
							hasClose: true,
							hasBtn: true,
							hasMask: true,
							confirmValue: 'confirm',
							confirm: function(){
								cancel_order(id);
							},
							cancelValue: 'cancel',
							title: 'confirmation',
							content: 'cancel order'
						});
						
					});
					
				}
				else
				{
					var data="<h1>no order placed</h1>";
					data+="<h2><a href='/customer'>continue shopping</a></h2>";
					$('#ordered').html(data);
					
				}
			}
		});
		
		
	}
	
});
	