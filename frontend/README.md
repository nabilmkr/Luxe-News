# LUXENEWS Gaming News Portal

A modern web application for gaming news, reviews, and tournament information built with React and Vite.

## Optimized Project Structure

This project has been optimized for better performance and code maintainability:

- **Dynamic News Component**: Unified news display with a single component handling all game categories
- **Code Splitting & Lazy Loading**: Components are loaded only when needed
- **Static News Data**: Centralized data files in constants folder
- **Reduced Dependencies**: Removed unnecessary packages to improve load time

## Features

- Game news categorized by genre (MOBA, FPS, RPG)
- Tournament news and updates
- Dynamic routing for efficient navigation
- Mobile-responsive design with Tailwind CSS

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Start development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Project Structure

```
src/
├── api/              # API client and service calls
├── assets/           # Static assets and SVGs
├── components/       # Reusable UI components
├── constants/        # Static data for news categories
├── pages/            # Main page components
└── kategori/         # Game category pages
```

## Adding New Content

To add new articles to existing categories, simply update the relevant data file in the `constants` directory:

- `mobaNewsData.js` - for MOBA game news
- `fpsNewsData.js` - for FPS game news
- `rpgNewsData.js` - for RPG game news
- `tourNewsData.js` - for tournament news

## Performance Optimizations

- **Code Splitting**: Uses React.lazy() to reduce initial bundle size
- **Static Data**: Precompiled data for faster load times
- **Optimized Build**: Custom Vite configuration for production

### Struktur Data

Data berita dan konten website dikelola melalui backend Laravel dengan Filament sebagai admin panel. Semua konten dapat dikelola secara dinamis melalui panel admin, termasuk:

- Berita game berdasarkan kategori (MOBA, FPS, RPG)
- Banner carousel untuk setiap kategori
- Komentar pengguna
- Tournament dan informasi terkait
