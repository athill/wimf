<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

use App\Container;
use App\Library\Utils;

class UtilsTest extends TestCase {

	use DatabaseTransactions;

    public function testMapObjectFromRequest() {
        $this->markTestSkipped(
          'Just a place to hold the previous implentation of UpdateFromRequest() until it\'s complete.'
        );
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    // public function testMapObjectFromRequest() {
    // 	$mapValue = 'foo';
    // 	$arrayValue = 'bar';

    //   $map = ['objArg' => 'reqArg', 'arg2'];

    // 	$request = new FakeRequest(['reqArg' => $mapValue, 'arg2' => $arrayValue]);
    // 	$object = new FakeObject();


    // 	Utils::mapObjectFromRequest($map, $object, $request);


    //   $this->assertEquals($object->objArg, $mapValue);
    //   $this->assertEquals($object->arg2, $arrayValue);
    // }

}

// class FakeObject {
//   private $objArg;
//   private $arg2;

// 	public function __construct($map=[]) {
// 		foreach ($map as $key => $value) {
// 			$this->{$key} = $value;
// 		}
// 	}  


//   public function __get($property) {
//     if (property_exists($this, $property)) {
//       return $this->$property;
//     }
//   }

//   public function __set($property, $value) {
//     if (property_exists($this, $property)) {
//       $this->$property = $value;
//     }

//     return $this;
//   }	
// }

// class FakeRequest {
// 	private $map;

// 	public function __construct($map) {
// 		foreach ($map as $key => $value) {
// 			$this->map[$key] = $value;
// 		}
// 	}
// 	public function get($key) {
// 		return $this->map[$key];
// 	}
// }
