<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CategoryBanner extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'category_id',
        'title',
        'image',
        'description',
        'is_active',
        'order',
    ];
    
    protected $casts = [
        'is_active' => 'boolean',
    ];
    
    /**
     * Get the category that owns the banner
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
