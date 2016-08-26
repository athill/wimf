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
		$item = $this->getRequestItem($request, $item);
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
		} catch (\PDOException $e) {
			//// duplicate item
			if (Utils::isDbIntegrityException($e)) {
				$errorMessage = 'Item "'.$item->name.'" already exists in category "'.$category->name.'".';
				if ($_ENV['APP_DEBUG'] === 'true') {
					$errorMessage = $e->getMessage();
				}
				Log::info($e->getMessage());
				return response()->json(['error'=>$errorMessage], 400);				
			} else {
				throw $e;
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
		// $category = Category::findOrFail($item->category_id);
		$item->delete();
		//// delete item
		//// delete category is empty?
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update(Request $request, $id) {
		$item = Item::findOrFail($id);
		$item = $this->getRequestItem($request, $item);

		//// category object
		$category = new Category();
		$category->name = $request->get('category');
		$category->container_id = $request->get('container_id');

		$item = Item::persist($item, $category)->toArray();
		$item['category'] = $category->name;
		return $item;

	}

	private function getRequestItem($request, $item) {
		$item->name = $request->get('name');
		$item->quantity = $request->get('quantity');
		$item->date = $request->get('date');
		return $item;		
	}	
}
