<?php
// namespace TestNamespace;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Container;
use App\Category;
use App\Item;
use App\User;

class ItemControllerTest extends TestCase {

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
        $this->postAddItem();
        $response = self::getResponseContentAsJson($this->response);
        $id = $response['id'];

        $updates = [
            'name'=>$updated_item_name,
            'quantity' => $updated_quantity,
        ];
        $params = array_merge($response, $updates, ['container_id' => $this->defaultContainer->id]);
        $response = $this->putItem($id, $params);


        $response->seeJson(['name'=>$updated_item_name, 'quantity'=>$updated_quantity]);
    }



    
    public function testDeleteItem() {
        $item = $this->getFakeItem();

        $itemtest = Item::find($item->id);


        $item_criteria = [
            'name' => $item->name,
            // 'user_id' => $user->id,
            'category_id' => $item->category_id             
        ];

        $this->seeInDatabase('items', $item_criteria);

        //// create new item
        $this->delete('/api/items/'.$item->id);     

        $this->notSeeInDatabase('items', $item_criteria);
    }
    

    private function postAddItem($params=[]) {
        $opts = array_merge($this->defaultParams, $params);
        return $this->post('/api/items', $opts); 
    }

    private function putItem($id, $params=[]) {
        return $this->put('/api/items/'.$id, $params); 
    }

}
