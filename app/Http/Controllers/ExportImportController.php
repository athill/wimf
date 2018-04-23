<?php namespace App\Http\Controllers;

use Auth;
use Log;
use Response;
use Storage;
use Uuid;
use EventHomes\Api\FractalHelper;
use Illuminate\Http\Request;
use League\Fractal;
use Carbon\Carbon;

use App\Http\Controllers\Controller;
use App\Library\ExportTransformer;

use App\Category;
use App\Container;
use App\Item;
// use App\Library\Utils;

class ExportImportController extends Controller {

	const IMPORTER_FIELD = 'file';
	const JSON_FILE_EXPECTED_ERROR = 'Invalid import file. JSON file expected';
	const JSON_NO_DATA_KEY_ERROR = 'Invalid import file. JSON file must have a "data" key';
	const CONTAINER_REQUIRES_NAME_ERROR_TEMPLATE = 'Container %d requires a [name] key.';
	const CATEGORY_REQUIRES_NAME_ERROR_TEMPLATE = 'Category %d in container %d requires a [name] key.';
	const ITEM_REQUIRES_NAME_ERROR_TEMPLATE = 'Item %d in category %d in container %d requires a [name] key.';
	const SUCCESS_MESSAGE = 'File successfully imported';


	use FractalHelper;

	public function export() {
		$containers = Container::user()->orderBy('name', 'ASC')->with(['categories', 'categories.items'])->get();
		return $this->respondWithCollection($containers, new ExportTransformer);
		// $filename = preg_replace('/[@.]/', '', Auth::user()->email).'.json';

		// Storage::disk('local')->put($filename, json_encode($response->getData(), false));
		// $headers = [];
		// $download = storage_path('app/'.$filename);
		// // return response()->json(['filename' => $download]);
		// return response()->download($download, $filename, $headers);
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
				return $this->importErrorResponse('The file is invalid');
			}
		} else {
			return response()->json($request);
			return $this->importErrorResponse('A file is required');
		}
		
	}

	public function importContainers($data) {
		$user_id = Auth::user()->id;
		if (!is_array($data)) {
			return $this->importErrorResponse(self::JSON_FILE_EXPECTED_ERROR);
		}
		if (!isset($data['data'])) {
			return $this->importErrorResponse(self::JSON_NO_DATA_KEY_ERROR);
		}

		$user_id = Auth::user()->id;
		$user = Auth::user();
		foreach ($data['data'] as $ci => $container) {
			//// validate container
			if (!isset($container['name'])) {
				return $this->importErrorResponse(sprintf(self::CONTAINER_REQUIRES_NAME_ERROR_TEMPLATE, $ci));
			}
			//// find or insert container, get id
			$c = Container::firstOrCreate([
				'name' => $container['name'],
				'user_id' => $user_id
			]);
			if (isset($container['description'])) {
				$c->description = $container['description'];
				$c->save();
			}
			//// loop through categories
			if (isset($container['categories'])) {
				foreach ($container['categories'] as $cati => $category) {
					//// validate category
					if (!isset($category['name'])) {
						return $this->importErrorResponse(sprintf(self::CATEGORY_REQUIRES_NAME_ERROR_TEMPLATE, $cati, $ci));
					}
					$cat = Category::firstOrCreate([
						'name' => $category['name'],
						'container_id' => $c->id,
						'user_id' => $user_id
					]);
					//// loop through category items
					if (isset($category['items'])) {
						foreach ($category['items'] as $itemi => $item) {
							// validate item
							if (!isset($item['name'])) {
								return $this->importErrorResponse(sprintf(self::ITEM_REQUIRES_NAME_ERROR_TEMPLATE, $itemi, $cati, $ci));
							}
							// get item
							$i = Item::firstOrCreate([
								'name' => $item['name'],
								'category_id' => $cat->id,
								'user_id' => $user_id
							]);
							// update quantity
							if (isset($item['quantity'])) {
								$i->quantity = $item['quantity'];
							}
							//// update date
							if (isset($item['date'])) {
								$date = is_array($item['date']) ? $item['date']['date'] : $item['date']; 
								$i->date = ($date === '') ? '' :  Carbon::parse($date);
							}
							//// save
							$i->save();
						}
					}
				}				
			}
		}
		//// return success
		return view('app', ['messages' => [self::SUCCESS_MESSAGE]]);
	} 

	public function exportDemo(Request $request) {
		$containers = $request->get('data');
		foreach ($containers as $i => $container) {
			
			unset($containers[$i]['id']);
			if (isset($container['categories'])) {
				foreach ($container['categories'] as $j => $category) {
					unset($containers[$i]['categories'][$j]['id']);
					unset($containers[$i]['categories'][$j]['container_id']);
					if (isset($category['items'])) {
						foreach ($category['items'] as $k => $item) {
							unset($containers[$i]['categories'][$j]['items'][$k]['id']);
							unset($containers[$i]['categories'][$j]['items'][$k]['category_id']);
						}
					}
				}
			}
		}
		$filename = 'export-demo-'.Uuid::generate().'.json';
		Storage::disk('local')->put($filename, json_encode($containers, false));
		return ['filename' => $filename];
	}

	public function exportDemoDownload(Request $request) {
		return response()->download(storage_path('app/'.$request->filename), 'export.json', []);		
	}

	private function importErrorResponse($error) {
		return response()->json(['error' => $error ], 400);
	}

}