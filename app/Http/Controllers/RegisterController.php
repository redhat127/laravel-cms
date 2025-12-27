<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Trait\CustomRuleValidation;

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

        User::create($validated);

        inertia()->flash('flash_message', [
            'type' => 'success',
            'text' => 'You are registered.',
        ]);

        return redirect()->route('auth.login.get');
    }
}
