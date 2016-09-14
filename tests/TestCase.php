<?php
use Carbon\Carbon;

class TestCase extends Illuminate\Foundation\Testing\TestCase {
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';
    protected $defaultUser;


    public function setUp() {
        parent::setUp();
        $this->defaultUser = factory(App\User::class)->create(); 
        $this->defaultDate = Carbon::now()->toDateTimeString();
    }

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
    protected function getFakeContainer($overrides=[]) {
        $container = factory(App\Container::class)->create($overrides);
        return $container;
    }

    protected function getFakeCategory($overrides=[]) {
        if (!isset($overrides['container_id'])) {
            $overrides['container_id'] = $this->getFakeContainer()->id;
        }
        return factory(App\Category::class)->create($overrides); 
    }

    protected function getFakeItem($overrides=[]) {
        if (!isset($overrides['category_id'])) {
            $overrides['category_id'] = $this->getFakeCategory()->id;
        }
        return factory(App\Item::class)->create($overrides); 
    }

    protected static function getResponseContentAsJson(Illuminate\Http\Response $response) {
        return json_decode($response->getContent(), true);
    }

}
