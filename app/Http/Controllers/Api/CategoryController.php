<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     */
    public function index()
    {
        $categories = Category::withCount('games')->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $categories,
        ]);
    }

    /**
     * Display the specified category with its games.
     */
    public function show($slug)
    {
        $category = Category::with('games')->where('slug', $slug)->firstOrFail();
        
        return response()->json([
            'status' => 'success',
            'data' => $category,
        ]);
    }
} 