<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('developer_id')->nullable();
            $table->string('name')->nullable();
            $table->string('image')->nullable();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->string('view_style')->nullable();
            $table->dateTimeTz('handover_date')->nullable();
            $table->decimal('commission', 10, 2)->nullable();
            $table->text('amenities_id')->nullable();
            $table->string('project_status')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('developer_id')->references('id')->on('developers');
            $table->foreign('location_id')->references('id')->on('locations');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
