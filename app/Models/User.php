<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasUlids, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    private static function generateUniqueUsername(): string
    {
        do {
            $username = 'user_'.Str::lower(Str::random(10));
        } while (static::whereUsername($username)->exists());

        return $username;
    }

    protected static function booted()
    {
        static::creating(function ($user) {
            if (empty($user->username)) {
                $user->username = static::generateUniqueUsername();
            }
        });
    }
}
