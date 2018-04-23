<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoriesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('categories', function(Blueprint $table) {
			$table->increments('id');
			$table->string('user_id');
		 	$table->string('name');
		 	$table->integer('container_id');
		 	// $table->foreign('container_id')->references('id')->on('containers');
	        $table->timestamp('created_at')->useCurrent();
	        $table->timestamp('updated_at')->useCurrent();
			$table->unique(['user_id', 'name', 'container_id']);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('categories');
	}

}
