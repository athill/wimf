<?php namespace App\Library;

use Log;

class Utils {
	public static function isDbIntegrityException($exception) {
		return strpos($exception->getMessage(), 'SQLSTATE[23000]: Integrity constraint violation') !== false;
	}

	public static function handleDbIntegrityException($exception, $message) {
		if (config('app.debug')) {
			$message = $exception->getMessage();
		}
		Log::info($exception->getMessage());
		return response()->json(['_error'=>$message], 400);
	}

	public static function handleInvalidId($id) {
		return response()->json(['_error' => 'Invalid id: '.$id], 400);
	}
}