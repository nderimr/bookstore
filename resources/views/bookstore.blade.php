@extends('layouts.master')
@section('content')
 
     <h1> Nderim's Bookstore </h1>
     <div >
     <div>
     <input type="button" value="Add new book" class="btn btn-secondary addNew" onclick="window.open('create')" >
     </div>
     <table class="table table-striped table-bordered">
        <tr>
                <th>title</th>
                <th>author</th>
                <th>publish year</th>
                <th class="centeraligned">bestseller</th>
                <th>Edit/Delete</th>
        </tr>
        <tbody id="books">
        </tbody>
     </table>
     <div id="pager">
        <ul id="pagination" class="pagination-sm"></ul>
    </div>
</div>

<script type="text/javascript" src="{{ URL::asset('js/custom/main.js') }}"></script>
    

@endsection