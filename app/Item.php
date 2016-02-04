<?php namespace App;

use Auth;

use App\Library\ChangelogModelBase;
use App\Category;

class Item extends ChangelogModelBase {

	protected $fillable = ['name', 'user_id', 'category', 'quantity', 'measurement', 'category_id'];

	protected $hidden = ['user_id'];

	public static function add($item, $category) {
		$item->category_id = Category::getId($category);
		$item->save();
		return $item;
	}	

}
