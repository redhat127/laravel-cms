<?php

namespace App\Http\Controllers;

use App\Mail\Auth\EmailVerificationMail;
use App\Models\User;
use App\Models\UserToken;
use App\Models\UserTokenType;
use App\Trait\CustomRuleValidation;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{
    use CustomRuleValidation;

    public function get()
    {
        return inertia('auth/register');
    }

    public function post()
    {
        $validated = request()->validate([
            'name' => $this->nameRule(),
            'email' => $this->emailRule(checkUniqueness: true),
            'password' => $this->passwordRule(min: 10),
        ]);

        $user = User::create($validated);

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

        return redirect()->route('auth.login.get')
            ->with('flash_message', [
                'type' => 'success',
                'text' => 'You are registered. check your email to verify your account.',
            ]);
    }
}
