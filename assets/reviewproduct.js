

$(document).ready(function(){
	
	//alert('loaded');
	var pid=$('#pid').html().trim();;
	console.log(pid);
	var that = this;
	var toolitup = $("#jRate").jRate({
		rating: 1,
		strokeColor: 'black',
		precision: 1,
		minSelected: 1,
		onChange: function(rating) {
			//console.log("OnChange: Rating: "+rating);
		},
		onSet: function(rating) {
			console.log("OnSet: Rating: "+rating);
		}
	});
	
	$.ajax({
		url: "/getUserReview",
		method:"post",
		data:{
			key: pid
		},
		success:function(res){
			console.log('success :'+res.length  );
			toolitup.setRating(res[0].rating);	
			$('#review').html(res[0].comment);
		}
	});
	
	
	
	$('#save').on('click', function() {
		
		var rating=toolitup.getRating();
		var review=$('#review').val();
		//alert(review);
		$.ajax({
			url: "/reviewproduct",
			method:"post",
			data:{
				pid		: pid,
				rating	: rating,
				review	: review
			},
			success:function(res){
				if(res) 
				{
					//alert("done");
					window.location.href = "/customer/showproduct/"+pid;
				}
				else 
				{
					alert("error");
				}
			}
		});
	
	});
});
	