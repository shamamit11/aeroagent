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
        Schema::create('user_payouts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->dateTimeTz('payout_date')->nullable();
            $table->decimal('amount', 10, 2)->nullable(); 
            $table->string('payout_status')->nullable(); 
            $table->dateTimeTz('payout_date_from')->nullable();
            $table->dateTimeTz('payout_date_to')->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_payouts');
    }
};
