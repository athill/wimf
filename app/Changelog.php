<?php namespace App;

use Illuminate\Database\Eloquent\Model;

use Auth;

class Changelog extends Model {
	protected $fillable = ['table', 'user_id', 'before', 'after'];

	protected $table = 'changelog';

	// public function save() {
	// 	$this->user_id = Auth::user()->id;
	// 	parent::save();
	// }

	public static function add(Changelog $log, User $user=null) {
		if ($user == null) {
			$user = Auth::user()->id;
		}
		$log->user_id = $user;
		$log->save();
	}

	public function setUpdatedAtAttribute($value) {
    	// to Disable updated_at
	}
}
