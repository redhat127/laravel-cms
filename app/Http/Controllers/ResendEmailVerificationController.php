<?php

namespace App\Http\Controllers;

use App\Mail\Auth\EmailVerificationMail;
use App\Models\User;
use App\Models\UserToken;
use App\Models\UserTokenType;
use App\Trait\CustomRuleValidation;
use Illuminate\Support\Facades\Mail;

class ResendEmailVerificationController extends Controller
{
    use CustomRuleValidation;

    public function get()
    {
        return inertia('auth/resend-email-verification');
    }

    public function post()
    {
        $validated = request()->validate([
            'email' => $this->emailRule(),
        ]);

        $email = $validated['email'];

        $user = User::where('email', $email)
            ->where('email_verified_at', null)
            ->first();

        if ($user) {
            [$token, $expires_in_minutes] = UserToken::createToken(
                user: $user,
                type: UserTokenType::EMAIL_VERIFICATION,
                expires_in_minutes: 60
            );

            Mail::to($user)->send(new EmailVerificationMail(
                name: $user->name,
                email: $user->email,
                token: $token,
                expires_in_minutes: $expires_in_minutes
            ));
        }

        return redirect()->route('auth.login.get')
            ->with('flash_message', [
                'type' => 'success',
                'text' => 'If an account exists, we have sent a new verification email.',
            ]);
    }
}
