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
        Schema::create('leasers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->unsignedBigInteger('property_id')->nullable();
            $table->unsignedBigInteger('property_type_id')->nullable();
            $table->string('building_name')->nullable();
            $table->string('view_style')->nullable();
            $table->text('property_amenities')->nullable();
            $table->string('property_size')->nullable();
            $table->decimal('rent_price', 12, 2)->nullable();
            $table->decimal('rent_index', 12, 2)->nullable();
            $table->boolean('noc_status')->nullable()->default(1)->comment('0 = No, 1 = Yes');
            $table->boolean('is_furnished')->nullable()->default(0)->comment('0 = No, 1 = Yes');
            $table->string('commission_type')->nullable();
            $table->decimal('commission', 10, 2)->nullable();
            $table->text('ad_link')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('customer_id')->references('id')->on('customers');
            $table->foreign('location_id')->references('id')->on('locations');
            $table->foreign('property_id')->references('id')->on('properties');
            $table->foreign('property_type_id')->references('id')->on('property_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leasers');
    }
};
