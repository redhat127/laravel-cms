<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            'username_changed_at' => 'datetime',
            'email_verified_at' => 'datetime',
            'email_changed_at' => 'datetime',
            'password' => 'hashed',
            'password_changed_at' => 'datetime',
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

    public function userTokens()
    {
        return $this->hasMany(UserToken::class);
    }

    public function logoutOtherDevices()
    {
        DB::table('sessions')
            ->where('user_id', Auth::id())
            ->where('id', '!=', session()->getId())
            ->delete();
    }

    public function logoutAllDevices()
    {
        DB::table('sessions')
            ->where('user_id', $this->id)
            ->delete();
    }
}
