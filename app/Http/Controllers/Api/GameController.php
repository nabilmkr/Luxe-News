<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Game;

class GameController extends Controller
{
    /**
     * Display a listing of the games, optionally filtered by category.
     */
    public function index(Request $request)
    {
        $query = Game::with('category');
        
        // Filter by category (genre) if specified
        if ($request->has('genre')) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('slug', $request->genre);
            });
        }
        
        $games = $query->orderBy('name')->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $games,
        ]);
    }

    /**
     * Display the specified game with related news and tournaments.
     */
    public function show($slug)
    {
        $game = Game::with(['category', 'news' => function($query) {
            $query->where('published_at', '<=', now())
                  ->latest('published_at')
                  ->take(5);
        }, 'tournaments' => function($query) {
            $query->latest('start_date')
                  ->take(3);
        }])->where('slug', $slug)->firstOrFail();
        
        return response()->json([
            'status' => 'success',
            'data' => $game,
        ]);
    }
} 