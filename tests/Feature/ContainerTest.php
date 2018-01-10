<?php
namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Faker\Factory;

use App\Container;

class ContainerTest extends TestCase {

	use DatabaseTransactions;

    private $faker;

    private $defaultContainerName;
    private $defaultDescription;


    public function setUp() {
        parent::setUp();
        $this->be($this->defaultUser);
        $this->faker = Factory::create();
        $this->defaultContainerName = $this->faker->word;
        $this->defaultDescription = $this->faker->sentence();
        // $this->be($this->defaultUser);
        $this->defaultParams = [
            'name'=>$this->defaultContainerName,
            'description' => $this->defaultDescription,
        ];               
    }

    /**
     * Verify getting list of containers for a user
     *
     * @return void
     */
    public function testGetContainers() {
        $this->json('get', self::CONTAINERS_PATH)
            //// verify json
		    ->assertJsonStructure([
                'containers',
                'selected'
             ]);
        //// verify freezer added to db
        $this->assertDatabaseHas('containers', [
        	'user_id' => $this->defaultUser->id,
        	'name' => 'Freezer'
        ]);
    }

    /**
     * Verify getting a container
     *
     * @return void
     */
    public function testGetContainer() {
        $container = $this->getFakeContainer();
        $categoryArgs = [
            'container_id' => $container->id
        ];
        $cat1 = $this->getFakeCategory($categoryArgs);
        $cat2 = $this->getFakeCategory($categoryArgs);
        $item1 = $this->getFakeItem($cat1->id);
        $item2 = $this->getFakeItem($cat1->id);
        $item3 = $this->getFakeItem($cat2->id);
        $response = $this->get(self::CONTAINERS_PATH.'/'.$container->id);
        $response->assertJsonStructure([
            'name', 
            'id', 
            'categories' => [
                '*' => [
                    'name',
                    'items' => [
                        '*' => [
                            'id', 'name', 'quantity', 'comment', 'category_id', 'date', 'category'
                        ]
                    ]
                ]
            ]
            
        ]);
    }

    public function testPostContainer() {
        $response = $this->json('POST', self::CONTAINERS_PATH, $this->defaultParams);
        // $json = $this->getResponseContentAsJson();
        $response->assertJsonStructure(['name', 'description']);
        $this->assertDatabaseHas('containers', $this->defaultParams);

    }

    public function testPutContainer() {
        $response = $this->post(self::CONTAINERS_PATH, $this->defaultParams);
        $json = $this->getResponseContentAsJson($response);
        $newName = $this->faker->word;
        $updateParams = [
            'name' => $newName
        ];
        $this->putContainer($json['id'], $updateParams)
            ->assertJson($updateParams);

        $this->assertDatabaseHas('containers', [
            'id' => $json['id'],
            'name' => $newName,
            'user_id' => $this->defaultUser->id
        ]);
    } 

    public function testPutInvalidContainerId() {
        $id = $this->faker->word;
        $this->putContainer($id, [])
            ->assertJson(['_error' => 'Invalid id: '.$id]);
    } 

    public function testPutContainerDuplicateName() {
        $container1 = $this->getFakeContainer();
        $container2 = $this->getFakeContainer();
        $this->putContainer($container1->id, ['name' => $container2->name])
            ->assertJsonStructure(['_error']);
    }

    public function testDeleteContainer() {
        $container = $this->getFakeContainer();
        $criteria = [
            'name' => $container->name,
            'user_id' => $this->defaultUser->id
        ];

        $this->assertDatabaseHas('containers', $criteria);        
        $this->delete(self::CONTAINERS_PATH.'/'.$container->id);        
        $this->assertDatabaseMissing('containers', $criteria);
    }

    public function testDeleteNonExistingContainer() {
        $response = $this->delete(self::CONTAINERS_PATH.'/'.$this->faker->word);
        $this->assertEquals('', $response->getContent());
    }

    //// model tests
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

    private function putContainer($id, $args) {
        return $this->json('PUT', self::CONTAINERS_PATH.'/'.$id, $args);
    }

}