<?php

class ExampleTest extends TestCase {

	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testBasicExample()
	{
		$response = $this->call('GET', '/');
		//// 302 = found redirect
		$this->assertEquals(302, $response->getStatusCode());
	}

}
