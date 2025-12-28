<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Trait\CustomRuleValidation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    use CustomRuleValidation;

    public function get()
    {
        return inertia('auth/login');
    }

    public function post()
    {
        $validated = request()->validate([
            'email' => $this->emailRule(),
            'password' => $this->passwordRule(),
            'remember_me' => $this->remember_meRule(),
        ]);

        $credentials = collect($validated)->except('remember_me')->all();

        $user = User::where('email', $credentials['email'])
            ->where('email_verified_at', '!=', null)
            ->first();

        if ($user && Hash::check($credentials['password'], $user->password)) {
            Auth::login($user, $validated['remember_me']);

            request()->session()->regenerate();

            return redirect()->intended()
                ->with('flash_message', [
                    'type' => 'success',
                    'text' => 'You are logged in.',
                ]);
        }

        throw ValidationException::withMessages([
            'email' => 'Invalid email or password. check your credentials or verify your account.',
        ]);
    }
}
