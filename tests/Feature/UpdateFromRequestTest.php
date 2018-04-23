<?php
namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Request;

use App\UpdateFromRequest;

class UpdateFromRequestTest extends TestCase {
	const ARG1_KEY = 'arg1';
	const ARG2_KEY = 'arg2';
	const ARG1_1 = 'arg1-1';
	const ARG2_1 = 'arg2-1';
	const NON_FILLABLE = 'nonFillable';


	const ARG1_2 = 'arg1-2';
	const ARG2_2 = 'arg2-2';

	public function testBasicCase() {
		$args = [self::ARG1_KEY => self::ARG1_2];
		list($model, $request) = $this->getModelAndRequest($args);
		$model->updateFromRequest($request);
		$this->assertEquals(self::ARG1_2, $model->{self::ARG1_KEY});
	}

	public function testMappings() {
		$requestName = 'foo';
		$args = [$requestName => self::ARG1_2];
		$aliases = [$requestName => self::ARG1_KEY];
		list($model, $request) = $this->getModelAndRequest($args);
		$model->updateFromRequest($request, $aliases);
		$this->assertEquals(self::ARG1_2, $model->{self::ARG1_KEY});
	}

	public function testDontUpdateNonFillable() {
		$args = ['nonFillable' => 'nonFillable-2'];
		list($model, $request) = $this->getModelAndRequest($args);
		$model->updateFromRequest($request);
		$this->assertEquals(self::NON_FILLABLE, $model->nonFillable);
	}

	private function getModelAndRequest($args) {
		$model = new FakeModel;
		$request = new Request($args);
		return [$model, $request];		
	}
}

class FakeModel {
	use UpdateFromRequest;

	public $arg1 = UpdateFromRequestTest::ARG1_1;
	public $arg2 = UpdateFromRequestTest::ARG2_1;
	public $nonFillable = UpdateFromRequestTest::NON_FILLABLE;

	protected $fillable = [
		UpdateFromRequestTest::ARG1_KEY, 
		UpdateFromRequestTest::ARG2_KEY
	];
}

