<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Category extends Model {

	protected $fillable = ['name', 'user', 'container_id'];

	//
	public static function getId($category, $user=null) {
		if ($user == null) {
			$user = Auth::user()->email;
		}		
		$existing = Category::where('name', $category->name)
				->where('container_id', $category->container_id)
				->where('user', $user)
                ->get();
        if (count($existing) == 0) {
        	$category->save();
        } else {
        	$category = $existing[0];
        }
        return $category->id;

	}

}
