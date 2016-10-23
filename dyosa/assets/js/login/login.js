// JavaScript Document
;(function ($) {

	var login_UN	= $('input#username_id');
	var login_PW 	= $('input#password_id');
	var loginForm 	= $('#signin-form-id');
	
	var dashboard = baseUrl + 'admin/dashboard/';

	toastr.options = {
	    "closeButton": true,
	    "debug": false,
	    "newestOnTop": false,
	    "progressBar": true,
	    "positionClass": "toast-top-right",
	    "preventDuplicates": true,
	    "onclick": null,
	    "showDuration": "300",
	    "hideDuration": "1000",
	    "timeOut": "3000",
	    "extendedTimeOut": "1000",
	    "showEasing": "swing",
	    "hideEasing": "linear",
	    "showMethod": "fadeIn",
	    "hideMethod": "fadeOut"
	  }
	
	// this bit needs to be loaded on every page where an ajax POST may happen
    // $.ajaxSetup({
    //     data: {
    //         csrf_form_name: $.cookie('csrf_cookie_name')
    //     }
    // });

	loginForm.submit(function()	
	{
		// Validate fields
		if ( login_UN.val() == '' || login_PW.val() == '' )
		{	
			//reset all has-errors
			$('#un_container').removeClass('has-error');
			$('#pw_container').removeClass('has-error');

			if (login_UN.val() == '') 
			{ 
				login_UN.focus(); 
				$('#un_container').addClass('has-error');
			}
			
			if (login_PW.val() == '') 
			{
				login_PW.focus();
				$('#pw_container').addClass('has-error');
			}

		}
		else
		{			
			var actionPath = baseUrl + 'admin/ajaxProcessLogin';
			var dataString = { username:login_UN.val(), password:$.h.sha1(login_PW.val()), csrf_form_name: $.cookie('csrf_cookie_name') }

			$.post(actionPath, dataString, function(d){
				if(d.result){
					toastr.success('Redirecting to dashboard...', 'Success');
					setTimeout(function()
					{
						window.location = dashboard;
					}, 500);
				}
				else
				{
					toastr.error('Invalid login details found! Please try again.', 'Ooops!');
				}

			}, 'json');
			
		}
		
	
	});
	
	loginForm.find('input#username_id').focus();
	
	
})(jQuery);