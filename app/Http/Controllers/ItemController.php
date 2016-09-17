<?php namespace App\Http\Controllers;

use Log;
use Illuminate\Http\Request;
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
	public function store(Request $request) {
		// Item object
		$item = new Item();
		$item->updateFromRequest($request);
		$item->comment = '';

		//// category object
		$category = new Category();
		$category->name = $request->get('category');
		$category->container_id = $request->get('container_id');

		//// save
		try {
			$item = Item::persist($item, $category);
			$item = $item->toArray();
			$item['category'] = $category->name;
			return $item;
		} catch (\Illuminate\Database\QueryException $exception) {
			//// duplicate item
			if (Utils::isDbIntegrityException($exception)) {
				$errorMessage = 'Item "'.$item->name.'" already exists in category "'.$category->name.'".';
				return Utils::handleDbIntegrityException($exception, $errorMessage);
			} else {
				throw $exception;
			}
		}
	}

			/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id) {
		$item = Item::findOrFail($id);
		$item->delete();
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update(Request $request, $id) {
		$item = Item::findOrFail($id);
		$item->updateFromRequest($request);

		//// category object
		$category = new Category();
		$category->name = $request->get('category');

		$category->container_id = $request->get('container_id');

		$item = Item::persist($item, $category)->toArray();
		$item['category'] = $category->name;
		return $item;

	}
}
