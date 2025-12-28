<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserTokenType;
use App\Trait\CustomRuleValidation;

class EmailVerificationController extends Controller
{
    use CustomRuleValidation;

    public function get(string $email, string $token)
    {
        $validator = validator([
            'email' => $email,
            'token' => $token,
        ], [
            'email' => $this->emailRule(),
            'token' => $this->tokenRule(),
        ]);

        if ($validator->fails()) {
            abort(404);
        }

        $validated = $validator->validated();

        $email = $validated['email'];
        $token = $validated['token'];

        $user = User::whereEmail($email)->first();

        if (! $user || $user->email_verified_at) {
            abort(404);
        }

        $userToken = $user->userTokens
            ->where('type', UserTokenType::EMAIL_VERIFICATION)
            ->first();

        if (! $userToken || ! $userToken->isValid($token)) {
            return redirect()->route('auth.login.get')
                ->with('flash_message', [
                    'type' => 'error',
                    'text' => 'Token is invalid or expired. try again.',
                ]);
        }

        $user->email_verified_at = now();
        $user->save();

        $userToken->delete();

        return redirect()->route('auth.login.get')
            ->with('flash_message', [
                'type' => 'success',
                'text' => 'Your email has been verified. you can now login.',
            ]);
    }
}
