<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Http\Middleware\Authenticate;


class AuthControllerTest extends TestCase {
	protected $guard;

    public function setUp() {
        $this->guard = Mockery::mock('Illuminate\Contracts\Auth\Guard');
    }	
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }
}
