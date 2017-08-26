<?php
// namespace TestNamespace;

use Illuminate\Foundation\Testing\DatabaseTransactions;

use Carbon\Carbon;

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

	private $controller;
	private $faker;
	private $defaultContainerName;
	private $defaultCategoryName;
	private $defaultItemName;

	private $defaultContainers;


    public function setUp() {
    	parent::setUp();
        $this->be($this->defaultUser);
        $this->controller = new ExportImportController(); 
        //// random data
        $this->faker = Faker\Factory::create();
        $this->defaultContainerName = $this->faker->word;
        $this->defaultCategoryName = $this->faker->word;
    	$this->defaultItemName = $this->faker->word;
        $this->defaultDescription = $this->faker->sentence();
        
        //// base data
    	$this->defaultContainers = [ 
    		[ 'name' => $this->defaultContainerName, 
    		  'categories' => [ 
    		  	[ 'name' => $this->defaultCategoryName,
    		  	  'items' => [ [ 'name' => $this->defaultItemName ] ]
    		  	] 
    		  ]
    		] 
    	];                 
    }

    public function testBasicImport() {
    	//// update database
    	$result = $this->controller->importContainers($this->getData($this->defaultContainers));
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
	        'name' => $this->defaultCategoryName
	    ];
	    $category = $this->assertInDatabaseAndReturn(Category::class, 'categories', $category_criteria);
	    //// assert item
    	$item_criteria = [
	        'category_id' => $category->id, 
	        'user_id' => $this->defaultUser->id,
	        'name' => $this->defaultItemName
	    ];
	    $this->seeInDatabase('items', $item_criteria);
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
    	$container_index = 0;
    	unset($this->defaultContainers[$container_index]['name']);
    	$result = $this->controller->importContainers($this->getData($this->defaultContainers));
    	$this->assertEquals(sprintf(ExportImportController::CONTAINER_REQUIRES_NAME_ERROR_TEMPLATE, $container_index), $result->error);
    } 

    public function testImportContainersFailsOnCategoryWithoutNameKey() {
    	unset($this->defaultContainers[0]['categories'][0]['name']);
    	$errorMessage = sprintf(ExportImportController::CATEGORY_REQUIRES_NAME_ERROR_TEMPLATE, 0, 0);
    	$result = $this->controller->importContainers($this->getData($this->defaultContainers));
    	$this->assertEquals($errorMessage, $result->error);
    }

    public function testImportContainersFailsOnItemWithoutNameKey() {
    	unset($this->defaultContainers[0]['categories'][0]['items'][0]['name']);
    	$errorMessage = sprintf(ExportImportController::ITEM_REQUIRES_NAME_ERROR_TEMPLATE, 0, 0, 0);
    	$result = $this->controller->importContainers($this->getData($this->defaultContainers));
    	$this->assertEquals($errorMessage, $result->error);
    }   


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

