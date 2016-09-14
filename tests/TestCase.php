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
     * @param array $overrides Override properties set by App\ModelFactory via \Faker\Generator
     * @return App\Category
     */
    protected function getFakeCategory(array $overrides=[]) {
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
    protected function getFakeItem(array $overrides=[]) {
        if (!isset($overrides['category_id'])) {
            $overrides['category_id'] = $this->getFakeCategory()->id;
        }
        return factory(App\Item::class)->create($overrides); 
    }

    ///// Statics
    protected static function getResponseContentAsJson(Illuminate\Http\Response $response) {
        return json_decode($response->getContent(), true);
    }

}
