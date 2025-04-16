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
        Schema::create('personajes', function (Blueprint $table) {
            $table->tinyInteger('id')->unsigned()->primary();
            $table->string("name", 150)->nullable();
            $table->string("status", 50)->nullable();
            $table->string("species", 50)->nullable();
            $table->string("image", 150)->nullable();
            $table->string("type", 150)->nullable();
            $table->string("gender", 50)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personajes');
    }
};
