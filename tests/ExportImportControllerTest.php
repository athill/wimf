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
    	$this->handleAuth();
    	$containers = [[]];
    	$result = $this->controller->importContainers($this->getData($containers));
    	$this->assertEquals(sprintf(ExportImportController::CONTAINER_REQUIRES_NAME_ERROR_TEMPLATE, 0), $result->error);
    } 

  //   public function testImportContainersSucceedsWithContainerWithNameKey() {
  //   	$this->handleAuth();
		// $modelMock = Mockery::mock(Container::class);
  //   	$modelMock->shouldReceive('user')->andReturn($query = Mockery::mock('FakeQuery'));
  //   	$containers = [ [ 'name' => 'foo', 'categories' => [] ] ];
  //   	$result = $this->controller->importContainers($this->getData($containers));
  //   	$this->assertEquals(sprintf(ExportImportController::CONTAINER_REQUIRES_NAME_ERROR_TEMPLATE, 0), $result->error);
  //   }     

    private function handleAuth() {
    	Auth::shouldReceive('check')->andReturn(true);
    	Auth::shouldReceive('user')->andReturn(Mockery::mock('FakeUser'))->set('id', 0);    	
    }

    private function getData($containers) {
    	return [
    		'data' => $containers
    	];
    }

}

