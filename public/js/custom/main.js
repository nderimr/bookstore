        var $pagination = $('#pagination'),
        totalRecords = 0,
        records = [],
        displayRecords = [],
        recPerPage = 10,
        page = 1,
        totalPages = 0;
        var deleted_ids = [];
        
        
        
        $(document).ready(function(){
     		getAllBooks(); 
        }); ///end document.ready 
        
        //get all the books from database 
        function getAllBooks(){ 
        $.ajax({
        url: "api/books",
        async: true,
        dataType: 'json',
        success: function (data) {
            records = data;
            totalRecords = records.length;
            totalPages = Math.ceil(totalRecords / recPerPage);
            apply_pagination(); 
            }
        }); 
        }

        function createCheckbox(id,value)
        {
            checkbox = $(document.createElement('input')).prop({
            id: 'myCheckBox'+id,
            checked: value,
            type: 'checkbox',
            disabled: true,
            class: "form-control"
            });
            return checkbox;
        }

            
        function createEditBookBtn(id){
           	var $btnEdit = $('<input type="button" value="Edit"  class="btn btn-secondary button"  onclick=location.href="editBook/'+id+'" />');
            return $btnEdit;
        }

        function createDeleteBookBtn(id,tr_id){
            var $btnDelete = $('<input type="button" value="Delete" class="btn btn-danger button"  onclick="deleteBook('+id+','+tr_id+')" />');
            return $btnDelete;
        }


        function generate_table() 
        {
            var tr;
            
            $('#books').html('');
            for (var i = 0; i < displayRecords.length; i++) 
            {   
                tr = $('<tr/>');
                tr.prop("id","tr_id_"+i);
                tr.append('<td>'+displayRecords[i].name+'</td>');
                tr.append('<td>'+displayRecords[i].author+'</td>');
                tr.append('<td>'+displayRecords[i].publish_year_begin+' '+displayRecords[i].publish_year_end+'</td>');
                chb_td = $('<td/>');
                chb_td.append(createCheckbox(displayRecords[i].id,displayRecords[i].bestseller));
                tr.append(chb_td)
                editDelBtn_td = $('<td/>')
                editDelBtn_td.append(createEditBookBtn(displayRecords[i].id));
                console.log("testing");
                editDelBtn_td.append(createDeleteBookBtn(displayRecords[i].id,i));

                tr.append(editDelBtn_td);
  
                $('#books').append(tr);
            
            }//end for 
        }//end Geneerate Table 
        
        function apply_pagination() {
        $pagination.twbsPagination({
            totalPages: totalPages,
            visiblePages: 6,
            onPageClick: function (event, page) {
                
                displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
                endRec = (displayRecordsIndex) + recPerPage;
                displayRecords = records.slice(displayRecordsIndex, endRec);
                generate_table();
            }
        });
        }// end apply_pagination

   

    
    
      function deleteBook(id,tr_id)
        {
           let delete_book = ConfirmDelete();
           
           if(delete_book!=true)
           {
              return;
           }
            
            $.ajax({
            url: "api/book/"+id,
            async: true,
            dataType: 'json',
            type:'delete',
            success: function (data) {
              getAllBooks();
               $("#tr_id_"+tr_id).remove();
               //get all books
               deleted_ids.push(tr_id);
                for(i=0;i<deleted_ids.length; i++)
                console.log(deleted_ids[i]);
            }
                
            });///end ajax call 
         
        } ///end delete book 

        function ConfirmDelete()
        {
            return confirm("Are you sure you want to delete selected book?");
        }//end ConfirmDelete



