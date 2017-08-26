<?php namespace App;

use Auth;
use Log;

use App\Library\ChangelogModelBase;
use App\UpdateFromRequest;

class Category extends ChangelogModelBase {

	use updateFromRequest;

	protected $fillable = ['name', 'user_id', 'container_id'];

	protected $hidden = ['user_id', 'created_at', 'updated_at'];

	public function container() {
		return $this->belongsTo('App\Container');
	}

	public function items() {
		return $this->hasMany('App\Item');
	}
	//
	public static function getId($category) {
		$existing = Category::user()
				->where([
					['name', $category->name],
					['container_id', $category->container_id]
				   ])
                ->get();
        if (count($existing) == 0) {
        	$category->save();
        } else {
        	$category = $existing[0];
        }
        return $category->id;
	}

}
