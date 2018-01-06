<?php
namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Faker\Factory;
use Illuminate\Http\Request;

use App\Http\Controllers\UserController;

class UserControllerTest extends TestCase {

	use DatabaseTransactions;

	private $faker;
	private $controller;

    public function setUp() {
        parent::setUp();
        $this->be($this->defaultUser);
        $this->faker = Factory::create();
        $this->controller = new UserController($this->defaultUser);
    }

    public function testRegister() {
    	$password = $this->faker->word;
    	$params = [
    		'name' => $this->faker->word,
    		'email' => $this->faker->email,
    		'password' => $password,
    		'password_confirmation' => $password
    	];
    	$request = new Request([], $params);
        $result = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|unique:users|max:255',
            'password' => 'required|max:60',
            'password_confirmation' => 'required|same:password|max:60',
        ]);
        dd($result);
    	$this->assertDatabaseMissing('users', [
    		'email' => $params['email']
    	]);
    	$this->controller->register($request);
    	$this->assertDatabaseHas('users', [
    		'email' => $params['email']
    	]);
    }

    public function testSetContainer() {
    	$containers = [$this->getFakeContainer(), $this->getFakeContainer()];
    	$selectId = $containers[0]->id;
    	$response = $this->controller->setContainer($selectId);
    	$this->assertEquals(['success' => 'Set container id to: '.$selectId], $response);
    	$this->assertDatabaseHas('users', [
    		'id' => $this->defaultUser->id,
    		'container_id' => $selectId
    	]);
    }

   public function testSetContainerFailsOnBadId() {
    	$containers = [];
    	$selectId = 100;
    	$response = $this->controller->setContainer($selectId);
    	$this->assertEquals(['error' => 'Invalid container id: '.$selectId], $response);
    	$this->assertDatabaseMissing('users', [
    		'id' => $this->defaultUser->id,
    		'container_id' => $selectId
    	]);    	
    }
}