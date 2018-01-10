<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Carbon\Carbon;

abstract class TestCase extends BaseTestCase {

	 use CreatesApplication;

    const ITEMS_PATH = '/api/items';
    const CONTAINERS_PATH = '/api/containers';

    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';

    //// my vars

    /**
     * Default date string
     *
     * @var \Carbon\Carbon
     */        
    protected $defaultDate;

   

  public function setUp() {
        parent::setUp();
        $this->defaultDate = Carbon::now()->toDateTimeString();
    }

    public function getDefaultUser() {
        return factory(\App\User::class)->create(); 
    }


    /**
     * Creates the a fake container.
     *
     * @param array $overrides Override properties set by App\ModelFactory via \Faker\Generator
     * @return App\Container
     */
    protected function getFakeContainer(array $overrides=[]) {
        return factory(\App\Container::class)->create($overrides);
    }

    /**
     * Creates the a fake category.
     *
     * @param array|int $overrides Override properties set by App\ModelFactory via \Faker\Generator, int will
     *     set container_id
     * @return App\Category
     */
    protected function getFakeCategory($overrides=[]) {
        //// allow passing in container_id as single value
        if (is_numeric($overrides)) {
            $overrides = [
                'container_id' => $overrides
            ];
        }
        if (!isset($overrides['container_id'])) {
            $overrides['container_id'] = $this->getFakeContainer()->id;
        }
        return factory(\App\Category::class)->create($overrides); 
    }

    /**
     * Creates the a fake item.
     *
     * @param array $overrides Override properties set by App\ModelFactory via \Faker\Generator
     * @return App\Item
     */
    protected function getFakeItem($overrides=[]) {
        //// allow passing in category_id as single value
        if (is_numeric($overrides)) {
            $overrides = [
                'category_id' => $overrides
            ];
        }
        if (!isset($overrides['category_id'])) {
            $overrides['category_id'] = $this->getFakeCategory()->id;
        }
        return factory(\App\Item::class)->create($overrides); 
    }

    ///// helpers
    protected function getResponseContentAsJson($response) {
        if (is_null($response)) {
            throw new Exception('$this->response is null in TestCase.getResponseContentAsJson(). This method must be called after making a http request.');
        }
        return json_decode($response->getContent(), true);
    }    

    //// statics
    protected static function mapSeeJson($json, array $excludes=[]) {
        $map = [];
        foreach ($json as $key => $value) {
            if (!in_array($key, $excludes)) {
                $map[$key] = $json[$key];
            }
        }
    }

    protected function assertInDatabaseAndReturn($modelClass, $table, $criteria) {
        //// see in the database
        $this->assertDatabaseHas($table, $criteria);

        //// build args array
        $args = collect(array_keys($criteria))->map(function($key, $i) use ($criteria) {
            // echo "$key\n";
            return [$key, $criteria[$key]];
        })->toArray();
        
        //// build eloquent query; in Laravel 5.4, you can pass an array and avoid all this
        $result = call_user_func_array([$modelClass, 'where'], $args[0]);
        if (count($args) > 1) {
            for ($i = 1; $i < count($args); $i++) {
                call_user_func_array([$result, 'where'], $args[$i]);
            }   
        }
        return $result->firstOrFail();
    }    

}
