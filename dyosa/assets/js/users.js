;(function ($) {
	
	$('.btnDelete').on('click', function(){
		var token = $(this).data('token');
		var ajaxUri = baseUrl + 'admin/ajaxDeleteUser';
		var dataString = {token: token}
		
		$.post(ajaxUri, dataString, function(res){
			if(res.result){
				alert('User Deleted');
				window.location = baseUrl + "admin/userlist";
			}
			else
				alert('Error deleting user');

		}, 'json');

	});


	$('#addUsers-form').on("submit", function()
	{
		
		var uName = $('#uname');
		var pWord = $('#pword');
		var cPWord = $('#cpword');
		var email = $('#email');


		if($('#uname').val() == '' || $('#pword').val()=='' || $('#cpword').val()=='' || $('#email').val()=='')
		{
				
			if(uName.val() == '')
			{
				$('#uname_container').addClass('has-error');
				$('#uname_error').text('Username is required');
			}
			else
			{
				$('#uname_container').removeClass('has-error');
				$('#uname_error').text('');
			}

			if(pWord.val()=='')
			{
				$('#pword_container').addClass('has-error');
				$('#pword_error').text('Password is required');
			}
			else
			{
				$('#pword_container').removeClass('has-error');
				$('#pword_error').text('');
			}

			if(cPWord.val()=='')
			{
				$('#cpword_container').addClass('has-error');
				$('#cpword_error').text('Password is required');
			}
			else
			{
				$('#cpword_container').removeClass('has-error');
				$('#cpword_error').text('');
			}

			if(email.val()=='')
			{
				$('#email_container').addClass('has-error');
				$('#email_error').text('Password is required');
			}
			else
			{
				$('#email_container').removeClass('has-error');
				$('#email_error').text('');
			}

		}
		
		else
		{
			if(pWord.val() == cPWord.val())
			{
				//Ajax Call
				var url = baseUrl + 'admin/ajaxAddUser';
				var datastring = { uname:uName.val(), pword:pWord.val(), email:email.val()}
				$.post(url, datastring, function(res)
				{
					if(res.result)
					{
						alert ('User sucessfully added!');
						window.location = baseUrl +  "admin/userlist";
					}
					else
					{
						//alert('Invalid Login Credentials');
						$('#alertbox').removeClass('hide');
						$('#alertbox').text('INVALID!!!');
					}
				}, 'json');
			}
			else
			{
				$('#alertbox').removeClass('hide');
				$('#alertbox').text('Passwords do not match!');
			}
		}


	});

	$('#editUsers-form').on("submit", function()
	{
		var userid = $('#userID');
		var userToken = $('#userToken');
		var uName = $('#uname');
		var email = $('#email');
		var status = $('#selectStatus');
		var lname = $('#lname');
		var mname = $('#mname');
		var fname = $('#fname');
		var bday = $('#bday');
		var gender = $('#genderStatus');
		var address = $('#address1');
		var adddress = $ ('address2');

		if($('#uname').val() == '' || $('#email').val()=='')
		{
				
			if(uName.val() == '')
			{
				$('#uname_container').addClass('has-error');
				$('#uname_error').text('Username is required');
			}
			else
			{
				$('#uname_container').removeClass('has-error');
				$('#uname_error').text('');
			}


			if(email.val()=='')
			{
				$('#email_container').addClass('has-error');
				$('#email_error').text('Password is required');
			}
			else
			{
				$('#email_container').removeClass('has-error');
				$('#email_error').text('');
			}

		}
		
		else
		{
				//Ajax Call

				var url = baseUrl + 'admin/ajaxEditUser';
				var datastring = { uname:uName.val(), email:email.val(), uID:userid.val(), 
								utoken:userToken.val(), status:status.val(), lname:lname.val(),
								fname:fname.val(), mname:mname.val(), bday:bday.val(), gender:gender.val()}
				$.post(url, datastring, function(res)
				{
					if(res.result)
					{
						alert ('User sucessfully updated!');
						window.location = baseUrl +  "admin/userlist";
					}
					else
					{
						//alert('Invalid Login Credentials');
						$('#alertbox').removeClass('hide');
						$('#alertbox').text('INVALID!!!');
					}
				}, 'json');
			
			
		}


	});
	

})(jQuery);