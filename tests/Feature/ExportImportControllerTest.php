<?php
namespace Tests\Unit;

use Tests\TestCase;

use Illuminate\Foundation\Testing\DatabaseTransactions;

use Carbon\Carbon;

use Faker\Factory;

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

	const HOME_VIEW_NAME = 'home';
	const IMPORT_VIEW_NAME = 'import';

	private $controller;
	private $faker;
	private $defaultContainerName;
	private $defaultCategoryName;
	private $defaultItemName;
    private $defaultUser;

	private $defaultContainers;


    public function setUp(): void {
    	parent::setUp();
        $this->defaultUser = $this->getDefaultUser();
        $this->be($this->defaultUser);
        $this->controller = new ExportImportController(); 
        //// random data
        $this->faker = Factory::create();
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
    	$view = $this->controller->importContainers($this->getData($this->defaultContainers));
    	// $this->assertEquals(self::HOME_VIEW_NAME, $view->getName());
    	$this->assertEquals([ExportImportController::SUCCESS_MESSAGE], $view->messages);
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
	    $this->assertDatabaseHas('items', $item_criteria);
    }     

    // public function testImportContainersFailsOnNonArray() {
    // 	$view = $this->controller->importContainers(null);
    // 	$this->assertEquals(ExportImportController::JSON_FILE_EXPECTED_ERROR, $view->error);
    // 	// $this->assertEquals(self::IMPORT_VIEW_NAME, $view->getName());
    // }

    // public function testImportContainersFailsOnArrayWithoutDataKey() {
    // 	$view = $this->controller->importContainers([]);
    // 	$this->assertEquals(ExportImportController::JSON_NO_DATA_KEY_ERROR, $view->error);
    // 	// $this->assertEquals(self::IMPORT_VIEW_NAME, $view->getName());
    // } 

    // public function testImportContainersFailsOnContainerWithoutNameKey() {
    // 	$this->mockAuth();
    // 	$container_index = 0;
    // 	unset($this->defaultContainers[$container_index]['name']);
    // 	$view = $this->controller->importContainers($this->getData($this->defaultContainers));
    // 	$this->assertEquals(sprintf(ExportImportController::CONTAINER_REQUIRES_NAME_ERROR_TEMPLATE, $container_index), $view->error);
    // 	$this->assertEquals(self::IMPORT_VIEW_NAME, $view->getName());
    // } 

    // public function testImportContainersFailsOnCategoryWithoutNameKey() {
    // 	unset($this->defaultContainers[0]['categories'][0]['name']);
    // 	$errorMessage = sprintf(ExportImportController::CATEGORY_REQUIRES_NAME_ERROR_TEMPLATE, 0, 0);
    // 	$view = $this->controller->importContainers($this->getData($this->defaultContainers));
    // 	$this->assertEquals($errorMessage, $view->error);
    // 	$this->assertEquals(self::IMPORT_VIEW_NAME, $view->getName());
    // }

    // public function testImportContainersFailsOnItemWithoutNameKey() {
    // 	unset($this->defaultContainers[0]['categories'][0]['items'][0]['name']);
    // 	$errorMessage = sprintf(ExportImportController::ITEM_REQUIRES_NAME_ERROR_TEMPLATE, 0, 0, 0);
    // 	$view = $this->controller->importContainers($this->getData($this->defaultContainers));
    // 	$this->assertEquals($errorMessage, $view->error);
    // 	$this->assertEquals(self::IMPORT_VIEW_NAME, $view->getName());
    // }  

    // public function testImportContainersIsIdempotent() {
    // 	$view = $this->controller->importContainers($this->getData($this->defaultContainers));
    // 	$this->assertEquals(self::HOME_VIEW_NAME, $view->getName());
    // 	$this->assertEquals([ExportImportController::SUCCESS_MESSAGE], $view->messages);
    // 	$view = $this->controller->importContainers($this->getData($this->defaultContainers));
    // 	$this->assertEquals(self::HOME_VIEW_NAME, $view->getName());
    // 	$this->assertEquals([ExportImportController::SUCCESS_MESSAGE], $view->messages);	
    // } 

    // public function testImportExportMergesCategoriesInContainers() {
    // 	$view = $this->controller->importContainers($this->getData($this->defaultContainers));
    // 	$newCategoryName = $this->faker->word;
    // 	$this->defaultContainers[0]['categories'][0]['name'] = $newCategoryName;
    // 	$view = $this->controller->importContainers($this->getData($this->defaultContainers));
    // 	// $this->assertEquals(self::HOME_VIEW_NAME, $view->getName());
    // 	$this->assertEquals([ExportImportController::SUCCESS_MESSAGE], $view->messages);
    // 	$criteria = [
	   //      'name' => $this->defaultContainerName, 
	   //      'user_id' => $this->defaultUser->id
	   //  ];
	   //  $container = $this->assertInDatabaseAndReturn(Container::class, 'containers', $criteria);	
	   //  //// assert category
    // 	$category_criteria = [
	   //      'container_id' => $container->id, 
	   //      'user_id' => $this->defaultUser->id,
	   //      'name' => $this->defaultCategoryName
	   //  ];
	   //  $this->seeInDatabase('categories', $category_criteria);
	   //  //// assert new category
    // 	$category_criteria = [
	   //      'container_id' => $container->id, 
	   //      'user_id' => $this->defaultUser->id,
	   //      'name' => $newCategoryName
	   //  ];
	   //  $this->seeInDatabase('categories', $category_criteria);

    // }

    // public function testImportExportMergesItemsInCategories() {
    // 	$view = $this->controller->importContainers($this->getData($this->defaultContainers));
    // 	$newItemName = $this->faker->word;
    // 	$this->defaultContainers[0]['categories'][0]['items'][0]['name'] = $newItemName;
    // 	$view = $this->controller->importContainers($this->getData($this->defaultContainers));
    // 	// $this->assertEquals(self::HOME_VIEW_NAME, $view->getName());
    // 	$this->assertEquals([ExportImportController::SUCCESS_MESSAGE], $view->messages);
    // 	$criteria = [
	   //      'name' => $this->defaultContainerName, 
	   //      'user_id' => $this->defaultUser->id
	   //  ];
	   //  $container = $this->assertInDatabaseAndReturn(Container::class, 'containers', $criteria);	
	   //  //// assert category
    // 	$category_criteria = [
	   //      'container_id' => $container->id, 
	   //      'user_id' => $this->defaultUser->id,
	   //      'name' => $this->defaultCategoryName
	   //  ];
	   //  $category = $this->assertInDatabaseAndReturn(Category::class, 'categories', $category_criteria);
	   //  //// assert item
    // 	$item_criteria = [
	   //      'category_id' => $category->id, 
	   //      'user_id' => $this->defaultUser->id,
	   //      'name' => $this->defaultItemName
	   //  ];
	   //  $this->seeInDatabase('items', $item_criteria);
	   //  //// assert item
    // 	$item_criteria = [
	   //      'category_id' => $category->id, 
	   //      'user_id' => $this->defaultUser->id,
	   //      'name' => $newItemName
	   //  ];
	   //  $this->seeInDatabase('items', $item_criteria);

    // }    


    // private function mockAuth() {
    // 	Auth::shouldReceive('check')->andReturn(true);
    // 	Auth::shouldReceive('user')->andReturn(Mockery::mock('FakeUser'))->set('id', 0);    	
    // }

    private function getData(array $containers) {
    	return [
    		'data' => $containers
    	];
    }

}

