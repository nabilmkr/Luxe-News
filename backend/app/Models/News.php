<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class News extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'title',
        'slug',
        'content',
        'thumbnail',
        'game_id',
        'category_id',
        'is_featured',
        'is_hot_news',
        'published_at',
    ];
    
    protected $casts = [
        'is_featured' => 'boolean',
        'is_hot_news' => 'boolean',
        'published_at' => 'datetime',
    ];
    
    /**
     * Get the category that owns the news
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    
    /**
     * Get the game that owns the news
     */
    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
    
    /**
     * Get all comments for this news
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
    
    /**
     * Scope a query to only include featured news.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
    
    /**
     * Scope a query to only include hot news.
     */
    public function scopeHotNews($query)
    {
        return $query->where('is_hot_news', true);
    }
}
