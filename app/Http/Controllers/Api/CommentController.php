<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\News;
use App\Models\Comment;

class CommentController extends Controller
{
    /**
     * Display a listing of comments for a news article.
     */
    public function index(News $news)
    {
        $comments = $news->comments()
            ->where('is_approved', true)
            ->latest()
            ->paginate(20);
            
        return response()->json([
            'status' => 'success',
            'data' => $comments,
        ]);
    }

    /**
     * Store a newly created comment for a news article.
     */
    public function store(Request $request, News $news)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
        
        $comment = $news->comments()->create([
            'name' => $request->name,
            'content' => $request->content,
            'is_approved' => true, // Auto-approve for simplicity
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Comment posted successfully',
            'data' => $comment,
        ], 201);
    }
} 