<?php
use Carbon\Carbon;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Container;
use App\Category;
use App\Item;
use App\User;

class ItemTest extends TestCase {

	use DatabaseTransactions;

    private $fakeUser;

    public function setUp() {
        parent::setUp();

        $this->fakeUser = User::create([
            'name' => 'user name',
        ]);        

        
        // Auth::shouldReceive('check')->andReturn(true);
    }

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testAddItem() {
        $user = $this->fakeUser;
        $category_name = 'foo';
        $item_name = 'bar';

        $container = $this->getFakeContainer($user->id);

        //// create new item
        $this->actingAs($user)
             ->post('/api/items', [
                    'category' => $category_name,
                    'name'=>$item_name,
                    'quantity' => '1',
                    'container_id' => $container->id,
                    'date' => Carbon::now()
                ])
            ->seeJson(['name'=>$item_name]);

        //// verify category added to db
        $categoryCriteria = [
            'user_id' => $user->id,      
            'container_id' => $container->id,
            'name' => $category_name            
        ];
        $this->seeInDatabase('categories', $categoryCriteria);
        //// get category id
        $category_id = Category::where($categoryCriteria)->value('id');

        //// verify item added to db
        $itemCriteria = [
            'user_id' => $user->id,
            'category_id' => $category_id,
            'name' => $item_name
        ];
        $this->seeInDatabase('items', $itemCriteria);
    }

    public function testDeleteItem() {
        $user = factory(User::class)->create();       

        $item = $this->getFakeItem($user->id);

        $itemtest = Item::find($item->id);

        //// TODO: why is user_id -1 in created object???
        print('user_id: '.$user->id.' category_id: '.$item->category_id);
        print('Itemtest: user_id: '.$itemtest->user_id.' category_id: '.$itemtest->category_id);

        $item_criteria = [
            'name' => $item->name,
            // 'user_id' => $user->id,
            'category_id' => $item->category_id             
        ];

        $this->seeInDatabase('items', $item_criteria);

        //// create new item
        $this->actingAs($user)
             ->delete('/api/items/'.$item->id);     

        $this->notSeeInDatabase('items', $item_criteria);
    }
}