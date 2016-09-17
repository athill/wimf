<?php namespace App\Library;

use Log;

class Utils {
	public static function isDbIntegrityException($exception) {
		return strpos($exception->getMessage(), 'SQLSTATE[23000]: Integrity constraint violation') !== false;
	}

	public static function handleDbIntegrityException($exception, $message) {
		if ($_ENV['APP_DEBUG'] === 'true') {
			$message = $exception->getMessage();
		}
		Log::info($exception->getMessage());
		return response()->json(['error'=>$message], 400);
	}
}