<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:admin,agent,affiliate', 'check.subscription'])->group(function () {
    Route::controller('DashboardController')->group(function () {
        Route::get('/', 'index')->name('dashboard');
    });
});


//Agent & Affiliate Routes

Route::middleware(['auth', 'verified', 'role:agent,affiliate', 'check.subscription'])->group(function () {
    Route::controller('Agent\WalletController')->group(function () {
        Route::get('/wallet', 'index')->name('wallet');
        Route::get('/wallet/payout', 'payout')->name('wallet.payout');
        Route::get('/wallet/renewal', 'renewal')->name('wallet.renewal');
    });

    Route::controller('Agent\ReferralController')->group(function () {
        Route::get('/referral', 'index')->name('referral');
    });

    Route::controller('Agent\SettingController')->group(function () {
        Route::get('/settings', 'index')->name('settings');
        Route::post('/settings/updateProfile', 'updateProfile')->name('settings.updateProfile');
        Route::post('/settings/updatePassword', 'updatePassword')->name('settings.updatePassword');
        Route::post('/settings/updateBank', 'updateBank')->name('settings.updateBank');
    });

    Route::controller('Agent\ActivityLogController')->group(function () {
        Route::get('/activity-log', 'index')->name('activity-log');
        Route::post('/activity-log/view', 'view')->name('activitylog.view');
    });
});

//Agent Only Routes

Route::middleware(['auth', 'verified', 'role:agent', 'check.subscription'])->group(function () {

    Route::controller('Agent\CustomerController')->group(function () {
        Route::get('/customer', 'index')->name('customer');
        Route::get('/customer/addEdit', 'addEdit')->name('customer.addEdit');
        Route::post('/customer/addAction', 'addAction')->name('customer.addAction');
        Route::post('/customer/delete', 'delete')->name('customer.delete');
    });

    Route::controller('Agent\SellerController')->group(function () {
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

    Route::controller('Agent\LeaserController')->group(function () {
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

    Route::controller('Agent\TenantController')->group(function () {
        Route::get('/tenant', 'index')->name('tenant');
        Route::get('/tenant/addEdit', 'addEdit')->name('tenant.addEdit');
        Route::post('/tenant/addAction', 'addAction')->name('tenant.addAction');
        Route::post('/tenant/delete', 'delete')->name('tenant.delete');
        Route::get('/tenant/detail', 'detail')->name('tenant.detail');
        Route::get('/tenant/import', 'import')->name('tenant.import');
        Route::post('/tenant/importAction', 'importAction')->name('tenant.importAction');
        Route::post('/tenant/activityAction', 'activityAction')->name('tenant.activityAction');
        Route::get('/tenant/editData', 'editData')->name('tenant.editData');
        Route::post('/tenant/updateStatus', 'updateStatus')->name('tenant.updateStatus');
    });

    Route::controller('Agent\BuyerController')->group(function () {
        Route::get('/buyer', 'index')->name('buyer');
        Route::get('/buyer/addEdit', 'addEdit')->name('buyer.addEdit');
        Route::post('/buyer/addAction', 'addAction')->name('buyer.addAction');
        Route::post('/buyer/delete', 'delete')->name('buyer.delete');
        Route::get('/buyer/detail', 'detail')->name('buyer.detail');
        Route::get('/buyer/import', 'import')->name('buyer.import');
        Route::post('/buyer/importAction', 'importAction')->name('buyer.importAction');
        Route::post('/buyer/activityAction', 'activityAction')->name('buyer.activityAction');
        Route::get('/buyer/editData', 'editData')->name('buyer.editData');
        Route::post('/buyer/updateStatus', 'updateStatus')->name('buyer.updateStatus');
    });

    Route::controller('Agent\FollowupController')->group(function () {
        Route::get('/followup', 'index')->name('followup');
        Route::post('/followup/delete', 'delete')->name('followup.delete');
    });

    Route::controller('Agent\ViewingController')->group(function () {
        Route::get('/viewing', 'index')->name('viewing');
        Route::post('/viewing/delete', 'delete')->name('viewing.delete');
    });

    Route::controller('Agent\MeetingController')->group(function () {
        Route::get('/meeting', 'index')->name('meeting');
        Route::post('/meeting/updateStatus', 'updateStatus')->name('meeting.updateStatus');
        Route::post('/meeting/delete', 'delete')->name('meeting.delete');
    });

    Route::controller('Agent\DeveloperController')->group(function () {
        Route::get('/developer', 'index')->name('developer');
        Route::get('/developer/addEdit', 'addEdit')->name('developer.addEdit');
        Route::post('/developer/addAction', 'addAction')->name('developer.addAction');
        Route::post('/developer/delete', 'delete')->name('developer.delete');
    });

    Route::controller('Agent\ProjectController')->group(function () {
        Route::get('/project', 'index')->name('project');
        Route::get('/project/view', 'view')->name('project.view');
        Route::get('/project/addEdit', 'addEdit')->name('project.addEdit');
        Route::post('/project/addAction', 'addAction')->name('project.addAction');
        Route::post('/project/delete', 'delete')->name('project.delete');
    });

    Route::controller('Agent\ProjectDetailController')->group(function () {
        Route::get('/project/detail', 'index')->name('projectdetail');
        Route::get('/project/detail/addEdit', 'addEdit')->name('projectdetail.addEdit');
        Route::post('/project/detail/addAction', 'addAction')->name('projectdetail.addAction');
        Route::post('/project/detail/delete', 'delete')->name('projectdetail.delete');
    });

    Route::controller('Agent\ProjectDocController')->group(function () {
        Route::get('/project/doc', 'index')->name('projectdoc');
        Route::get('/project/doc/addEdit', 'addEdit')->name('projectdoc.addEdit');
        Route::post('/project/doc/addAction', 'addAction')->name('projectdoc.addAction');
        Route::post('/project/doc/delete', 'delete')->name('projectdoc.delete');
    });

    Route::controller('Agent\LocationController')->group(function () {
        Route::get('/location', 'index')->name('location');
        Route::get('/location/addEdit', 'addEdit')->name('location.addEdit');
        Route::post('/location/addAction', 'addAction')->name('location.addAction');
        Route::post('/location/delete', 'delete')->name('location.delete');
    });
});

//Admin Routes

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::controller('Admin\AmenityController')->group(function () {
        Route::get('/amenity', 'index')->name('amenity');
        Route::get('/amenity/addEdit', 'addEdit')->name('amenity.addEdit');
        Route::post('/amenity/addAction', 'addAction')->name('amenity.addAction');
        Route::post('/amenity/delete', 'delete')->name('amenity.delete');
    });

    Route::controller('Admin\StatusController')->group(function () {
        Route::get('/status', 'index')->name('status');
        Route::get('/status/addEdit', 'addEdit')->name('status.addEdit');
        Route::post('/status/addAction', 'addAction')->name('status.addAction');
        Route::post('/status/delete', 'delete')->name('status.delete');
    });

    Route::controller('Admin\ActivityTypeController')->group(function () {
        Route::get('/activityType', 'index')->name('activityType');
        Route::get('/activityType/addEdit', 'addEdit')->name('activityType.addEdit');
        Route::post('/activityType/addAction', 'addAction')->name('activityType.addAction');
        Route::post('/activityType/delete', 'delete')->name('activityType.delete');
    });

    Route::controller('Admin\PropertyController')->group(function () {
        Route::get('/property', 'index')->name('property');
        Route::get('/property/addEdit', 'addEdit')->name('property.addEdit');
        Route::post('/property/addAction', 'addAction')->name('property.addAction');
        Route::post('/property/delete', 'delete')->name('property.delete');
    });

    Route::controller('Admin\PropertyTypeController')->group(function () {
        Route::get('/propertyType', 'index')->name('propertyType');
        Route::get('/propertyType/addEdit', 'addEdit')->name('propertyType.addEdit');
        Route::post('/propertyType/addAction', 'addAction')->name('propertyType.addAction');
        Route::post('/propertyType/delete', 'delete')->name('propertyType.delete');
    });
});

require __DIR__ . '/auth.php';