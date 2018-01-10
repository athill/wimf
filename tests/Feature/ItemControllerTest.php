<?php
namespace Tests\Unit;

use Tests\TestCase;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Container;
use App\Category;
use App\Item;
use App\User;

class ItemControllerTest extends TestCase {

	use DatabaseTransactions;
    // use WithoutMiddleware;

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
        $this->postItem()
            ->assertJson(['name'=>$item_name]);

        //// verify category added to db
        $categoryCriteria = [
            'user_id' => $this->defaultUser->id,      
            'container_id' => $this->defaultContainer->id,
            'name' => $this->defaultCategoryName
        ];
        $this->assertDatabaseHas('categories', $categoryCriteria);
        //// get category id
        $category_id = Category::where($categoryCriteria)->value('id');

        //// verify item added to db
        $itemCriteria = [
            'user_id' => $this->defaultUser->id,
            'category_id' => $category_id,
            'name' => $this->defaultItemName
        ];
        $this->assertDatabaseHas('items', $itemCriteria);
    }

    
    public function testItemExistsInCategory() {
        $this->postItem()
            ->assertJson(['name'=>$this->defaultItemName]);

        $response = $this->postItem();
        $response->assertJsonStructure(['_error']);        
    }

    public function testItemNoContainerId() {
        $response = $this->postItem(['container_id' => null]);
        // dd($response->getContent());
        $json = [
                "message" => "The given data was invalid.",
                "errors" => ["container_id" => ["The container id field is required."]]
        ];
        $response->assertExactJson($json);
    }
    
    public function testUpdateItem() {
        $updated_item_name = 'baz';
        $updated_quantity = '2';
        $response = $this->postItem();
        $item= $this->getResponseContentAsJson($response);
        $id = $item['id'];

        $updates = [
            'name'=>$updated_item_name,
            'quantity' => $updated_quantity,
        ];

        // dd($item);
        $params = array_merge($item, $updates, ['container_id' => $this->defaultContainer->id]);
        $this->putItem($id, $params)
            ->assertJson(['name'=>$updated_item_name, 'quantity'=>$updated_quantity]);
    }
    
    public function testDeleteItem() {
        $item = $this->getFakeItem();

        $item_criteria = [
            'name' => $item->name,
            'category_id' => $item->category_id             
        ];

        $this->assertDatabaseHas('items', $item_criteria);

        //// delete item
        $this->deleteItem($item->id);     

        $this->assertDatabaseMissing('items', $item_criteria);
    }
    

    private function postItem(array $params=[]) {
        $opts = array_merge($this->defaultParams, $params);
        // $headers = ['Authorization' => 'Bearer '.\JWTAuth::fromUser($this->defaultUser)];
        // dd($headers);
        return $this->json('POST', self::ITEMS_PATH, $opts); 
    }

    private function putItem($id, $params=[]) {
        return $this->json('PUT', self::ITEMS_PATH.'/'.$id, $params); 
    }

    private function deleteItem($id) {
        return $this->json('DELETE', self::ITEMS_PATH.'/'.$id); 
    }    

}
