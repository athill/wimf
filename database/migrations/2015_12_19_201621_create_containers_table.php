<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContainersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('containers', function(Blueprint $table)
		{

			$table->increments('id');
			$table->string('user_id');
			$table->string('name');
			$table->longText('description')->nullable();

	        $table->timestamp('created_at')->useCurrent();
	        $table->timestamp('updated_at')->useCurrent();

			$table->unique(['user_id', 'name']);
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
