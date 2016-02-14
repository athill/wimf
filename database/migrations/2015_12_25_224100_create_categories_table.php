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
			$table->string('user');
		 	$table->string('name');
		 	$table->integer('container_id');
		 	// $table->foreign('container_id')->references('id')->on('containers');
	        $this->timestamp('created_at')->useCurrent();
	        $this->timestamp('updated_at');
			$table->unique(['user', 'name', 'container_id']);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('containers');
	}

}
