<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\TournamentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// News Routes
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/featured', [NewsController::class, 'featured']);
Route::get('/news/hot', [NewsController::class, 'hotNews']);
Route::get('/news/{slug}', [NewsController::class, 'show']);

// Category-specific Routes
Route::get('/category-news', [NewsController::class, 'categoryNews']);
Route::get('/category-news/{slug}', [NewsController::class, 'categoryNewsShow']);
Route::get('/category-banners', [NewsController::class, 'categoryBanners']);

// Comments Routes
Route::get('/news/{news}/comments', [CommentController::class, 'index']);
Route::post('/news/{news}/comments', [CommentController::class, 'store']);

// Categories Routes
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);

// Games Routes
Route::get('/games', [GameController::class, 'index']);
Route::get('/games/{slug}', [GameController::class, 'show']);

// Tournaments Routes
Route::get('/tournaments', [TournamentController::class, 'index']);
Route::get('/tournaments/{slug}', [TournamentController::class, 'show']); 