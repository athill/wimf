<?php namespace App;

use Auth;

use App\Library\ChangelogModelBase;
use App\Category;

class Item extends ChangelogModelBase {

	protected $fillable = ['name', 'user_id', 'quantity', 'measurement', 'category_id'];

	protected $hidden = ['user_id', 'created_at', 'updated_at', 'category'];

	public function category() {
		return $this->belongsTo('App\Category');
	}

	public function user() {
		$this->belongsTo('App\User');
	}


	public static function persist($item, $category) {
		$item->category_id = Category::getId($category);
		$item->save();
		return $item;
	}
}
