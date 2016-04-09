<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropMeasurementFromItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            DB::statement("UPDATE items SET 
                            quantity=CASE
                                WHEN measurement = NULL 
                                THEN quantity
                                ELSE concat(quantity, ' ', measurement)
                            END");
            $table->dropColumn('measurement');
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
            $table->string('measurement');
            DB::statement("UPDATE items SET 
                            measurement  = CASE
                                    WHEN LOCATE(' ', `quantity`) > 0,
                                    THEN SUBSTRING(`quantity`, LOCATE(' ', `quantity`) + 1),
                                    ELSE NULL
                                END,
                            quantity = CASE
                                        WHEN LOCATE(' ', `quantity`) > 0,
                                        THEN SUBSTRING(`quantity`, 1, LOCATE(' ', `quantity`) - 1),
                                        ELSE `quantity`
                                    END");
        });
    }
}
