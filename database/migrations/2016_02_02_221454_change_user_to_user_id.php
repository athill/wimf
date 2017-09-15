<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeUserToUserId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropUnique('categories_user_name_container_id_unique');
            $table->dropColumn('user');
            $table->integer('user_id');
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
        Schema::table('categories', function (Blueprint $table) {
            $table->dropUnique('categories_user_id_name_container_id_unique');
            $table->dropColumn('user_id');
            $table->string('user');
            $table->unique(['user', 'name', 'container_id']);
        });
    }
}
