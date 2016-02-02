<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Container;
use App\Category;

class ItemTest extends TestCase {

	use DatabaseTransactions;

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testGetContainers() {
        $user = factory(App\User::class)->create();
        $category_name = 'foo';
        $item_name = 'bar';
        
        //// go to containers page to create Freezer container record
        //// TODO: create when user is created???
        $this->actingAs($user)
             ->get('/api/containers');

        //// now get the id
        $container_id = Container::where([
                ['user', $user->email], 
                ['name', 'Freezer']
            ])->value('id');

        //// create new item
        $this->actingAs($user)
        	 ->post('/api/items', [
                    'category' => $category_name,
                    'item'=>$item_name,
                    'quantity' => '1',
                    'measurement' => 'baz',
                    'container_id' => $container_id
                ])
            ->seeJson(['name'=>$item_name]);

        $categoryCriteria = [
            'user' => $user->email,            
            'container_id' => $container_id,
            'name' => $category_name            
        ];
        
        //// verify category added to db
        $this->seeInDatabase('categories', $categoryCriteria);

        $category_id = Category::where($categoryCriteria)->value('id');

        
        $itemCriteria = [
            'user' => $user->email,
            'category_id' => $category_id,
            'name' => $item_name
        ];

        //// verify item added to db
        $this->seeInDatabase('items', $itemCriteria);
    }
}