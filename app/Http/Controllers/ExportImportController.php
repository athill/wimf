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

	const IMPORTER_FIELD = 'importer';

	use FractalHelper;

	public function export() {
		$containers = Container::user()->orderBy('name', 'ASC')->with(['categories', 'categories.items'])->get();
		return $this->respondWithCollection($containers, new ExportTransformer);
	}

	public function importForm() {
		return view('import');
	}

	public function import(Request $request) {
		// dd($request->allFiles());
		if ($request->hasFile('importer') && $request->file('importer')->isValid()) {
			// $data = $request->file('importer');
			// dd($data);
			$data = (file_get_contents($request->file('importer')->getRealPath()));
			dd($request->file('importer'));
		}
		
	}

}