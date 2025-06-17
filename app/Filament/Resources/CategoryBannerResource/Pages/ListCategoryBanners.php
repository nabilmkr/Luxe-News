<?php

namespace App\Filament\Resources\CategoryBannerResource\Pages;

use App\Filament\Resources\CategoryBannerResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCategoryBanners extends ListRecords
{
    protected static string $resource = CategoryBannerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
