$(document).ready(function(){
    	 var $j = jQuery.noConflict();
    	 let currentURL = $(location).attr('href');
         pos = currentURL.lastIndexOf('/');
         id_str = currentURL.substr(pos+1);
         id = parseInt(id_str);
        

		
        
        //getting the book from database  
         $.ajax({

        	url: "../api/displaybook/"+id,
        	async: true,
        	dataType: 'json',
        	type:'POST',
        	success: function (data) {
	            book = data; 
   	            $('#bookName').val(data.name);
	            $('#bookAuthor').val(data.author);
	            $('#publishYearBegin').val(data.publish_year_begin);
	            $('#publishYearEnd').val(data.publish_year_end);
	            if(data.bestseller==1)
	            {
	            	$('#bestseller').prop('checked', true);	
	            }	
            	else
            	{ 
            		$('#bestseller').prop('checked', false);	
            	}
         
            //console.log(data.name);   
			},
			error: function(data)
			{
 				alert('Something wetn wrong. Please contact the admin');
			}
		});//end $.ajax

  }); /// end document.ready 
	
    $(function() {
                var $j = jQuery.noConflict();
				$j("#publishYearBegin").datepicker();
            });
     $(function() {
               var $j = jQuery.noConflict();
				$j("#publishYearEnd").datepicker();
            }); 


	function updateBook()
     {
     	    beginDate = new Date($('#publishYearBegin').val());
            endDate = new Date($('#publishYearEnd').val());
            isRange = (beginDate<endDate);
            //if user provides empty begin date set isRange true;
            if($('#publishYearBegin').val().length ==0){
            	isRange = "true";
            }
     	    bestseller = $('#bestseller').prop('checked')?1:0;
         	$.ajax({
        	url: "../api/book/"+id,
        	async: true,
        	dataType: 'json',
        	type:'put',
	        	data:{
	        		"book":
	        		{
		        		"id": id,	
			        	"name" : $('#bookName').val(),
			            "author":	$('#bookAuthor').val(),
			            "publish_year_begin": $('#publishYearBegin').val(),
			            "publish_year_end": $('#publishYearEnd').val(),
			            "bestseller": bestseller,
			            "isRange": isRange 
			            
	        		 }
	        	},
	        	success: function (data) {
		         window.location.href="../";  
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
             
		} ///end update book
    

  //format the date in YYYY-MM--DD
 		$("#publishYearBegin").change(function() {
  			date = new Date($("#publishYearBegin").val());
		  	$("#publishYearBegin").val(formatDate(date));
		});

 		$("#publishYearEnd").change(function() {
			//var dateFormat = require('dateformat'); 
  			date = new Date($("#publishYearEnd").val());
  			console.log(date);
		  	$("#publishYearEnd").val(formatDate(date));
		});
 		
	
	function formatDate(date) {
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
	}//end format the date in YYYY-MM--DD


