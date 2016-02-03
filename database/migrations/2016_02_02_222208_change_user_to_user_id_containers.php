<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeUserToUserIdContainers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('containers', function (Blueprint $table) {
            $table->dropUnique('containers_user_name_unique');
            $table->dropColumn('user');
            $table->integer('user_id');
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
        Schema::table('containers', function (Blueprint $table) {
            $table->dropUnique('containers_user_name_unique');
            $table->dropColumn('user_id');
            $table->string('user');
            $table->unique(['user', 'name']);
        });
    }
}
