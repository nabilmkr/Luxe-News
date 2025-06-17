<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'content',
        'news_id',
        'is_approved',
    ];
    
    protected $casts = [
        'is_approved' => 'boolean',
    ];
    
    /**
     * Get the news that owns the comment
     */
    public function news(): BelongsTo
    {
        return $this->belongsTo(News::class);
    }
    
    /**
     * Scope a query to only include approved comments.
     */
    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }
}
