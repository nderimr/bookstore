<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Rules\CheckIsDateRange;


class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Book::orderBy('created_at','DESC')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('create');   
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
            // $this->validate($request, ['year' => new OlympicYear]);
           
           //return gettype($request->book['isRange']);
           
           $validator = $request->validate([
            'book.name' => 'required',
            'book.author' => 'required',
            'book.publish_year_begin'=>'nullable|date',
            'book.publish_year_end' =>'required|date',
            'book.isRange'=>[new CheckIsDateRange]
            ]);
                
          
          
          if($validator){
            $newBook = new Book;
            $newBook->name =$request->book['name'];
            $newBook->author = $request->book['author'];
            $newBook->publish_year_begin = $request->book['publish_year_begin'];
            $newBook->publish_year_end = $request->book['publish_year_end'];
            $newBook->bestseller = $request->book['bestseller'] ? 1:0;
            $newBook->save();
            
            return true;
         }
          else
          {
            return $validator->errors()->all();
          }    
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
         $book = Book::find($id);
        if($book)
            return $book;
        else {
           return 'false';
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Book $book)
    {
         $url = url()->current();
         $pos = strrpos(url()->current(),'/');
         $id_str = substr($url, $pos+1);
         $id = intval($id_str);   
         return view('edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $id)
    {

        $validator = $request->validate([
            'book.name' => 'required',
            'book.author' => 'required',
            'book.publish_year_begin'=>'nullable|date',
            'book.publish_year_end' =>'required|date',
            'book.isRange'=>[new CheckIsDateRange]
            ]);

        if($validator){
            $existingBook = Book::find($request->book['id']);
            if($existingBook)
            {
                 
                 $existingBook->name = $request->book['name'];
                 $existingBook->author = $request->book['author'];
                 $existingBook->publish_year_begin = $request->book['publish_year_begin'];
                 $existingBook->publish_year_end = $request->book['publish_year_end'];
                 $existingBook->bestseller = $request->book['bestseller'] ? 1:0;
                 
                // $existingBook->completed_at = $request->item['completed']? Carbon::now():null;
                 $existingBook->save();
                 /*$message->success= 'success';
                 $message->status = 'true';
                 return json_encode($message);*/
                 return true;
            } //end if($existing book)
            else{
                    return 'false';
                }
                return 'true';
            } 
            else
            {
                $validator->errors()->all();
            }

        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
        $existingBook = Book::find(intval($id));
        if($existingBook){
            $existingBook->delete();
            return 'true';
        }//end if(existingBook)
    }
}
