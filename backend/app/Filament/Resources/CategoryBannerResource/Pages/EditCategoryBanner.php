<?php

namespace App\Filament\Resources\CategoryBannerResource\Pages;

use App\Filament\Resources\CategoryBannerResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCategoryBanner extends EditRecord
{
    protected static string $resource = CategoryBannerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
