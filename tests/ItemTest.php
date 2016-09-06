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
    private $default_category_name = 'foo';


    public function setUp() {
        parent::setUp();

        $this->fakeUser = User::create([
            'name' => 'user name',
        ]);        
    }

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testAddItem() {
        $user = $this->fakeUser;
        $item_name = 'bar';

        $container = $this->getFakeContainer($user->id);

        //// create new item
        $this->postAddItem($container->id, $this->default_category_name, $item_name)
            ->seeJson(['name'=>$item_name]);

        //// verify category added to db
        $categoryCriteria = [
            'user_id' => $user->id,      
            'container_id' => $container->id,
            'name' => $this->default_category_name
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


    /**
    * @expectedException \PDOException
    */
    // public function testItemExistsInCategory() {
    //     $user = $this->fakeUser;
    //     $item_name = 'bar';
    //     $container = $this->getFakeContainer($user->id);

    //     $this->postAddItem($container->id, $this->default_category_name, $item_name)
    //     ->seeJson(['name'=>$item_name]);

    //     $this->postAddItem($container->id, $this->default_category_name, $item_name);        
    // }

    private function postAddItem($container_id, $category_name, $item_name, $opts=[]) {
        //// TODO: implement $opts for user, date, etc.
        return $this->actingAs($this->fakeUser)
             ->post('/api/items', [
                    'category' => $category_name,
                    'name'=>$item_name,
                    'quantity' => '1',
                    'container_id' => $container_id,
                    'date' => Carbon::now()
                ]);        

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