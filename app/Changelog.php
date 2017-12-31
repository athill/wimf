<?php namespace App;

use Illuminate\Database\Eloquent\Model;

use Auth;

class Changelog extends Model {
	protected $fillable = ['table', 'user_id', 'before', 'after'];

	protected $table = 'changelog';

	public function setUpdatedAtAttribute($value) {
    	// to Disable updated_at
	}
}
