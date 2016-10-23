// JavaScript Document
;(function ($) {

    var dtURL = baseUrl + "students/ajaxListAllStudents";

    var plist = $('#patient-list').dataTable( {
        "bProcessing"       : true,
        "bPaginate"         : true,
        "bSort"             : true,
        //"sPaginationType"   : "full_numbers",
        "iDisplayLength"    : 10,
        "bFilter"           : true,
        "bLengthChange"     : false,
        "oLanguage"         : 
        {
            "sLengthMenu"   : "_MENU_ records per page",
            "sProcessing"   : "Loading..."
        },
        "bServerSide"       : true,
        "sAjaxSource"       : dtURL,
        "aaSorting"         : [[ 1, "desc" ]],
        "aoColumns"         : [
                               {"mData":"id","sWidth":"15%"},
                               {"mData":"title_desc","sWidth":"25%",
                                "mRender": function(data, type, full) 
                                           {
                                               return data.replace(/\\/g, '');
                                           }},                              
                                {"mData":"patient_lname","sWidth":"40%","bSortable":true,
                                "mRender": function(data, type, full) 
                                           {
                                               lname = full.patient_lname.replace(/\\/g, '');
                                               fname = full.patient_fname.replace(/\\/g, '');
                                               return lname + ', ' + fname;
                                           }},    
                               {"mData":"id", "sWidth":"20%",
                                "mRender": function(data, type, full) 
                                           {
                                              return '<div align="center"><button type="button" class="btn btn-default btn-sm edit-btn" data-toggle="tooltip" data-placement="left" title="Edit Patient Record" relid="' + data + '" tokenid="' + full.patient_token + '"><span class="glyphicon glyphicon-pencil"></span></button></div>';
                                           },
                                "bSortable":false}]

    } );

})(jQuery);