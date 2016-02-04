<?php namespace App;

use Auth;
use Log;

use App\Library\ChangelogModelBase;



class Category extends ChangelogModelBase {

	protected $fillable = ['name', 'user_id', 'container_id'];

	protected $hidden = ['user_id'];

	//
	public static function getId($category) {
		$existing = Category::where('name', $category->name)
				->where('container_id', $category->container_id)
				->where('user_id', Auth::user()->id)
                ->get();
        if (count($existing) == 0) {
        	Log::info('saving category');
        	$category->save();
        } else {
        	$category = $existing[0];
        }
        return $category->id;

	}

}
