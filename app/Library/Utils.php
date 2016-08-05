<?php namespace App\Library;

class Utils {
	public static function isDbIntegrityException($exception) {
		return strpos($exception->getMessage(), 'SQLSTATE[23000]: Integrity constraint violation') !== false;
	}

	public static function mapObjectFromRequest($map, $object, $request) {
		foreach ($map as $key => $val) {
			if (is_numeric($key)) {
				$object->{$val} = $request->get($val);
			} else {
				$object->{$key} = $request->get($val);
			}
		}
		//// probably redundant, as $object is probably passed by reference
		return $object;
	}
}