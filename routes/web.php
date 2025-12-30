<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Auth\ChangePasswordController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ResendEmailVerificationController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('home');
})->name('home');

Route::middleware('guest')
    ->group(function () {
        Route::prefix('auth')
            ->name('auth.')
            ->group(function () {
                Route::prefix('login')
                    ->name('login.')
                    ->controller(LoginController::class)
                    ->group(function () {
                        Route::get('/', 'get')->name('get');
                        Route::post('/', 'post')->name('post');
                    });

                Route::prefix('register')
                    ->name('register.')
                    ->controller(RegisterController::class)
                    ->group(function () {
                        Route::get('/', 'get')->name('get');
                        Route::post('/', 'post')->name('post');
                    });

                Route::prefix('email-verification')
                    ->name('email-verification.')
                    ->controller(EmailVerificationController::class)
                    ->group(function () {
                        Route::get('/{email}/{token}', 'get')->name('get');
                    });

                Route::prefix('resend-email-verification')
                    ->name('resend-email-verification.')
                    ->controller(ResendEmailVerificationController::class)
                    ->group(function () {
                        Route::get('/', 'get')->name('get');
                        Route::post('/', 'post')->name('post');
                    });

                Route::prefix('reset-password')
                    ->name('reset-password.')
                    ->controller(ResetPasswordController::class)
                    ->group(function () {
                        Route::get('/', 'get')->name('get');
                        Route::post('/', 'post')->name('post');
                    });

                Route::prefix('change-password')
                    ->name('change-password.')
                    ->controller(ChangePasswordController::class)
                    ->group(function () {
                        Route::get('/{email}/{token}', 'get')->name('get');
                        Route::post('/', 'post')->name('post');
                    });
            });
    });

Route::middleware('auth')
    ->group(function () {
        Route::prefix('auth')
            ->name('auth.')
            ->group(function () {
                Route::prefix('logout')
                    ->name('logout.')
                    ->controller(LogoutController::class)
                    ->group(function () {
                        Route::post('/', 'post')->name('post');
                    });
            });

        Route::prefix('account')
            ->name('account.')
            ->controller(AccountController::class)
            ->group(function () {
                Route::get('/', 'get')->name('get');
                Route::patch('/profile-details', 'profileDetails')
                    ->name('profileDetails');

                Route::post('/update-avatar', 'updateAvatar')
                    ->name('updateAvatar');

                Route::delete('/delete-avatar', 'deleteAvatar')
                    ->name('deleteAvatar');

                Route::get('/confirm-username-change/{token}', 'confirmUsernameChange')
                    ->name('confirmUsernameChange');

                Route::patch('/change-password', 'changePassword')
                    ->name('changePassword');

                Route::patch('/change-email', 'changeEmail')
                    ->name('changeEmail');
                Route::get('/confirm-email-change/{token}', 'confirmEmailChange')
                    ->name('confirmEmailChange');

                Route::delete('/', 'deleteMyAccount')
                    ->name('deleteMyAccount');
            });
    });
