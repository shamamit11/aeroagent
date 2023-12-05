<?php

use Illuminate\Support\Facades\Route;

//Common Controller
Route::controller('CommonController')->group(function () {
    Route::get('/change-locale/{locale}', 'changeLocale')->name('change.locale');
});

//Common Controller - Verified
Route::middleware(['auth', 'verified', 'role:admin,agent,affiliate'])->group(function () {
    Route::controller('CommonController')->group(function () {
        Route::get('/', 'index')->name('/');
    });
});


//Agent & Affiliate Routes
Route::middleware(['auth', 'verified', 'role:agent,affiliate', 'check.subscription'])->group(function () {

    Route::controller('Agent\AgentDashboardController')->group(function () {
        Route::get('/wallet-dashboard', 'wallet')->name('wallet.dashboard');
    });

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
});

//Payment Page
Route::middleware(['auth', 'verified', 'role:agent,affiliate'])->group(function () {
    Route::controller('Agent\PaymentController')->group(function () {
        Route::get('/renew-subscription', 'index')->name('renew-subscription');
        Route::post('/pay-through-wallet', 'payThroughWallet')->name('pay-through-wallet');
        Route::post('/generate-stripe-session', 'generateStripeSession')->name('generate-stripe-session');
        Route::get('/payment-confirmation', 'paymentConfirmation')->name('payment-confirmation');
    });
});

//Agent Only Routes
Route::middleware(['auth', 'verified', 'role:agent', 'check.subscription'])->group(function () {

    Route::controller('Agent\AgentDashboardController')->group(function () {
        Route::get('/dashboard', 'index')->name('dashboard');
    });
    
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
        Route::get('/request-seller', 'requestList')->name('seller.request');
        Route::get('/seller/deals', 'deals')->name('seller.deals');
        Route::get('/seller/stock', 'stock')->name('seller.stock');
        Route::get('/seller/stock/list', 'stockList')->name('seller.stock.list');
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
        Route::get('/request-leaser', 'requestList')->name('leaser.request');
        Route::get('/leaser/deals', 'deals')->name('leaser.deals');
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
        Route::get('/request-tenant', 'requestList')->name('tenant.request');
        Route::get('/tenant/deals', 'deals')->name('tenant.deals');
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
        Route::get('/request-buyer', 'requestList')->name('buyer.request');
        Route::get('/buyer/deals', 'deals')->name('buyer.deals');
    });

    Route::controller('Agent\FeedController')->group(function () {
        Route::get('/feed', 'index')->name('feed');
        Route::get('/feed/view', 'view')->name('feed.view');
        Route::get('/feed/addEdit', 'addEdit')->name('feed.addEdit');
        Route::post('/feed/addAction', 'addAction')->name('feed.addAction');
        Route::post('/feed/delete', 'delete')->name('feed.delete');
        Route::get('/feed/list', 'list')->name('feed.all');
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

    Route::controller('Agent\ActivityLogController')->group(function () {
        Route::get('/activity-log', 'index')->name('activity-log');
        Route::post('/activity-log/view', 'view')->name('activitylog.view');
    });
});


//Admin Only Routes
Route::middleware(['auth', 'role:admin'])->group(function () {

    Route::controller('Admin\AdminDashboardController')->group(function () {
        Route::get('/admin/dashboard', 'index')->name('admin.dashboard');
    });

    Route::controller('Admin\UserController')->group(function () {
        Route::get('/admin/user', 'index')->name('admin.user');
        Route::get('/admin/user/addEdit', 'addEdit')->name('admin.user.addEdit');
        Route::post('/admin/user/addAction', 'addAction')->name('admin.user.addAction');
        Route::post('/admin/user/delete', 'delete')->name('admin.user.delete');
        Route::get('/admin/user/view', 'view')->name('admin.user.view');
    });

    Route::controller('Admin\PayoutController')->group(function () {
        Route::get('/admin/payout', 'index')->name('admin.payout');
        Route::post('/admin/payout/store', 'store')->name('admin.payout.store');
        Route::get('/admin/payout/list', 'listPayouts')->name('admin.payout.list');
    });

    Route::controller('Admin\AmenityController')->group(function () {
        Route::get('/admin/amenity', 'index')->name('admin.amenity');
        Route::get('/admin/amenity/addEdit', 'addEdit')->name('admin.amenity.addEdit');
        Route::post('/admin/amenity/addAction', 'addAction')->name('admin.amenity.addAction');
        Route::post('/admin/amenity/delete', 'delete')->name('admin.amenity.delete');
    });

    Route::controller('Admin\StatusController')->group(function () {
        Route::get('/admin/status', 'index')->name('admin.status');
        Route::get('/admin/status/addEdit', 'addEdit')->name('admin.status.addEdit');
        Route::post('/admin/status/addAction', 'addAction')->name('admin.status.addAction');
        Route::post('/admin/status/delete', 'delete')->name('admin.status.delete');
    });

    Route::controller('Admin\ActivityTypeController')->group(function () {
        Route::get('/admin/activityType', 'index')->name('admin.activityType');
        Route::get('/admin/activityType/addEdit', 'addEdit')->name('admin.activityType.addEdit');
        Route::post('/admin/activityType/addAction', 'addAction')->name('admin.activityType.addAction');
        Route::post('/admin/activityType/delete', 'delete')->name('admin.activityType.delete');
    });

    Route::controller('Admin\PropertyController')->group(function () {
        Route::get('/admin/property', 'index')->name('admin.property');
        Route::get('/admin/property/addEdit', 'addEdit')->name('admin.property.addEdit');
        Route::post('/admin/property/addAction', 'addAction')->name('admin.property.addAction');
        Route::post('/admin/property/delete', 'delete')->name('admin.property.delete');
    });

    Route::controller('Admin\PropertyTypeController')->group(function () {
        Route::get('/admin/propertyType', 'index')->name('admin.propertyType');
        Route::get('/admin/propertyType/addEdit', 'addEdit')->name('admin.propertyType.addEdit');
        Route::post('/admin/propertyType/addAction', 'addAction')->name('admin.propertyType.addAction');
        Route::post('/admin/propertyType/delete', 'delete')->name('admin.propertyType.delete');
    });

    Route::controller('Admin\SettingController')->group(function () {
        Route::get('/admin/settings', 'index')->name('admin.settings');
        Route::post('/admin/settings/updateProfile', 'updateProfile')->name('admin.settings.updateProfile');
        Route::post('/admin/settings/updatePassword', 'updatePassword')->name('admin.settings.updatePassword');
    });

    Route::controller('Admin\ActivityLogController')->group(function () {
        Route::get('/admin/activity-log', 'index')->name('admin.activity-log');
        Route::post('/admin/activity-log/view', 'view')->name('admin.activitylog.view');
    });
});

require __DIR__ . '/auth.php';

Route::get('/{any}', function () { return view('app'); })->where('any', '.*');