<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tournament extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'slug',
        'description',
        'game_id',
        'start_date',
        'end_date',
        'type',
        'location',
        'poster',
        'organizer',
        'prize_pool',
        'contact_wa',
        'team_quota',
    ];
    
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'prize_pool' => 'decimal:2',
    ];
    
    /**
     * The tournament types.
     */
    const TYPE_NATIONAL = 'national';
    const TYPE_INTERNATIONAL = 'international';
    
    /**
     * Get the game that owns the tournament
     */
    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
    
    /**
     * Scope a query to only include national tournaments.
     */
    public function scopeNational($query)
    {
        return $query->where('type', self::TYPE_NATIONAL);
    }
    
    /**
     * Scope a query to only include international tournaments.
     */
    public function scopeInternational($query)
    {
        return $query->where('type', self::TYPE_INTERNATIONAL);
    }
}
