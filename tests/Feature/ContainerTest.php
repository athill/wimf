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
        //// verify json
        $response = $this->json('get', self::CONTAINERS_PATH)
		  ->assertJson([
                'containers' => ['*' => ['id', 'name', 'description']]
                'selected'
             ]);
        //// verify freezer added to db
        $response->seeInDatabase('containers', [
        	'user_id' => $this->defaultUser->id,
        	'name' => 'Freezer'
        ]);
    }

    // /**
    //  * Verify getting a container
    //  *
    //  * @return void
    //  */
    // public function testGetContainer() {
    //     $container = $this->getFakeContainer();
    //     $categoryArgs = [
    //         'container_id' => $container->id
    //     ];
    //     $cat1 = $this->getFakeCategory($categoryArgs);
    //     $cat2 = $this->getFakeCategory($categoryArgs);
    //     $item1 = $this->getFakeItem($cat1->id);
    //     $item2 = $this->getFakeItem($cat1->id);
    //     $item3 = $this->getFakeItem($cat2->id);
    //     $this->get(self::CONTAINERS_PATH.'/'.$container->id);
    //     // $json = self::getResponseContentAsJson($this->response);
    //     $json = $this->getResponseContentAsJson();
    //     $this->seeJsonStructure([
    //         'name', 
    //         'id', 
    //         'categories' => [
    //             '*' => [
    //                 'name',
    //                 'items' => [
    //                     '*' => [
    //                         'id', 'name', 'quantity', 'comment', 'category_id', 'date', 'category'
    //                     ]
    //                 ]
    //             ]
    //         ]
            
    //     ]);
    // }

    // public function testPostContainer() {
    //     $this->post(self::CONTAINERS_PATH, $this->defaultParams);
    //     $json = $this->getResponseContentAsJson();
    //     $this->seeJson(self::mapSeeJson($this->defaultParams));
    //     $this->seeInDatabase('containers', $this->defaultParams);

    // }

    // public function testPutContainer() {
    //     $this->post(self::CONTAINERS_PATH, $this->defaultParams);
    //     $json = $this->getResponseContentAsJson();
    //     $newName = $this->faker->word;
    //     $updateParams = [
    //         'name' => $newName
    //     ];
    //     $this->putContainer($json['id'], $updateParams);
    //     $this->seeJson(self::mapSeeJson($updateParams));

    //     $this->seeInDatabase('containers', [
    //         'id' => $json['id'],
    //         'name' => $newName,
    //         'user_id' => $this->defaultUser->id
    //     ]);
    // } 

    // public function testPutInvalidContainerId() {
    //     $id = $this->faker->word;
    //     $this->putContainer($id, []);
    //     $this->seeJson(['_error' => 'Invalid id: '.$id]);
    // } 

    // public function testPutContainerDuplicateName() {
    //     $container1 = $this->getFakeContainer();
    //     $container2 = $this->getFakeContainer();
    //     $this->putContainer($container1->id, ['name' => $container2->name])
    //         ->seeJsonStructure(['_error']);
    // }

    // public function testDeleteContainer() {
    //     $container = $this->getFakeContainer();
    //     $criteria = [
    //         'name' => $container->name,
    //         'user_id' => $this->defaultUser->id
    //     ];

    //     $this->seeInDatabase('containers', $criteria);        
    //     $this->delete(self::CONTAINERS_PATH.'/'.$container->id);        
    //     $this->notSeeInDatabase('containers', $criteria);
    // }

    // public function testDeleteNonExistingContainer() {
    //     $this->delete(self::CONTAINERS_PATH.'/'.$this->faker->word);
    //     $this->assertEquals('', $this->response->getContent());
    // }

    // //// model tests
    // public function testNameExistsIsTrueIfNameExists() {
    //     $container = $this->getFakeContainer();
    //     $this->assertTrue(Container::nameExists($container->name));

    // }

    // public function testNameExistsIsFalseIfNameDoesNotExists() {
    //     $container = $this->getFakeContainer();
    //     $name = $this->faker->word;
    //     $this->assertNotEquals($name, $container->name);
    //     //// TODO: verify and delete if name exists
    //     $this->assertFalse(Container::nameExists($name));
    // }

    // private function putContainer($id, $args) {
    //     return $this->put(self::CONTAINERS_PATH.'/'.$id, $args);
    // }

}