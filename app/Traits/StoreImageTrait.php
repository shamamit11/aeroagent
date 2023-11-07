<?php
namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

trait StoreImageTrait
{

    //$folder = '/uploads/folder_name/'
    public function StoreImage(UploadedFile $file, $folder, $disk = 'public')
    {
        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $file->storeAs($folder, $fileName, $disk);
        return $fileName;
    }

    public function StoreResizeImage(UploadedFile $file, $folder, $width, $height, $disk = 'public')
    {
        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $img = Image::make($file->getRealPath());
        $img->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->stream();
        Storage::disk($disk)->put($folder . $fileName, $img);
        return $fileName;
    }

    public function StoreResizeImageWithThumb(UploadedFile $file, $folder, $width, $height, $thumb_width, $thumb_height, $disk = 'public')
    {
        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $img = Image::make($file->getRealPath());
        $img->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->stream();
        Storage::disk($disk)->put($folder . $fileName, $img);
        //for thumb
        $img = Image::make($file->getRealPath());
        $img->resize($thumb_width, $thumb_height, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->stream();
        Storage::disk($disk)->put($folder . 'thumb/' . $fileName, $img);
        return $fileName;
    }

    public function StoreBase64Image($file, $folder, $disk = 'public')
    {
        $ext = explode('/', mime_content_type($file))[1];
        $extension = explode('+', $ext)[0];
        $filename = Str::uuid() . '.' . $extension;
        $image = Image::make($file)->stream($extension, 80);
        Storage::disk($disk)->put($folder . $filename, $image);
        return $filename;
    }
}
