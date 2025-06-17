<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Game extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'slug',
        'description',
        'publisher',
        'developer',
        'category_id',
        'logo',
        'release_date',
    ];
    
    protected $casts = [
        'release_date' => 'date',
    ];
    
    /**
     * Get the category that owns the game
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    
    /**
     * Get all news for this game
     */
    public function news(): HasMany
    {
        return $this->hasMany(News::class);
    }
    
    /**
     * Get all tournaments for this game
     */
    public function tournaments(): HasMany
    {
        return $this->hasMany(Tournament::class);
    }
}
