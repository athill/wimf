<?php namespace App\Http\Controllers;

use Auth;
use Log;
use Response;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

use App\Category;
use App\Container;
use App\Item;
use App\Library\Utils;
use App\User;

class ContainerController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index() {
		$containers = Container::getUser();
		$user = Auth::user();
		if (count($containers) === 0) {
			$container = new Container();
			$container->name = 'Freezer';
			$container->save();
			$user->container_id = $container->id;
			$user->save();	
			$containers = Container::getUser();
		}
		$selected = $user->container_id;
		if (is_null($selected)) {
			$selected = $containers->get(0)->id;
		}
		return ['containers' => $containers, 'selected' => $selected];
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id) {
		$container = null;
		try {
			$container = Container::findOrFail($id);	
		} catch(Illuminate\Database\Eloquent\ModelNotFoundException $e) {
			return ['error' => $e->getMessage()];
			Log::debug('Bad container id: ' . $id);
		}
		
		$data = [
			'name' => $container->name,
			'description' => $container->description,
			'id' => $id
		];

		//// update selected category
		$user = Auth::user();
		$user->container_id = $id;
		$user->save();	
		
		$cats = [];
		$items = $container->categories()->orderBy('categories.name')->join('items', 'categories.id', '=', 'items.category_id' )->orderBy('items.name')->select('items.*', 'categories.name AS category')->get();
		$categories = [];
		$category = null;
		$category_items = [];
		foreach ($items as $item) {
			if ($item->category !== $category) {
				if (count($category_items)) {
					$categories[] = [
						'name' => $category,
						'items' => $category_items
					];
				}
				$category = $item->category;
				$category_items = [];				
				
			}
			$category_items[] = $item;
		}
		if (count($category_items)) {
			$categories[] = [
				'name' => $category,
				'items' => $category_items
			];
		}		
        $data['categories'] = $categories;
		return $data;
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request) {
		$container = new Container();
		$container->updateFromRequest($request);
		try {
			$container->save();
			return $container;
		} catch (\Illuminate\Database\QueryException $exception) {
			//// duplicate item
			if (Utils::isDbIntegrityException($exception)) {
				$errorMessage = 'Container "'.$container->name.'" already exists.';
				return Utils::handleDbIntegrityException($exception, $errorMessage);
			} else {
				throw $exception;
			}
		}
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
