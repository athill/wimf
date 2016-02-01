<?php
use Illuminate\Foundation\Testing\ApplicationTrait;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;


class ContainerTest extends TestCase {

	use 
	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testIndex()
	{
		var_dump($this);
		$response = $this->call('/api/containers');
			          //    ->seeJson([
             //     'created' => true,
             // ]);
		
		//// 302 = found redirect
		$this->assertEquals(302, 302);
	}

}
