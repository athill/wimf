<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Faker\Factory;

use App\Container;

class ContainerTest extends TestCase {

	use DatabaseTransactions;

    private $faker;

    function __construct() {

        $this->faker = Faker\Factory::create();
    }


    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testGetContainers() {
        $user = factory(App\User::class)->create();

        //// verify json
        $this->actingAs($user)
        	 ->get('/api/containers')
			 ->seeJsonStructure([
                '*' => ['id', 'name', 'description']
             ]);
        //// verify freezer added to db
        $this->seeInDatabase('containers', [
        	'user_id' => $user->id,
        	'name' => 'Freezer'
        ]);
    }

    public function testNameExistsIsTrueIfNameExists() {
        $user = factory(App\User::class)->create();
        $container1 = $this->getFakeContainer($user->id);
        $this->assertTrue(Container::nameExists($container1->name));

    }

    public function testNameExistsIsFalseIfNameDoesNotExists() {
        $name = $this->faker->word;
        //// TODO: verify and delete if name exists
        $this->assertFalse(Container::nameExists($name));
    }

}