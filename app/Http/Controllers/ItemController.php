<?php namespace App\Http\Controllers;

use Log;
use Request;
use Response;

use App\Http\Controllers\Controller;

use App\Category;
use App\Item;
use App\Library\Utils;



class ItemController extends Controller {

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store() {
		// Item object
		$item = new Item();
		$item->name = Request::get('item');
		$item->quantity = Request::get('quantity');
		$item->measurement = Request::get('measurement');
		$item->comment = '';

		//// category object
		$category = new Category();
		$category->name = Request::get('category');
		$category->container_id = Request::get('container_id');

		//// save
		try {
			return Item::add($item, $category);
		} catch (\PDOException $e) {
			//// duplicate item
			if (Utils::isDbIntegrityException($e)) {
				$errorMessage = 'Item "'.$item->name.'" already exists in category "'.$category->name.'".';
				Log::info($e->getMessage());
				return Response::json(['error'=>$errorMessage], 400);				
			} else {
				throw $e;
			}
		}
	}	

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create() {
		//
		
	}



	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
