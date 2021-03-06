<?php namespace App;

use Auth;

use App\Library\ChangelogModelBase;
use App\Category;
use App\UpdateFromRequest;

class Item extends ChangelogModelBase {

	use UpdateFromRequest;

	protected $fillable = ['name', 'user_id', 'quantity',  'category_id', 'date'];

	protected $hidden = ['user_id', 'created_at', 'updated_at', 'category'];

	protected $dates = ['date'];

	public function category() {
		return $this->belongsTo('App\Category');
	}

	public function user() {
		$this->belongsTo('App\User');
	}


	public static function persist($item, $category) {
		try {
			$item->category_id = Category::getId($category);
			$item->save();
			return $item;
		} catch (Exception $e) {
			return ['error' => $e->message];
		}
	}
}
