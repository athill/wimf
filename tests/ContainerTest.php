<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Faker\Factory;

use App\Container;

class ContainerTest extends TestCase {

	use DatabaseTransactions;

    private $faker;

    // function __construct() {
        

        
    // }


    public function setUp() {
        parent::setUp();
        $this->faker = Faker\Factory::create();
        $this->be($this->fakeUser);
    }

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testGetContainers() {
        // $user = factory(App\User::class)->create();

        //// verify json
        $this->get('/api/containers')
			 ->seeJsonStructure([
                '*' => ['id', 'name', 'description']
             ]);
        //// verify freezer added to db
        $this->seeInDatabase('containers', [
        	'user_id' => $this->fakeUser->id,
        	'name' => 'Freezer'
        ]);
    }

    // public function testGetContainer() {
    //     $container = $this->defaultContainer;
    //     $cat1 = $this->getFakeCategory($container->id);
    //     $cat2 = $this->getFakeCategory($container->id);
    //     $item1 = $this->getFakeItem($cat1->id);
    //     $item2 = $this->getFakeItem($cat1->id);
    //     $item3 = $this->getFakeItem($cat2->id);
    //     $request = $this->actingAs($this->defaultUser)
    //                 ->get(self::CONTAINERS_URL.'/'.$container->id);
    // }
    

    public function testNameExistsIsTrueIfNameExists() {
        $container1 = $this->getFakeContainer($this->fakeUser->id);
        $this->assertTrue(Container::nameExists($container1->name));

    }

    public function testNameExistsIsFalseIfNameDoesNotExists() {
        
        $name = $this->faker->word;
        // $container1 = $this->getFakeContainer($this->fakeUser->id);
        // $this->assertNotEquals($name, $container1->name);
        //// TODO: verify and delete if name exists
        $this->assertFalse(Container::nameExists($name));
    }

}