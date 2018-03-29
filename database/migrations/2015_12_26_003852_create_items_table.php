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
			$table->string('user_id');
		 	$table->string('name');
		 	$table->string('quantity')->nullable();
		 	$table->string('comment')->nullable();
		 	$table->integer('category_id');
		 	$table->date('date')->nullable();
	        $table->timestamp('created_at')->useCurrent();
	        $table->timestamp('updated_at')->useCurrent();
			$table->unique(['user_id', 'name', 'category_id']);
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
