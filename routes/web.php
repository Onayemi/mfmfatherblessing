<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PdfToAudioController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;



// Route::inertia('/', 'welcome')->name('home');

Route::get('/', [HomeController::class, 'home'])->name('home');
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/services', [HomeController::class, 'services'])->name('services');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
Route::get('/sitemap.xml', SitemapController::class);

Route::get('/pdf-to-audio', [PdfToAudioController::class, 'index'])->name('pdf-to-audio.index');
Route::post('/pdf-to-audio/convert', [PdfToAudioController::class, 'convert'])->name('pdf-to-audio.convert');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
