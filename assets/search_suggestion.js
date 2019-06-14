

$(document).ready(function(){
	
	// console.log('loaded');
	
	// $('#search_textbox').keyup(function(){
		
		// var key=$('#search_textbox').val().trim();
		
		// var path=(window.location.pathname).split('/');
		// //console.log(path);
		
		// console.log(window.location.pathname);
		// console.log("my target: "+path[path.length-1]);
		// console.log(path.length);
		
		// if(path[path.length-1]!='search' || path[path.length-2]!='search') 
		// {
			// console.log("moving to target");
			// window.location.href='/customer/search/'+key;
		// }
	// });
	// $('#search_textbox').focus();
	
	
	// console.log("focused");
	
	$("#search_textbox").blur(function(){
	
		//alert('blur');
		$('#search_suggestion').css('display','none');
			 
	}); 
	
	$('#search_textbox').keyup(function(){
		//console.log('key changed : ');
		var key=$('#search_textbox').val();
		//window.location.href = "/customer/search/"+key;
		$.ajax({
			url: "/getSearchData",
			method:"post",
			data:{
				key:$('#search_textbox').val().trim()
			},
			success:function(res){
				//console.log(res.length);
				var value="";
				for(var i=0;i<res.length && i<6;i++)
				{
					value+='<a onmouseover="mousehover(this)" href="/customer/search?search_textbox='+res[i].name+'&searchsubmit=Search">'+res[i].name+'</a>';
					//value+='<a  href="/customer">'+res[i].name+'</a>';
					
				}
				$('#search_suggestion').html(value);
				$('#search_suggestion').css('display','block');
			}
		});
	});
	
});
	