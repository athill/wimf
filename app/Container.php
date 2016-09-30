<?php namespace App;


use Illuminate\Http\Request;

use App\Library\ChangelogModelBase;
use App\UpdateFromRequest;


class Container extends ChangelogModelBase {

	use updateFromRequest;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'user_id', 'description'];

	// /**
	//  * The attributes excluded from the model's JSON form.
	//  *
	//  * @var array
	//  */
	protected $hidden = ['user_id', 'created_at', 'updated_at'];

	public function categories() {
		return $this->hasMany('App\Category');
	}	

	public static function nameExists($name) {
		$result = Container::user()->where('name', $name)->first();
		return $result !== null;
	}

	public static function getUser() {
		$result = Container::user()->orderBy('name', 'ASC')->get();
		return $result;		
	}	
}
