<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;

use App\Category;

class Item extends Model {

	protected $fillable = ['name', 'user', 'category', 'quantity', 'measurement', 'category_id'];

	//
	public static function add($item, $category, $user=null) {
		if ($user == null) {
			$user = Auth::user()->email;
		}
		$item->user = $user;
		$category->user = $user;
		$item->category_id = Category::getId($category);
		$item->save();
		return $item;
	}	

}
