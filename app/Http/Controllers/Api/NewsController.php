<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\News;
use App\Models\Category;
use App\Models\Game;
use App\Models\CategoryBanner;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class NewsController extends Controller
{
    /**
     * Display a listing of the news, possibly filtered by category and/or game.
     */
    public function index(Request $request)
    {
        $query = News::with(['category', 'game'])
            ->where('published_at', '<=', now())
            ->latest('published_at');
            
        // Filter by category (genre)
        if ($request->has('genre')) {
            $category = Category::where('slug', $request->genre)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }
        
        // Filter by game
        if ($request->has('game')) {
            $game = Game::where('slug', $request->game)->first();
            if ($game) {
                $query->where('game_id', $game->id);
            }
        }
        
        $news = $query->paginate(12);
        
        return response()->json([
            'status' => 'success',
            'data' => $news,
        ]);
    }

    /**
     * Display a listing of featured news for the carousel.
     */
    public function featured()
    {
        $featuredNews = News::with(['category', 'game'])
            ->where('is_featured', true)
            ->where('published_at', '<=', now())
            ->latest('published_at')
            ->take(5)
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $featuredNews,
        ]);
    }

    /**
     * Display a listing of hot news for Popular Games section.
     */
    public function hotNews()
    {
        $hotNews = News::with(['category', 'game'])
            ->where('is_hot_news', true)
            ->where('published_at', '<=', now())
            ->latest('published_at')
            ->take(3) // Maksimal 3 berita
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $hotNews,
        ]);
    }

    /**
     * Display the specified news article.
     */
    public function show($slug)
    {
        try {
            $news = News::with(['category', 'game', 'comments' => function($query) {
                $query->where('is_approved', true)
                      ->latest();
            }])->where('slug', $slug)->firstOrFail();
            
            // Format response dengan image yang benar
            $formattedNews = [
                'id' => $news->id,
                'title' => $news->title,
                'slug' => $news->slug,
                'content' => $news->content,
                'image' => $news->thumbnail, // Gunakan field thumbnail sebagai image
                'thumbnail' => $news->thumbnail,
                'rating' => $news->rating ?? 0,
                'review' => $news->review ?? '',
                'published_at' => $news->published_at,
                'created_at' => $news->created_at,
                'updated_at' => $news->updated_at,
                'category_id' => $news->category_id,
                'game_id' => $news->game_id,
                'category' => $news->category ? [
                    'id' => $news->category->id,
                    'name' => $news->category->name,
                    'slug' => $news->category->slug,
                ] : null,
                'game' => $news->game ? [
                    'id' => $news->game->id,
                    'name' => $news->game->name,
                    'slug' => $news->game->slug,
                ] : null,
                'comments' => $news->comments,
            ];
            
            return response()->json([
                'status' => 'success',
                'data' => $formattedNews
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to load article: ' . $e->getMessage()
            ], 404);
        }
    }
    
    /**
     * Display news filtered by category name.
     */
    public function categoryNews(Request $request)
    {
        try {
            $categoryName = $request->get('category');
            $searchTerm = $request->get('search', '');
            
            // Log input
            Log::info('categoryNews - Category Name: ' . $categoryName);
            Log::info('categoryNews - Search Term: ' . $searchTerm);

            $query = News::with(['category', 'game'])
                ->where('published_at', '<=', now())
                ->latest('published_at');
            
            // Filter by category name
            if ($categoryName && $categoryName !== 'all') {
                $category = Category::where('name', $categoryName)->first();
                if ($category) {
                    $query->where('category_id', $category->id);
                    Log::info('categoryNews - Applied category filter for ID: ' . $category->id);
                } else {
                    Log::warning('categoryNews - Category not found: ' . $categoryName);
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Category not found'
                    ], 404);
                }
            }
            
            // Log count after category filter
            Log::info('categoryNews - Count after category filter: ' . $query->count());
            // Log SQL after category filter
            // Log::info('categoryNews - SQL after category filter: ' . $query->toSql(), $query->getBindings());


            // Add search functionality
            if (!empty($searchTerm)) {
                Log::info('categoryNews - Applying search filter for term: ' . $searchTerm);
                $query->where(function($q) use ($searchTerm) {
                    $q->where('title', 'like', "%{$searchTerm}%")
                      ->orWhere('content', 'like', "%{$searchTerm}%");
                });
                // Log count after search filter
                Log::info('categoryNews - Count after search filter: ' . $query->count());
                // Log SQL after search filter
                // Log::info('categoryNews - SQL after search filter: ' . $query->toSql(), $query->getBindings());
            }
            
            $news = $query->get();
            Log::info('categoryNews - Final news count: ' . $news->count());
            
            if ($news->isEmpty()) {
                return response()->json([
                    'status' => 'success',
                    'data' => []
                ]);
            }
            
            // Format the response to include game_name and category_name
            $formattedNews = $news->map(function($item) {
                $content = $item->content;
                if (is_string($content) && strlen($content) > 500) {
                    $content = substr(strip_tags($content), 0, 500) . '...';
                }
                
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'content' => $content,
                    'image' => $item->thumbnail, // Gunakan field thumbnail sebagai image
                    'thumbnail' => $item->thumbnail,
                    'rating' => $item->rating ?? 0,
                    'review' => $item->review ?? '',
                    'published_at' => $item->published_at,
                    'category_id' => $item->category_id,
                    'game_id' => $item->game_id,
                    'category' => $item->category ? $item->category->name : null,
                    'category_slug' => $item->category ? $item->category->slug : null,
                    'game' => $item->game ? $item->game->name : null,
                    'game_slug' => $item->game ? $item->game->slug : null,
                ];
            });
            
            return response()->json([
                'status' => 'success',
                'data' => $formattedNews,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to load news: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display banners for a specific category.
     */
    public function categoryBanners(Request $request)
    {
        try {
            $categoryName = $request->get('category');
            Log::info('Request kategori banner: ' . $categoryName);
            
            $category = Category::where('name', $categoryName)->first();
            
            if (!$category) {
                Log::warning('Kategori tidak ditemukan: ' . $categoryName);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Category not found'
                ], 404);
            }
            
            Log::info('Kategori ditemukan: ' . $category->id . ' - ' . $category->name);
            
            $banners = CategoryBanner::where('category_id', $category->id)
                ->where('is_active', true)
                ->orderBy('order')
                ->get();
                
            Log::info('Jumlah banner ditemukan: ' . $banners->count());
            
            // Map untuk memastikan format image konsisten
            $formattedBanners = $banners->map(function($banner) {
                $imageValueFromDb = $banner->image; // Ini adalah path relatif dari Filament, cth: "category-banners/namafile.jpg"
                $imageUrlForApi = $imageValueFromDb;

                if ($imageValueFromDb && !str_starts_with($imageValueFromDb, 'http')) {
                    // Gunakan Storage facade untuk mendapatkan URL publik yang benar.
                    // Ini akan menghasilkan sesuatu seperti "/media/category-banners/namafile.jpg"
                    $imageUrlForApi = Storage::disk('media')->url($imageValueFromDb);
                    // Hapus slash di awal agar konsisten, karena frontend akan menambahkannya jika perlu.
                    $imageUrlForApi = ltrim($imageUrlForApi, '/');
                }
                
                Log::info('Banner: ' . $banner->id . ' - ' . $banner->title . ' - image (dari DB): ' . $imageValueFromDb . ' - image (untuk API): ' . $imageUrlForApi);
                
                return [
                    'id' => $banner->id,
                    'title' => $banner->title,
                    'image' => $imageUrlForApi, // Seharusnya sekarang "media/category-banners/namafile.jpg"
                    'description' => $banner->description,
                    'order' => $banner->order,
                    'category_id' => $banner->category_id,
                ];
            });
            
            return response()->json([
                'status' => 'success',
                'data' => $formattedBanners
            ]);
        } catch (\Exception $e) {
            Log::error('Error dalam categoryBanners: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to load banners: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified category news article.
     */
    public function categoryNewsShow($slug)
    {
        try {
            $news = News::with(['category', 'game', 'comments' => function($query) {
                $query->where('is_approved', true)
                      ->latest();
            }])->where('slug', $slug)->first();
            
            if (!$news) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Article not found'
                ], 404);
            }
            
            // Format response dengan image yang benar
            $formattedNews = [
                'id' => $news->id,
                'title' => $news->title,
                'slug' => $news->slug,
                'content' => $news->content,
                'image' => $news->thumbnail, // Gunakan field thumbnail sebagai image
                'thumbnail' => $news->thumbnail,
                'rating' => $news->rating ?? 0,
                'review' => $news->review ?? '',
                'published_at' => $news->published_at,
                'created_at' => $news->created_at,
                'updated_at' => $news->updated_at,
                'category_id' => $news->category_id,
                'game_id' => $news->game_id,
                'category' => $news->category ? [
                    'id' => $news->category->id,
                    'name' => $news->category->name,
                    'slug' => $news->category->slug,
                ] : null,
                'game' => $news->game ? [
                    'id' => $news->game->id,
                    'name' => $news->game->name,
                    'slug' => $news->game->slug,
                ] : null,
                'comments' => $news->comments,
            ];
            
            return response()->json([
                'status' => 'success',
                'data' => $formattedNews
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to load article: ' . $e->getMessage()
            ], 500);
        }
    }
} 