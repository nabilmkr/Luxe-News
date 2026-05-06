<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsResource\Pages;
use App\Filament\Resources\NewsResource\RelationManagers;
use App\Models\News;
use App\Models\Category;
use App\Models\Game;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Filament\Notifications\Notification;

class NewsResource extends Resource
{
    protected static ?string $model = News::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';
    
    protected static ?string $navigationGroup = 'Content Management';
    
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('News Details')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => 
                                $operation === 'create' ? $set('slug', Str::slug($state)) : null
                            ),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        Forms\Components\Select::make('category_id')
                            ->label('Category')
                            ->required()
                            ->options(Category::all()->pluck('name', 'id'))
                            ->searchable()
                            ->reactive()
                            ->afterStateUpdated(fn (Forms\Set $set) => $set('game_id', null)),
                        Forms\Components\Select::make('game_id')
                            ->label('Game')
                            ->required()
                            ->options(function (callable $get) {
                                $categoryId = $get('category_id');
                                if (!$categoryId) {
                                    return Game::all()->pluck('name', 'id');
                                }
                                return Game::where('category_id', $categoryId)->pluck('name', 'id');
                            })
                            ->searchable(),
                        Forms\Components\Checkbox::make('is_featured')
                            ->label('Featured News')
                            ->helperText('Featured news will be displayed in the home page carousel'),
                        Forms\Components\Checkbox::make('is_hot_news')
                            ->label('Hot News')
                            ->helperText('Hot News akan ditampilkan di bagian "Hot News Popular Games" (maksimal 3 berita)')
                            ->afterStateUpdated(function ($state, $record) {
                                if ($state) {
                                    $hotNewsCount = News::where('is_hot_news', true)
                                        ->when($record, fn ($query) => $query->where('id', '!=', $record->id))
                                        ->count();
                                    
                                    if ($hotNewsCount >= 3) {
                                        Notification::make()
                                            ->title('Peringatan')
                                            ->body('Jumlah Hot News sudah mencapai batas maksimal (3). Harap nonaktifkan salah satu Hot News yang ada terlebih dahulu.')
                                            ->warning()
                                            ->send();
                                        
                                        return false;
                                    }
                                }
                                
                                return $state;
                            }),
                        Forms\Components\DateTimePicker::make('published_at')
                            ->label('Publish Date')
                            ->default(now()),
                        Forms\Components\FileUpload::make('thumbnail')
                            ->image()
                            ->directory('news/thumbnails'),
                        Forms\Components\RichEditor::make('content')
                            ->required()
                            ->fileAttachmentsDirectory('news/attachments'),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Category')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('game.name')
                    ->label('Game')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean()
                    ->sortable()
                    ->label('Featured'),
                Tables\Columns\IconColumn::make('is_hot_news')
                    ->boolean()
                    ->sortable()
                    ->label('Hot News'),
                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\Filter::make('is_featured')
                    ->label('Featured News')
                    ->query(fn (Builder $query): Builder => $query->where('is_featured', true))
                    ->toggle(),
                Tables\Filters\Filter::make('is_hot_news')
                    ->label('Hot News')
                    ->query(fn (Builder $query): Builder => $query->where('is_hot_news', true))
                    ->toggle(),
                Tables\Filters\SelectFilter::make('category')
                    ->relationship('category', 'name'),
                Tables\Filters\SelectFilter::make('game')
                    ->relationship('game', 'name'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // Kita akan menambahkan relation managers nanti
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNews::route('/'),
            'create' => Pages\CreateNews::route('/create'),
            'edit' => Pages\EditNews::route('/{record}/edit'),
        ];
    }
}
