<?php namespace App\Library;

class Utils {
	public static function isDbIntegrityException($exception) {
		return strpos($exception->getMessage(), 'SQLSTATE[23000]: Integrity constraint violation') !== false;
	}
}