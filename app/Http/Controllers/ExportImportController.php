<?php namespace App\Http\Controllers;

use Log;
use Response;
use EventHomes\Api\FractalHelper;
use Illuminate\Http\Request;
use League\Fractal;

use App\Http\Controllers\Controller;
use App\Library\ExportTransformer;

// use App\Category;
use App\Container;
// use App\Item;
// use App\Library\Utils;

class ExportImportController extends Controller {

	use FractalHelper;

	public function export() {
		$containers = Container::user()->orderBy('name', 'ASC')->with(['categories', 'categories.items'])->get();
		// $resource = new Fractal\Resource\Collection($containers, new ExportTransformer);
		$resource = $this->respondWithCollection($containers, new ExportTransformer);
		// dd($resource);
		return $resource;
	}

}