<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:admin,agent'])->group(function () {
    Route::controller('DashboardController')->group(function () {
        Route::get('/', 'index')->name('dashboard');
    });

    Route::controller('CustomerController')->group(function () {
        Route::get('/customer', 'index')->name('customer');
        Route::get('/customer/addEdit', 'addEdit')->name('customer.addEdit');
        Route::post('/customer/addAction', 'addAction')->name('customer.addAction');
        Route::post('/customer/delete', 'delete')->name('customer.delete');
    });

    Route::controller('SellerController')->group(function () {
        Route::get('/seller', 'index')->name('seller');
        Route::get('/seller/list', 'list')->name('seller.list');
        Route::get('/seller/addEdit', 'addEdit')->name('seller.addEdit');
        Route::post('/seller/addAction', 'addAction')->name('seller.addAction');
        Route::post('/seller/delete', 'delete')->name('seller.delete');
        Route::get('/seller/detail', 'detail')->name('seller.detail');
        Route::get('/seller/import', 'import')->name('seller.import');
        Route::post('/seller/importAction', 'importAction')->name('seller.importAction');
        Route::post('/seller/activityAction', 'activityAction')->name('seller.activityAction');
        Route::get('/seller/editData', 'editData')->name('seller.editData');
        Route::post('/seller/updateStatus', 'updateStatus')->name('seller.updateStatus');
    });

    Route::controller('LeaserController')->group(function () {
        Route::get('/leaser', 'index')->name('leaser');
        Route::get('/leaser/list', 'list')->name('leaser.list');
        Route::get('/leaser/addEdit', 'addEdit')->name('leaser.addEdit');
        Route::post('/leaser/addAction', 'addAction')->name('leaser.addAction');
        Route::post('/leaser/delete', 'delete')->name('leaser.delete');
        Route::get('/leaser/detail', 'detail')->name('leaser.detail');
        Route::get('/leaser/import', 'import')->name('leaser.import');
        Route::post('/leaser/importAction', 'importAction')->name('leaser.importAction');
        Route::post('/leaser/activityAction', 'activityAction')->name('leaser.activityAction');
        Route::get('/leaser/editData', 'editData')->name('leaser.editData');
        Route::post('/leaser/updateStatus', 'updateStatus')->name('leaser.updateStatus');
    });

    Route::controller('DeveloperController')->group(function () {
        Route::get('/developer', 'index')->name('developer');
        Route::get('/developer/addEdit', 'addEdit')->name('developer.addEdit');
        Route::post('/developer/addAction', 'addAction')->name('developer.addAction');
        Route::post('/developer/delete', 'delete')->name('developer.delete');
    });

    Route::controller('ProjectController')->group(function () {
        Route::get('/project', 'index')->name('project');
        Route::get('/project/view', 'view')->name('project.view');
        Route::get('/project/addEdit', 'addEdit')->name('project.addEdit');
        Route::post('/project/addAction', 'addAction')->name('project.addAction');
        Route::post('/project/delete', 'delete')->name('project.delete');
    });

    Route::controller('ProjectDetailController')->group(function () {
        Route::get('/project/detail', 'index')->name('projectdetail');
        Route::get('/project/detail/addEdit', 'addEdit')->name('projectdetail.addEdit');
        Route::post('/project/detail/addAction', 'addAction')->name('projectdetail.addAction');
        Route::post('/project/detail/delete', 'delete')->name('projectdetail.delete');
    });

    Route::controller('ProjectDocController')->group(function () {
        Route::get('/project/doc', 'index')->name('projectdoc');
        Route::get('/project/doc/addEdit', 'addEdit')->name('projectdoc.addEdit');
        Route::post('/project/doc/addAction', 'addAction')->name('projectdoc.addAction');
        Route::post('/project/doc/delete', 'delete')->name('projectdoc.delete');
    });

    Route::controller('LocationController')->group(function () {
        Route::get('/location', 'index')->name('location');
        Route::get('/location/addEdit', 'addEdit')->name('location.addEdit');
        Route::post('/location/addAction', 'addAction')->name('location.addAction');
        Route::post('/location/delete', 'delete')->name('location.delete');
    });

});

Route::middleware(['auth', 'role:admin'])->group(function () { 
    Route::controller('AmenityController')->group(function () {
        Route::get('/amenity', 'index')->name('amenity');
        Route::get('/amenity/addEdit', 'addEdit')->name('amenity.addEdit');
        Route::post('/amenity/addAction', 'addAction')->name('amenity.addAction');
        Route::post('/amenity/delete', 'delete')->name('amenity.delete');
    });

    Route::controller('StatusController')->group(function () {
        Route::get('/status', 'index')->name('status');
        Route::get('/status/addEdit', 'addEdit')->name('status.addEdit');
        Route::post('/status/addAction', 'addAction')->name('status.addAction');
        Route::post('/status/delete', 'delete')->name('status.delete');
    });

    Route::controller('ActivityTypeController')->group(function () {
        Route::get('/activityType', 'index')->name('activityType');
        Route::get('/activityType/addEdit', 'addEdit')->name('activityType.addEdit');
        Route::post('/activityType/addAction', 'addAction')->name('activityType.addAction');
        Route::post('/activityType/delete', 'delete')->name('activityType.delete');
    });

    Route::controller('PropertyController')->group(function () {
        Route::get('/property', 'index')->name('property');
        Route::get('/property/addEdit', 'addEdit')->name('property.addEdit');
        Route::post('/property/addAction', 'addAction')->name('property.addAction');
        Route::post('/property/delete', 'delete')->name('property.delete');
    });

    Route::controller('PropertyTypeController')->group(function () {
        Route::get('/propertyType', 'index')->name('propertyType');
        Route::get('/propertyType/addEdit', 'addEdit')->name('propertyType.addEdit');
        Route::post('/propertyType/addAction', 'addAction')->name('propertyType.addAction');
        Route::post('/propertyType/delete', 'delete')->name('propertyType.delete');
    });
});

require __DIR__ . '/auth.php';