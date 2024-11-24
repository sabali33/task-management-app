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
        Schema::create('task_list_user', function (Blueprint $table) {

            $table->foreignId('task_list_id')->constrained('task_lists')->onDelete('cascade');
            $table->enum('permission', ['edit', 'view']);
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            $table->unique(['task_list_id', 'user_id']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_list_user');
    }
};
