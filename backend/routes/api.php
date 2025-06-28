<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\ProductController;

Route::post('/admin/login', [AuthController::class, 'authenticate']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function () {
    // Category routes

    // Route::get('categories', [CategoryController::class, 'index']);
    // Route::post('categories', [CategoryController::class, 'store']);
    // Route::get('categories/{id}', [CategoryController::class, 'show']);
    // Route::put('categories/{id}', [CategoryController::class, 'update']);
    // Route::delete('categories/{id}', [CategoryController::class, 'destroy']);
    
    Route::resource('categories', CategoryController::class);
    Route::resource('brands', BrandController::class);
    Route::resource('products', ProductController::class);
    Route::get('sizes',[SizeController::class,'index']);
    Route::post('temp-images',[TempImageController::class,'store']);
    // Brand routes
    // Route::get('/admin/brands', [App\Http\Controllers\admin\BrandController::class, 'index']);
    // Route::post('/admin/brands', [App\Http\Controllers\admin\BrandController::class, 'store']);
    // Route::get('/admin/brands/{id}', [App\Http\Controllers\admin\BrandController::class, 'show']);
    // Route::put('/admin/brands/{id}', [App\Http\Controllers\admin\BrandController::class, 'update']);
    // Route::delete('/admin/brands/{id}', [App\Http\Controllers\admin\BrandController::class, 'destroy']);
});

