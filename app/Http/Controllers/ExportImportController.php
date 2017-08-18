<?php namespace App\Http\Controllers;

use Auth;
use Log;
use Response;
use Storage;
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
	const JSON_FILE_EXPECTED_ERROR = 'Invalid import file. JSON file expected';
	const JSON_NO_DATA_KEY_ERROR = 'Invalid import file. JSON file must have a "data" key';
	const CONTAINER_REQUIRES_NAME_ERROR_TEMPLATE = 'Container %d requires a [name] key.';


	use FractalHelper;

	public function export() {
		$containers = Container::user()->orderBy('name', 'ASC')->with(['categories', 'categories.items'])->get();
		$response = $this->respondWithCollection($containers, new ExportTransformer);
		$filename = preg_replace('/[@.]/', '', Auth::user()->email).'.json';
		Storage::disk('local')->put($filename, json_encode($response->getData(), false));
		$headers = [];
		return response()->download(storage_path('app/'.$filename), $filename, $headers);
	}

	public function importForm() {
		return view('import');
	}

	public function import(Request $request) {
		// $this->validate($request, [
		// 	self::IMPORTER_FIELD:  
		// ]);
		if ($request->hasFile(self::IMPORTER_FIELD)) {
			if ($request->file(self::IMPORTER_FIELD)->isValid()) {
				$contents = file_get_contents($request->file(self::IMPORTER_FIELD)->getRealPath());
				$data = json_decode($contents, true);
				return $this->importContainers($data);
			} else {
				return view('import', ['error', 'A file is required']);
			}
		} else {
			return view('import', ['error', 'A file is required']);
		}
		
	}

	public function importContainers($data) {
		if (!is_array($data)) {
			return $this->importErrorView(self::JSON_FILE_EXPECTED_ERROR);
		}
		if (!isset($data['data'])) {
			return $this->importErrorView(self::JSON_NO_DATA_KEY_ERROR);
		}

		$user_id = Auth::user()->id;
		foreach ($data['data'] as $ci => $container) {
			//// validate container
			if (!isset($container['name'])) {
				return $this->importErrorView(sprintf(self::CONTAINER_REQUIRES_NAME_ERROR_TEMPLATE, $ci));
			}
			//// find or insert container, get id
			$first = Container::user()->where('name', $container['name'])->first();
			$container_id = null;
			if ($first) {
				$container_id = $first->id;
			} else {
				$c = new Container();
				$c->updateFromArray($container);
				$c->user_id = $user_id;
				$c->save();
				$container_id = $c->id;
			}
			
		
		// 	//// loop through categories, get ccategory name
		// 	//// loop through items
		}		
	} 

	private function importErrorView($error) {
		return view('import', ['error' => $error ]);
	}

}