<?php
namespace Tests\Unit;

use Tests\TestCase;

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
        //// TODO why not working?
        // $response = $this->postItem();
        // $response->assertJson(['name'=>$item_name]);

    //     //// verify category added to db
    //     $categoryCriteria = [
    //         'user_id' => $this->defaultUser->id,      
    //         'container_id' => $this->defaultContainer->id,
    //         'name' => $this->defaultCategoryName
    //     ];
    //     $this->seeInDatabase('categories', $categoryCriteria);
    //     //// get category id
    //     $category_id = Category::where($categoryCriteria)->value('id');

    //     //// verify item added to db
    //     $itemCriteria = [
    //         'user_id' => $this->defaultUser->id,
    //         'category_id' => $category_id,
    //         'name' => $this->defaultItemName
    //     ];
    //     $this->seeInDatabase('items', $itemCriteria);
    }

    
    // public function testItemExistsInCategory() {
    //     $response = $this->postItem();
    //     $response->seeJson(['name'=>$this->defaultItemName]);

    //     $response = $this->postItem();
    //     $response->seeJsonStructure(['_error']);        
    // }

    // public function testItemNoContainerId() {
    //     $response = $this->postItem(['container_id' => null]);
    //     // dd($response);
    //     $response->seeJson(['_error']);
    // }


    
    // public function testUpdateItem() {
    //     $updated_item_name = 'baz';
    //     $updated_quantity = '2';
    //     $response = $this->postItem();
    //     $response = $this->getResponseContentAsJson($response);
    //     $id = $response['id'];

    //     $updates = [
    //         'name'=>$updated_item_name,
    //         'quantity' => $updated_quantity,
    //     ];
    //     $params = array_merge($response, $updates, ['container_id' => $this->defaultContainer->id]);
    //     $this->putItem($id, $params);
    //     $this->seeJson(['name'=>$updated_item_name, 'quantity'=>$updated_quantity]);
    // }
    
    // public function testDeleteItem() {
    //     $item = $this->getFakeItem();

    //     $item_criteria = [
    //         'name' => $item->name,
    //         'category_id' => $item->category_id             
    //     ];

    //     $this->seeInDatabase('items', $item_criteria);

    //     //// delete item
    //     $this->delete(self::ITEMS_PATH.'/'.$item->id);     

    //     $this->notSeeInDatabase('items', $item_criteria);
    // }
    

    private function postItem(array $params=[]) {
        $opts = array_merge($this->defaultParams, $params);
        $headers = ['Authorization' => 'Bearer '.\JWTAuth::fromUser($this->defaultUser)];
        // dd($headers);
        return $this->json('POST', self::ITEMS_PATH, $opts, $headers); 
    }

    private function putItem($id, $params=[]) {
        return $this->json('PUT', self::ITEMS_PATH.'/'.$id, $params); 
    }

}
