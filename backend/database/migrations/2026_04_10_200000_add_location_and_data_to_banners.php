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
        $hasLocation = Schema::hasColumn('banners', 'location');
        $hasCustomData = Schema::hasColumn('banners', 'custom_data');

        if (!$hasLocation || !$hasCustomData) {
            Schema::table('banners', function (Blueprint $table) use ($hasLocation, $hasCustomData) {
                if (!$hasLocation) {
                    $table->string('location')->default('home_hero')->after('title');
                }
                if (!$hasCustomData) {
                    $table->json('custom_data')->nullable()->after('active');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn(['location', 'custom_data']);
        });
    }
};
