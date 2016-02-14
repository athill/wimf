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
			$table->string('user');
			$table->string('name');
			$table->longText('description')->nullable();

	        $this->timestamp('created_at')->useCurrent();
	        $this->timestamp('updated_at');

			$table->unique(['user', 'name']);
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
