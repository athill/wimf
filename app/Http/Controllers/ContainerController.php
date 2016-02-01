<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use Response;

use App\Category;
use App\Container;
use App\Item;

class ContainerController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index() {
		$containers = Container::all();
		if (count($containers) === 0) {
			Container::add('Freezer');
			$containers = Container::all();
		}
		return Response::json($containers);;
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$container = Container::findOrFail($id);
		$data = [
			'name' => $container->name
		];
		
		$cats = [];
		$categories = Category::where('container_id', $id)->orderBy('name')->get();
		foreach ($categories as $category) {		
			$cats[] = [
				'name' => $category->name,
				'items' => Item::where('category_id', $category->id)->orderBy('name')->get()
			];
		}
        $data['categories'] = $cats;
		return $data;

	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
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
