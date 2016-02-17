<?php
class TestCase extends Illuminate\Foundation\Testing\TestCase {
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';
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
    protected function getFakeContainer($user_id) {
        return factory(App\Container::class)->create([
            'user_id' => $user_id
        ]);
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
        return factory(App\Item::class)->create([
           'user_id' => $user_id,
           'category_id' => $category_id 
        ]);                     
    }


}