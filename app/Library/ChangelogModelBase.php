<?php namespace App\Library;

use Auth;
use Log;

use Illuminate\Database\Eloquent\Model;

use App\Changelog;
use App\Library\Utils;


class ChangelogModelBase extends Model {
	protected $user;

	private $updateMethods = [
		'save'
	];


	public function __construct(array $attributes=[]) {
		parent::__construct($attributes);
		//// set user
		$this->user = (Auth::check()) ? Auth::user()->id : -1;
		if ($this->user === -1) {
			Log::error('Unauthenticated user accessing changelog');
		}	    		
		//// callbacks to add user_id to model and changelog record
		$this->creating(function($model) {
    		$this->changelog([], $model);
		});

		$this->updating(function($model) {
	    	$changes = array();
		    foreach($model->getArrayableAttributes() as $key => $value) {
		        $changes[$key] = $model->getOriginal($key);
		    }
    		$this->changelog($model, $changes);
		});				
	}

	//// user scope
	public function scopeUser($query) {
		return $query->where('user_id', $this->user);
	}

	protected function changelog($model, $changes) {
		$this->user_id = $this->user;
	    $log = new Changelog();
	    $log->user_id = $this->user;
		$log->before = json_encode($model);
		$log->after = json_encode($changes);
		$log->table = $this->getTable();
		try {
			$log->save();	
		} catch (\PdoException $e) {
			//// hack for multiple calls for same event
			if (Utils::isDbIntegrityException($e)) {
				Log::error('ChangelogModelBase: Multiple calls for same event. '.json_encode($log));
			} else {
				throw $e;
			}
		}
	}
}