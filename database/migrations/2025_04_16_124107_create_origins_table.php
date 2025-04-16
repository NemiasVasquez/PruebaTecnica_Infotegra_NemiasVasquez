<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('origins', function (Blueprint $table) {
            $table->tinyInteger('id')->unsigned();
            $table->string("name", 150)->nullable();
            $table->string("url", 150)->nullable();

            $table->foreign('id')->references('id')->on('personajes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('origins');
    }
};
