<?php

use App\Models\UserToken;
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {
    UserToken::where('expires_at', '<', now())->delete();
})->daily();
