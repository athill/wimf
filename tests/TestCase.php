<?php


class TestCase extends Illuminate\Foundation\Testing\TestCase {
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';
    protected $fakeUser;


    public function setUp() {
        parent::setUp();
        $this->fakeUser = factory(App\User::class)->create(); 
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
        if (!is_array($overrides)) {
            $overrides = [];
        }
        $defaults = [
            'user_id' => $this->fakeUser->id
        ];
        $overrides = array_merge($defaults, $overrides);
        $container = factory(App\Container::class)->create($overrides);
        // $container->user_id = $user_id;
        return $container;
    }

    protected function getFakeCategory($user_id, $container_id=null) {
        if ($container_id === null) {
            $container = $this->getFakeContainer($user_id);
            $container_id = $container->id;
        }
        return factory(App\Category::class)->create([
           'user_id' => $user_id,
           'container_id' => $container->id 
        ]); 
    }

    protected function getFakeItem($user_id, $category_id=null) {
        if ($category_id === null) {
            $category = $this->getFakeCategory($user_id);
            $category_id = $category->id;
        }
        $overrides = [
           'category_id' => $category_id,
           'user_id' => $user_id
        ];
        $item = factory(App\Item::class)->create($overrides);
        return $item;
    }

    protected function getResponseContentAsJson($response) {
        return json_decode($response->response->getContent(), true);
    }

}
