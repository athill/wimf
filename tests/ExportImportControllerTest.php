<?php
// namespace TestNamespace;

use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Http\Controllers\ExportImportController;
use App\Container;
use App\Category;
use App\Item;
use App\User;

class FakeUser {
	public $id;
}

class FakeQuery {

}

class ExportImportControllerTest extends TestCase {

	use DatabaseTransactions;

	private $controller ;



    public function setUp() {
    	parent::setUp();
        $this->be($this->defaultUser);
        $this->faker = Faker\Factory::create();
        $this->defaultContainerName = $this->faker->word;
        $this->defaultDescription = $this->faker->sentence();
        $this->controller = new ExportImportController();          
    }

    public function testImportContainersFailsOnNonArray() {
    	$result = $this->controller->importContainers(null);
    	$this->assertEquals(ExportImportController::JSON_FILE_EXPECTED_ERROR, $result->error);
    }

    public function testImportContainersFailsOnArrayWithoutDataKey() {
    	$result = $this->controller->importContainers([]);
    	$this->assertEquals(ExportImportController::JSON_NO_DATA_KEY_ERROR, $result->error);
    } 

    public function testImportContainersFailsOnContainerWithoutNameKey() {
    	$this->mockAuth();
    	$containers = [[]];
    	$result = $this->controller->importContainers($this->getData($containers));
    	$this->assertEquals(sprintf(ExportImportController::CONTAINER_REQUIRES_NAME_ERROR_TEMPLATE, 0), $result->error);
    } 

    public function testImportContainersSucceedsWithContainerWithNameKey() {
    	$containers = [ [ 'name' => $this->defaultContainerName, 'categories' => [] ] ];
    	$result = $this->controller->importContainers($this->getData($containers));  	
	    $this->seeInDatabase('containers', [
	        'name' => $this->defaultContainerName, 
	        'user_id' => $this->defaultUser->id
	    ]);
    }     

    public function testImportContainersFailsOnCategoryWithoutNameKey() {
    	$containers = [ 
    		[ 'name' => $this->defaultContainerName, 
    		  'categories' => [ [] ] 
    		 ] 
    	];
    	$errorMessage = sprintf(ExportImportController::CATEGORY_REQUIRES_NAME_ERROR_TEMPLATE, 0, 0);
    	$result = $this->controller->importContainers($this->getData($containers));
    	$this->assertEquals($errorMessage, $result->error);
    }

    public function testImportContainersSucceedsOnCategoryWithNameKey() {
    	$category_name = $this->faker->word;
    	$containers = [ 
    		[ 'name' => $this->defaultContainerName, 
    		  'categories' => [ 
    		  	[ 'name' => $category_name ] 
    		  ]
    		] 
    	];
    	$result = $this->controller->importContainers($this->getData($containers));
    	
    	//// assert container
    	$criteria = [
	        'name' => $this->defaultContainerName, 
	        'user_id' => $this->defaultUser->id
	    ];
	    $container = $this->assertInDatabaseAndReturn(Container::class, 'containers', $criteria);
	    //// assert category
    	$category_criteria = [
	        'container_id' => $container->id, 
	        'user_id' => $this->defaultUser->id,
	        'name' => $category_name
	    ];	    
	    $this->seeInDatabase('categories', $category_criteria);
    }    


    public function assertInDatabaseAndReturn($modelClass, $table, $criteria) {
    	//// see in the database
    	$this->seeInDatabase($table, $criteria);

    	//// build args array
    	$args = collect(array_keys($criteria))->map(function($key, $i) use ($criteria) {
    		// echo "$key\n";
    		return [$key, '=', $criteria[$key]];
    	})->toArray();
    	
    	//// build eloquent query; in 5.4, you can pass an array and avoid all this
    	$result = call_user_func_array([$modelClass, 'where'], $args[0]);
    	if (count($args) > 1) {
    		for ($i = 1; $i < count($args); $i++) {
    			call_user_func_array([$result, 'where'], $args[$i]);
    		}	
    	}
    	return $result->firstOrFail();
    }

    // public function testImportContainersMergesContainersWithExistingNameKey() {
    // 	$containers = [ [ 'name' => $this->defaultContainerName, 'categories' => [{ 'name'=>'foo' }] ] ];
    // 	$result = $this->controller->importContainers($this->getData($containers));
	   //  $this->seeInDatabase('containers', [
	   //      'name' => $this->defaultContainerName, 
	   //      'user_id' => $this->defaultUser->id
	   //  ]);    	
    // }



    private function mockAuth() {
    	Auth::shouldReceive('check')->andReturn(true);
    	Auth::shouldReceive('user')->andReturn(Mockery::mock('FakeUser'))->set('id', 0);    	
    }

    private function getData(array $containers) {
    	return [
    		'data' => $containers
    	];
    }

}

