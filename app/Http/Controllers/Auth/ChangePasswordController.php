<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\Account\YourPasswordChangedMail;
use App\Models\User;
use App\Models\UserTokenType;
use App\Trait\CustomRuleValidation;
use Illuminate\Support\Facades\Mail;

class ChangePasswordController extends Controller
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

        return inertia('auth/change-password', $validator->validated());
    }

    public function post()
    {
        $validated = request()->validate([
            'email' => $this->emailRule(),
            'token' => $this->tokenRule(),
            'password' => $this->passwordRule(10),
        ]);

        $email = $validated['email'];
        $token = $validated['token'];
        $password = $validated['password'];

        $user = User::whereEmail($email)->first();

        if (! $user) {
            abort(404);
        }

        $userToken = $user->userTokens()
            ->where('type', UserTokenType::RESET_PASSWORD)
            ->first();

        if (! $userToken || ! $userToken->isValid($token)) {
            return redirect()->route('auth.login.get')
                ->with('flash_message', [
                    'type' => 'error',
                    'text' => 'Token is invalid or expired. try again.',
                ]);
        }

        $user->update([
            'password' => $password,
            'password_changed_at' => now(),
            'remember_token' => null,
        ]);

        $userToken->delete();

        $user->logoutOtherDevices();

        Mail::to($user)->send(new YourPasswordChangedMail(
            name: $user->name,
            password_changed_at: $user->password_changed_at
        ));

        return redirect()->route('auth.login.get')
            ->with('flash_message', [
                'type' => 'success',
                'text' => 'Your password has been changed. use it to login.',
            ]);
    }
}
