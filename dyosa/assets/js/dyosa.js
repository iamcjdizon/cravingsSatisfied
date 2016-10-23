;(function ($) {
	
	 $(window).scroll(function() {
    var x = $(window).scrollTop();

    if (x >= 350) {
      $("#navs-head").addClass('navbar-fixed-top');
    }
    else
    {
      $("#navs-head").removeClass('navbar-fixed-top');
    }

  });

   $('#feedback-form').on("submit", function()
  {
    
    var name = $('#name');
    var comment = $('#comment');


    if($('#name').val() == '' || $('#comment').val()=='')
    {
        
      if(name.val() == '')
      {
        $('#name_container').addClass('has-error');
        $('#name_error').text('Name is required');
      }
      else
      {
        $('#name_container').removeClass('has-error');
        $('#name_error').text('');
      }

      if(comment.val()=='')
      {
        $('#comment_container').addClass('has-error');
        $('#comment_error').text('Comment is required');
      }
      else
      {
        $('#comment_container').removeClass('has-error');
        $('#comment_error').text('');
      }

    }
    
    else
    {
      
        //Ajax Call
        var url = base_Url +'dyosas/ajaxAddComment';
        var datastring = { name:name.val(), comment:comment.val()}
        
        $.post(url, datastring, function(res)
        {
          if(res.result)
          {
            alert ('Comment successfully submtted!');
            window.location = base_Url +  "dyosas/#contact";
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