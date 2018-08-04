<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;



class HealthController extends Controller
{
    public function index() {
    	$db = true;
    	try {
    		DB::raw('SELECT 1');
    	} catch (\Exception $error) {
    		$db = false;
    		Log::alert('Database error on ' . config('app.url'). ': ' . $error->getMessage());
    	}
    	return [
    		'web' => true,
    		'db' => $db
    	];
    }
}
