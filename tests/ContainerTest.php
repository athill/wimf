<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
class ContainerTest extends TestCase {

	use DatabaseTransactions;

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testGetContainers() {
        $user = factory(App\User::class)->create();

        //// verify json
        $this->actingAs($user)
        	 ->get('/api/containers')
			 ->seeJsonStructure([
                '*' => ['id', 'name', 'description']
             ]);
        //// verify freezer added to db
        $this->seeInDatabase('containers', [
        	'user_id' => $user->id,
        	'name' => 'Freezer'
        ]);
    }
}