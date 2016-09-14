<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Faker\Factory;

use App\Container;

class ContainerTest extends TestCase {

	use DatabaseTransactions;

    private $faker;


    public function setUp() {
        parent::setUp();
        $this->faker = Faker\Factory::create();
        $this->be($this->defaultUser);       
    }

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testGetContainers() {
        //// verify json
        $this->get('/api/containers')
			 ->seeJsonStructure([
                '*' => ['id', 'name', 'description']
             ]);
        //// verify freezer added to db
        $this->seeInDatabase('containers', [
        	'user_id' => $this->defaultUser->id,
        	'name' => 'Freezer'
        ]);
    }

    // public function testGetContainer() {
    //     $container = $this->getFakeContainer();
    //     $cat1 = $this->getFakeCategory($container->id);
    //     $cat2 = $this->getFakeCategory($container->id);
    //     $item1 = $this->getFakeItem($cat1->id);
    //     $item2 = $this->getFakeItem($cat1->id);
    //     $item3 = $this->getFakeItem($cat2->id);
    //     $request = $this->actingAs($this->defaultUser)
    //                 ->get(self::CONTAINERS_URL.'/'.$container->id);
    // }
    

    public function testNameExistsIsTrueIfNameExists() {
        $container = $this->getFakeContainer();
        $this->assertTrue(Container::nameExists($container->name));

    }

    public function testNameExistsIsFalseIfNameDoesNotExists() {
        $container = $this->getFakeContainer();
        $name = $this->faker->word;
        $this->assertNotEquals($name, $container->name);
        //// TODO: verify and delete if name exists
        $this->assertFalse(Container::nameExists($name));
    }

}