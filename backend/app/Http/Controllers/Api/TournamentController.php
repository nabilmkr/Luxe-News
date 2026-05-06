<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tournament;

class TournamentController extends Controller
{
    /**
     * Display a listing of tournaments, optionally filtered by type or game.
     */
    public function index(Request $request)
    {
        $query = Tournament::with('game')
            ->orderBy('start_date');
            
        // Filter by type if specified
        if ($request->has('type') && in_array($request->type, ['national', 'international'])) {
            $query->where('type', $request->type);
        }
        
        // Filter by game if specified
        if ($request->has('game')) {
            $query->whereHas('game', function($q) use ($request) {
                $q->where('slug', $request->game);
            });
        }
        
        $tournaments = $query->paginate(12);
        
        return response()->json([
            'status' => 'success',
            'data' => $tournaments,
        ]);
    }

    /**
     * Display the specified tournament.
     */
    public function show($slug)
    {
        $tournament = Tournament::with('game')
            ->where('slug', $slug)
            ->firstOrFail();
            
        return response()->json([
            'status' => 'success',
            'data' => $tournament,
        ]);
    }
} 