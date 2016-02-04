<?php namespace App;

use App\Library\ChangelogModelBase;

use Auth;

class Container extends ChangelogModelBase {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'user_id'];

	// /**
	//  * The attributes excluded from the model's JSON form.
	//  *
	//  * @var array
	//  */
	protected $hidden = ['user_id'];	


	public static function getUser() {
		$result = Container::where('user_id', Auth::user()->id)->orderBy('name', 'ASC')->get();
		return $result;		
	}	




}
