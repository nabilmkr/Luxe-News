<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'slug',
        'description',
    ];
    
    /**
     * Get all games in this category
     */
    public function games(): HasMany
    {
        return $this->hasMany(Game::class);
    }
    
    /**
     * Get all news in this category
     */
    public function news(): HasMany
    {
        return $this->hasMany(News::class);
    }
}
