<?php
use Carbon\Carbon;

class TestCase extends Illuminate\Foundation\Testing\TestCase {

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
     * Default user
     *
     * @var App\User
     */    
    protected $defaultUser;

    /**
     * Default date string
     *
     * @var \Carbon\Carbon
     */        
    protected $defaultDate;

    //// how about this voodoo?

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication() {
        $app = require __DIR__.'/../bootstrap/app.php';
        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
        return $app;
    }


    ///// my stuff

    public function setUp() {
        parent::setUp();
        $this->defaultUser = factory(App\User::class)->create(); 
        $this->defaultDate = Carbon::now()->toDateTimeString();
    }


    /**
     * Creates the a fake container.
     *
     * @param array $overrides Override properties set by App\ModelFactory via \Faker\Generator
     * @return App\Container
     */
    protected function getFakeContainer(array $overrides=[]) {
        return factory(App\Container::class)->create($overrides);
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
        return factory(App\Category::class)->create($overrides); 
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
        return factory(App\Item::class)->create($overrides); 
    }

    ///// helpers
    protected function getResponseContentAsJson() {
        $response = $this->response;
        if (is_null($response)) {
            throw new Exception('$this->response is null in TestCase.getResponseContentAsJson(). This method must be called after making a http request.');
        }
        return json_decode($this->response->getContent(), true);
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

}
