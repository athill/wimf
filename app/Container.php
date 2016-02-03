<?php namespace App;

use Illuminate\Database\Eloquent\Model;

use Auth;

class Container extends Model {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'containers';

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

	function __construct() {
		// $this->user = Auth::id();
	}

	public static function add($name, $user=null) {
		if ($user == null) {
			$user = Auth::user()->id;
		}
		$container = new Container();
		$container->user_id = $user;
		$container->name = $name;
		$container->save();
	}





	public static function all($user=null) {
		if ($user == null) {
			$user = Auth::user()->id;
		}
		$result = Container::where('user_id', $user)->orderBy('name', 'ASC')->get();
		return $result;		
	}	




}
