<?php namespace App\Http\Controllers;

use Log;
use Response;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

use App\Category;
use App\Container;
use App\Item;
use App\Library\Utils;

class ContainerController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index() {
		$containers = Container::getUser();
		if (count($containers) === 0) {
			$container = new Container();
			$container->name = 'Freezer';
			$container->save();
			$containers = Container::getUser();
		}
		return Response::json($containers);
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
			'name' => $container->name,
			'id' => $id
		];
		
		$cats = [];
		$categories = Container::find($id)->categories()->orderBy('name')->get();
		foreach ($categories as $category) {		
			$items = $category->items;
			//// add category name to returned item
			foreach ($items as $i => $item) {
				$itemArray = $item->toArray();
				$itemArray['category'] = $item->category->name;
				$items[$i] = $itemArray;
			}
			$cats[] = [
				'name' => $category->name,
				'items' => $items
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
	public function store(Request $request) {
		$container = new Container();
		$container->updateFromRequest($request);
		if (Container::nameExists($container->name)) {
			$errorMessage = 'Container "'.$container->name.'" already exists.';
			return response()->json(['error'=>$errorMessage], 400);
		}
		try {
			$container->save();
		} catch (\PDOException $e) {
			Log::info($e->getMessage());
			return response()->json(['error'=>$e->getMessage()], 400);
		} 
		return $container;
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
	public function update($id, Request $request) {
		$container = Container::find($id);
		if (is_null($container)) {
			return Utils::handleInvalidId($id);
		}
		$container->updateFromRequest($request);
		try {
			$container->save();
		} catch (\Illuminate\Database\QueryException $exception) {
			if (Utils::isDbIntegrityException($exception)) {
				$errorMessage = 'Container "'.$container->name.'" already exists.';
				return Utils::handleDbIntegrityException($exception, $errorMessage);
			} else {
				throw $exception;
			}
		}
		return $container;
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id) {
		$container = Container::find($id);
		if (!is_null($container)) {
			$container->delete();	
		}
	}

}
