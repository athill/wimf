<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CurrentUserControllerTest extends TestCase {

    use DatabaseTransactions;
    
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testGetUnauthenticatedUser() {
        $this->get('/api/currentUser')
             ->seeJsonEquals([
                 'name' => '',
                 'email' => ''
             ]);
    }

    public function testAuthenticatedUser() {
        $user = factory(App\User::class)->create();

        $this->actingAs($user)
             ->get('/api/currentUser')
			 ->seeJson([
                 'name' => $user->name,
                 'email' => $user->email
             ]);
    }
}