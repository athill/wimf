<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeUserToUserIdItems extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropUnique('items_user_name_category_id_unique');
            $table->dropColumn('user');
            $table->integer('user_id');
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
        Schema::table('items', function (Blueprint $table) {
            $table->dropUnique('items_user_id_name_category_id_unique');
            $table->dropColumn('user_id');
            $table->string('user');
            $table->unique(['user', 'name', 'category_id']);
        });
    }
}
