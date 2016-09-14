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
        $this->be($this->defaultUser);
        $this->defaultContainer =  $this->getFakeContainer();  
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
        $item_name = 'bar';

        //// create new item
        $this->postAddItem()
            ->seeJson(['name'=>$item_name]);

        //// verify category added to db
        $categoryCriteria = [
            'user_id' => $this->defaultUser->id,      
            'container_id' => $this->defaultContainer->id,
            'name' => $this->defaultCategoryName
        ];
        $this->seeInDatabase('categories', $categoryCriteria);
        //// get category id
        $category_id = Category::where($categoryCriteria)->value('id');

        //// verify item added to db
        $itemCriteria = [
            'user_id' => $this->defaultUser->id,
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
        $response = $this->postAddItem();
        $json = $this->getResponseContentAsJson($response);
        $id = $json['id'];

        $updates = [
            'name'=>$updated_item_name,
            'quantity' => $updated_quantity,
        ];
        $params = array_merge($json, $updates, ['container_id' => $this->defaultContainer->id]);
        $response = $this->putItem($id, $params);


        $response->seeJson(['name'=>$updated_item_name, 'quantity'=>$updated_quantity]);
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
            $user = $this->defaultUser;
        }
        $opts = array_merge($this->defaultParams, $params);
        return $this->actingAs($user)
             ->post('/api/items', $opts); 
    }

    private function putItem($id, $params=[], $user=null) {
        if (!$user) {
            $user = $this->defaultUser;
        }
        return $this->actingAs($user)
             ->put('/api/items/'.$id, $params); 
    }

}
