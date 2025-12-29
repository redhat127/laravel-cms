<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\Auth\ResetPasswordMail;
use App\Models\User;
use App\Models\UserToken;
use App\Models\UserTokenType;
use App\Trait\CustomRuleValidation;
use Illuminate\Support\Facades\Mail;

class ResetPasswordController extends Controller
{
    use CustomRuleValidation;

    public function get()
    {
        return inertia('auth/reset-password');
    }

    public function post()
    {
        $validated = request()->validate([
            'email' => $this->emailRule(),
        ]);

        $email = $validated['email'];

        $user = User::where('email', $email)->first();

        if ($user) {
            [$token, $expires_in_minutes] = UserToken::createToken(
                user: $user,
                type: UserTokenType::RESET_PASSWORD,
                expires_in_minutes: 15
            );

            Mail::to($user)->send(new ResetPasswordMail(
                name: $user->name,
                email: $user->email,
                token: $token,
                expires_in_minutes: $expires_in_minutes
            ));
        }

        return redirect()->route('auth.login.get')
            ->with('flash_message', [
                'type' => 'success',
                'text' => 'If an account exists, we have sent a reset password email.',
            ]);
    }
}
