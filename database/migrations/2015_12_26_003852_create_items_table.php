<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('items', function(Blueprint $table) {
			$table->increments('id');
			$table->string('user');
		 	$table->string('name');
		 	$table->string('quantity');
		 	$table->string('measurement');
		 	$table->string('comment');
		 	$table->integer('category_id');
		 	// $table->foreign('category_id')->references('id')->on('categories');
	        $this->timestamp('created_at')->useCurrent();
	        $this->timestamp('updated_at');
			$table->unique(['user', 'name', 'category_id']);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('items');
	}

}
