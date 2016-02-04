<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIndexToChangelog extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('changelog', function (Blueprint $table) {
            $table->unique(['user_id', 'table', 'created_at']);
            //
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('changelog', function (Blueprint $table) {
            $table->dropUnique('unique_user_id_table_created_at');
        });
    }
}
