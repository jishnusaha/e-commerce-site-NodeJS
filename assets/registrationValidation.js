'use strict'

$(document).ready(function(){
	
	//alert('loaded');
	
	
	//$('#datetextinput').datepicker();
	
	
	
	$("#submit").attr("disabled",true);
	
	var emailvalid=false,passwordvalid=false,cpasswordvalid=false;
	var namevalid=false,gendervalid=true,contactnovalid=true,datevalid=true;
	
	function check_submit()
	{
		if(emailvalid && passwordvalid && cpasswordvalid && namevalid && gendervalid && contactnovalid && datevalid)
		{
			$("#submit").attr("disabled",false);
		}
		else
		{
			$("#submit").attr("disabled",true);
		}
	}
	
	//alert("ready");
	$('#nametextinput').keyup(function(){
		
		namevalid=false;
		check_submit();
		
		var name=$('#nametextinput').val().trim();
		if(name.length==0) 
		{
			$('#namenotice').html("<font color='red'>name can't be empty</font>");
			//document.getElementById('nametextinput').select();
			return;
		}
		var character=true;
		for(var i=0;i<name.length;i++)
		{
			if( !( (name[i]>='a' && name[i]<='z') || (name[i]>='A' && name[i]<='Z') || name[i]=='.' || name[i]=='-' || name[i]==' ') )
			{
				character=false;
				break;
			}
		}
		if(character!=true)
		{
			$('#namenotice').html("<font color='red'>name can only have letters,dot(.),dash(-)</font>");
			return;
		}
		else
		{
			
			if(name.split(' ').length<2)
			{
				$('#namenotice').html("<font color='red'>name at least 2 word</font>");
				return;
			}
		}
		namevalid=true;
		$('#namenotice').html("");
		check_submit();
	});
	
	$("#emailtextinput").keyup( function(){
		
		emailvalid=false;
		check_submit();
		
		var email=$("#emailtextinput").val().trim();
		if(email.length==0)
		{
			$("#emailnotice").html("<font color='red'>email can't be empty</font>");
			return;
		}
		var atfound=0;
		for (var i = 0; i < email.length;i++)
		{
			if(email[i]==' ')
			{
				$("#emailnotice").html("<font color='red'>email can't have space</font>");
				return;
			}
			if(email[i]=='@') 
			{
				atfound=i;
				break;
			}
		}
		if(atfound==0)
		{
			$("#emailnotice").html("<font color='red'>invalid email</font>");
			return;
		}
		var dotfound=0;
		if(atfound+3<email.length )
		{
			for (var i = atfound+1; i < email.length; i++)
			{
				if(email[i]=='.')
				{
					dotfound=i;
					break;
				}
			}
			if(dotfound==0)
			{
				$("#emailnotice").html("<font color='red'>email invalid</font>");
				return;
			}
			if(!(atfound+1<dotfound  && dotfound+1<email.length) )
			{
				$("#emailnotice").html("<font color='red'>email invalid</font>");
				return;
			}
		}
		else 
		{
			$("#emailnotice").html("<font color='red'>email invalid</font>");
			return;
		}
		
		$("#emailnotice").html("");
		emailvalid=true;
		check_submit();
	});
	
	function validate_pass()
	{
		
		passwordvalid=false;
		check_submit();
		
		var pass=$('#passwordtextinput').val();
		//alert(pass.length);
		if(pass.length==0) 
		{
			$('#passwordnotice').html("<font color='red'>password can't be empty</font>");
			
			//document.getElementById('passwordtextinput').select();
			return;
		}
		if(pass.length<3)
		{
			$('#passwordnotice').html("<font color='red'>password at least 3 character</font>");
			return;
		}
		$('#passwordnotice').html("");
		passwordvalid=true;
		check_submit();
	}
	
	
	$("#passwordtextinput").keyup(function(){
		validate_pass();
	});
	
	$('#cpasswordtextinput').keyup(function(){
		
		if(passwordvalid==false)
		{
			//$('#passwordnotice').html("here");
			validate_pass();
		}
		
		if(passwordvalid==true)
		{
			var pass=$('#passwordtextinput').val();
			var cpassword=$('#cpasswordtextinput').val();
			
			cpasswordvalid=false;
			check_submit();
		
			if(pass!=cpassword)
			{
				$('#cpasswordnotice').html("<font color='red'>not matched</font>");
				return;
			}
			//$('#cpasswordnotice').html("<font color='green'>matched</font>");
			$('#cpasswordnotice').html("");
			
			cpasswordvalid=true;
			check_submit();
		}
	});
	
	$('#contactnotextinput').keyup(function(){
		
		contactnovalid=false
		check_submit();
		
		var contactno=$('#contactnotextinput').val().trim();
		if(contactno.length==0)
		{
			$('#contactnonotice').html("<font color='red'>contactno can't be empty</font>");
			return;
		}
		
		if(contactno[0]!='0' || contactno[1]!='1')
		{
			$('#contactnonotice').html("<font color='red'>invalid contactno</font>");
			return;
		}
		for(var i=2;i<contactno.length;i++)
		{
			if( contactno[i]<'0' || contactno[i]>'9' )
			{
				$('#contactnonotice').html("<font color='red'>contactno only numeric</font>");
				return;
			}
		}
		if(contactno.length!=11)
		{
			$('#contactnonotice').html("<font color='red'>contactno is 11 digits</font>");
			return;
		}
		$('#contactnonotice').html("");
		contactnovalid=true;
		check_submit();
	});
	
	$('#datetextinput').change(function(){
				
		datevalid=false;
		check_submit();
		
		var date=$('#datetextinput').val().trim().split('/');
		
		if(date.length!=3)
		{
			$('#datenotice').html("<font color='red'>invalid date</font>");
			return;
		}
		
		var month=parseInt(date[0]),day=parseInt(date[1]),year=parseInt(date[2]);
		
		var d = new Date();
		var cYear = d.getFullYear(),cMonth =d.getMonth()+1,cday = d.getDate();
		//alert('current : '+cday+"/"+cMonth+"/"+cYear);
		//alert('inout : '+day+"/"+month+"/"+year);
		
		if(year>=1900 && year <=cYear && month<=cMonth && month>0 && day>0 && day<=31)
		{
			//alert('here1 '+month);
			if(month==cMonth )
			{
				//alert('here2');
				if(day<cday)
				{
					datevalid=true;
					$('#datenotice').html("");
					check_submit();
					return;
				}
			}
			else if(month==2 && day<29)
			{
				datevalid=true;
					$('#datenotice').html("");
					check_submit();
					return;
			}
			else if(month==2 && day==29)
			{
				//alert('here3');
				if(year%100==0) 
				{
					if(year%400==0)
					{
						datevalid=true;
						$('#datenotice').html("");
						check_submit();
						return;
					}
				}
				else if(year%4==0)
				{
					datevalid=true;
					$('#datenotice').html("");
					check_submit();
					return;
				}	
			}
			else
			{
				datevalid=true;
				$('#datenotice').html("");
				check_submit();
				return;
			}
		}
		$('#datenotice').html("<font color='red'>invalid date</font>");
	});
	
	$('#genderinput').change(function(){
		
		gendervalid=true;
		check_submit();
		//alert($('#genderinput:checked').val());
		
	});
});