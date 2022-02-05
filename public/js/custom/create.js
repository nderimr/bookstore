$(document).ready(function(){
    	 
    	 //var $j = jQuery.noConflict();
    	 
 	}); /// end document.ready 
	
    $(function() {
                var $j = jQuery.noConflict();
				$j("#publishYearBegin").datepicker();
            });
     $(function() {
               var $j = jQuery.noConflict();
				$j("#publishYearEnd").datepicker();
            }); 

     
 		$("#publishYearBegin").change(function() {
  			date = new Date($("#publishYearBegin").val());
		  	$("#publishYearBegin").val(formatDate(date));
		});

 		$("#publishYearEnd").change(function() {
			//var dateFormat = require('dateformat'); 
  			date = new Date($("#publishYearEnd").val());
  			console.log($(this).val());
		  	$("#publishYearEnd").val(formatDate(date));
		});

	function createBook()
     {
     		let currentURL = $(location).attr('href');
         	pos = currentURL.lastIndexOf('/');
         	id_str = currentURL.substr(pos+1);
         	id = parseInt(id_str);
     	    bestseller = $('#bestseller').prop('checked')?1:0;
            beginDate = new Date($('#publishYearBegin').val());
            endDate = new Date($('#publishYearEnd').val());
            isRange = beginDate<endDate;
            
            if($('#publishYearBegin').val().length ==0)
            	isRange = "true";

         	$.ajax({
        	url: "../public/api/book/store",
        	async: true,
        	dataType: 'json',
        	type:'post',
	        	data:{
	        		"book":
	        		 {
		        		"id": id,	
			        	"name" : $('#bookName').val(),
			            "author":	$('#bookAuthor').val(),
			            "publish_year_begin": $('#publishYearBegin').val(),
			            "publish_year_end": $('#publishYearEnd').val(),
			            "bestseller": bestseller,
			            "isRange" : isRange 

			          }
	        	},
	        	success: function (data) {
		            window.location.href="./";  
				},
				error: function(error) {
					$( "#errors" ).html('');
					validation_errors = Object.getOwnPropertyNames(error.responseJSON.errors);
					  validation_errors.forEach((item,index)=>
					  {    
					  		$( "#errors" ).append( "<p>"+error.responseJSON.errors[item]+"</p>" );

					  });
				} //end error
			});///end ajax
             
		} ///end create book
    

 
 //format the date in YYYY-MM--DD
function formatDate(_date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    formatedDate = [year, month, day].join('-');
   return [year, month, day].join('-');
} //end format the date in YYYY-MM--DD



