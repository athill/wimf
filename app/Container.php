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
	protected $fillable = ['name', 'user'];

	// /**
	//  * The attributes excluded from the model's JSON form.
	//  *
	//  * @var array
	//  */
	protected $hidden = ['user'];	

	function __construct() {
		// $this->user = Auth::id();
	}

	public static function add($name, $user=null) {
		if ($user == null) {
			$user = Auth::user()->email;
		}
		$container = new Container();
		$container->user = $user;
		$container->name = $name;
		$container->save();
	}





	public static function all($user=null) {
		if ($user == null) {
			$user = Auth::user()->email;
		}
		$result = Container::where('user', $user)->orderBy('name', 'ASC')->get();
		return $result;		
	}	




}
