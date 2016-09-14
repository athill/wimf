<?php
// namespace TestNamespace;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Container;
use App\Category;
use App\Item;
use App\User;

class ItemTest extends TestCase {

	use DatabaseTransactions;

    private $defaultCategoryName = 'foo';
    private $defaultItemName = 'bar';
    private $defaultQuantity = '1';

    private $defaultParams;
    
    private $defaultContainer;


    public function setUp() {
        parent::setUp();
        $this->be($this->fakeUser);

        $this->defaultContainer =  $this->getFakeContainer($this->fakeUser->id);  
        $this->defaultParams = [
            'category' => $this->defaultCategoryName,
            'name'=>$this->defaultItemName,
            'quantity' => $this->defaultQuantity,
            'container_id' => $this->defaultContainer->id,
            'date' => $this->defaultDate
        ];            
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
        $this->postAddItem()
            ->seeJson(['name'=>$item_name]);

        //// verify category added to db
        $categoryCriteria = [
            'user_id' => $this->fakeUser->id,      
            'container_id' => $this->defaultContainer->id,
            'name' => $this->defaultCategoryName
        ];
        $this->seeInDatabase('categories', $categoryCriteria);
        //// get category id
        $category_id = Category::where($categoryCriteria)->value('id');

        //// verify item added to db
        $itemCriteria = [
            'user_id' => $this->fakeUser->id,
            'category_id' => $category_id,
            'name' => $this->defaultItemName
        ];
        $this->seeInDatabase('items', $itemCriteria);
    }

    
    public function testItemExistsInCategory() {
        $this->postAddItem()
            ->seeJson(['name'=>$this->defaultItemName]);

        $this->postAddItem()
            ->seeJsonStructure(['error']);        
    }


    
    public function testUpdateItem() {
        $updated_item_name = 'baz';
        $updated_quantity = '2';
        // $container = $this->getFakeContainer($user->id);
        $response = $this->postAddItem();
        $json = $this->getResponseContentAsJson($response);
        $id = $json['id'];

        $updates = [
            'name'=>$updated_item_name,
            'quantity' => $updated_quantity,
        ];
        $params = array_merge($json, $updates, ['container_id' => $this->defaultContainer->id]);
        // dd($params);
        $response = $this->putItem($id, $params);
        // dd($response->response->);
        // $json = $this->getResponseContentAsJson($response);
        // dd($response->response->getContent());


        $response->seeJson(['name'=>$updated_item_name, 'quantity'=>$updated_quantity]);

        // $this->actingAs($this->fakeUser)
        //      ->put('/api/items/'.$id, [
        //             'category' => $this->defaultCategoryName,
        //             'name'=>$updated_item_name,
        //             'quantity' => $updated_quantity,
        //             'container_id' => $container->id,
        //             'date' => Carbon::now()
        //         ])->seeJson(['name'=>$updated_item_name, 'quantity'=>$updated_quantity]); 
    }



    /*
    public function testDeleteItem() {
        $user = factory(User::class)->create();       

        $item = $this->getFakeItem($user->id);

        $itemtest = Item::find($item->id);


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
    */

    private function postAddItem($params=[], $user=null) {
        if (!$user) {
            $user = $this->fakeUser;
        }
        $opts = array_merge($this->defaultParams, $params);
        return $this->actingAs($user)
             ->post('/api/items', $opts); 
    }

    private function putItem($id, $params=[], $user=null) {
        if (!$user) {
            $user = $this->fakeUser;
        }
        return $this->actingAs($user)
             ->put('/api/items/'.$id, $params); 
    }

}
