@extends('layouts.master')
@section('content')
<a href=".."> Home </a>
<h1>Edit the book</h1>
<div style="background-color: #f1f1f1; max-width:42%; padding-left: 20px;">
<form id="editBookFrm">
  <div class="form-group row">
    <label for="bookName" class="col-sm-6 col-form-label">Book name:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="bookName"  placeholder="ex MYSQL">
    </div>
  </div>
  <div class="form-group row">
    <label for="bookAuthor" class="col-sm-6 col-form-label">Book author: </label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="bookAuthor" placeholder="">
    </div>
  </div>

	<div class="form-group row">
	    <label for="publishYearBegin" class="col-sm-6 col-form-label">Publish year begin: </label>
	    <div class="col-sm-4">
	      <input type="text" class="form-control" name="publishYearBegin" id="publishYearBegin" placeholder="">
	    </div>
  	</div>
	  <div class="form-group row">
	    <label for="publishYearEnd" class="col-sm-6 col-form-label">Publish year end: </label>
	    <div class="col-sm-4">
	      <input type="text" class="form-control" id="publishYearEnd" name="publishYearEnd" placeholder="">
	    </div>
	  </div>

  	<div class="form-group row">
    	<label for="bestseller" class="col-sm-6 col-form-label">Is bestseller: </label>
    	<div class="col-sm-4">
      		<input type="checkbox" class="form-control" id="bestseller" placeholder="">
    	</div>
  	</div>

 	<div class="form-group row">
 		<div class="col-sm-6">
    	</div>
 		<div class="col-sm-4">
      		<input type="button" value="update" onclick = "updateBook()"  class="form-control" id="bestseller" >
    	</div>
 	</div>
</form>
<div class="notes">
 <p>If the book has publish date is  range use begin date and end date,  
 if the book has only one publish date use only the Publish Year end</p>
</div>
<div id="errors" class="invalidData" >

 </div>
</div>


	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
 	<!-- datepicker -->
	<link href = "https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css"
         rel = "stylesheet">
      <script src = "https://code.jquery.com/jquery-1.10.2.js"></script>
      <script src = "https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
      <!-- end datepicker -->
</body>
<script type="text/javascript" src="{{ URL::asset('js/custom/edit.js') }}"></script>

@endsection
