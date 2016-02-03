<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;

use App\Category;

class Item extends Model {

	protected $fillable = ['name', 'user_id', 'category', 'quantity', 'measurement', 'category_id'];

	//
	public static function add($item, $category, $user=null) {
		if ($user == null) {
			$user = Auth::user()->id;
		}
		$item->user_id = $user;
		$category->user_id = $user;
		$item->category_id = Category::getId($category);
		$item->save();
		return $item;
	}	

}
