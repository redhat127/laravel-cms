<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Trait\CustomRuleValidation;
use Illuminate\Support\Facades\Auth;
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

        if (Auth::attempt($credentials, $validated['remember_me'])) {
            request()->session()->regenerate();

            inertia()->flash('flash_message', [
                'type' => 'success',
                'text' => 'You are logged in.',
            ]);

            return redirect()->intended();
        }

        throw ValidationException::withMessages([
            'email' => 'email or password is wrong.',
        ]);
    }
}
