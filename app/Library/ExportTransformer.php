<?php namespace App\Library;

use League\Fractal;

use App\Container;
use Log;




class ExportTransformer extends Fractal\TransformerAbstract {
	public function transform(Container $container) {
		return [
			'name' => $container['name'],
			'description' => $container['description'],
			'categories' => collect($container['categories'])->map(function ($category) {
    			return [
    				'name' => $category['name'],
					'items' => collect($category['items'])->map(function ($item) {
		    			return [
		    				'name' => $item['name'], 
		    				'quantity' => $item['quantity'], 
		    				'date' => $item['date']
		    			];
		    		})
    			];
			})
		];
	}	
}