<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

enum UserTokenType: string
{
    case EMAIL_VERIFICATION = 'email-verification';
    case CHANGE_USERNAME = 'change-username';
    case CHANGE_EMAIL = 'change-email';
    case RESET_PASSWORD = 'reset-password';
}

class UserToken extends Model
{
    use HasUlids;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function casts()
    {
        return [
            'token' => 'hashed',
            'type' => UserTokenType::class,
            'expires_at' => 'datetime',
            'payload' => 'array',
        ];
    }

    public static function createToken(
        User $user,
        UserTokenType $type,
        int $expires_in_minutes,
        ?array $payload = null
    ): array {
        $token = Str::random(64);

        self::updateOrCreate(
            [
                'type' => $type,
                'user_id' => $user->id,
            ],
            [
                'token' => $token,
                'expires_at' => now()->addMinutes($expires_in_minutes),
                'payload' => $payload,
            ]
        );

        return [$token, $expires_in_minutes];
    }

    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    public function isValid(string $token): bool
    {
        return ! $this->isExpired() && Hash::check($token, $this->token);
    }
}
