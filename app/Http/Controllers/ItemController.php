<?php namespace App\Http\Controllers;

use JWTAuth;
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
		$item->comment = '';
		$item->updateFromRequest($request);
		
		//// category object
		$category = $this->getCategoryFromRequest($request);

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
		$item = Item::find($id);
		if (is_null($item)) {
			return Utils::handleInvalidId($id);
		}		
		$item->updateFromRequest($request);
		//// category object
		$category = $this->getCategoryFromRequest($request);

		try {
			$item = Item::persist($item, $category)->toArray();
			$item['category'] = $category->name;
			return $item;			
		} catch (Exception $exception) {
			dd($exception);
			return ['error' => $exception->message ];
		}


	}

	private static function getCategoryFromRequest(Request $request) {
		return Category::firstOrNew([
			'name' => $request->get('category'),
			'container_id' => $request->get('container_id'),
			'user_id' => JWTAuth::toUser($request->token)->id
		]);
	}
}
