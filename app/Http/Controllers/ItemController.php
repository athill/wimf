<?php namespace App\Http\Controllers;
use Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Item;
use App\Category;



class ItemController extends Controller {

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
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
		// return Request::all();
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
		return Item::add($item, $category);

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
