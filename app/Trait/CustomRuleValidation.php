<?php

namespace App\Trait;

use Illuminate\Validation\Rule;

trait CustomRuleValidation
{
    public function emailRule($checkUniqueness = false)
    {
        $rules = ['bail', 'required', 'string', 'email', 'max:50'];

        if ($checkUniqueness) {
            $rules[] = Rule::unique('users', 'email');
        }

        return $rules;
    }

    public function passwordRule($min = 1, $checkCurrentPassword = false)
    {
        $rules = ['bail', 'required', 'string', 'min:'.$min, 'max:50'];

        if ($checkCurrentPassword) {
            $rules[] = 'current_password';
        }

        return $rules;
    }

    public function remember_meRule()
    {
        return ['bail', 'required', 'boolean'];
    }

    public function nameRule()
    {
        return ['bail', 'required', 'string', 'min:3', 'max:50', 'regex:/^[a-zA-Z0-9 _-]+$/'];
    }

    public function usernameRule(?string $uniqueIgnoreId = null)
    {
        $rules = [
            'bail',
            'required',
            'string',
            'min:6',
            'max:50',
            'lowercase',
            'regex:/^[a-z0-9][a-z0-9_-]*$/',
            Rule::notIn(['admin', 'root', 'system', 'support', 'api', 'www', 'mail', 'help']),
        ];

        $uniqueRule = Rule::unique('users', 'username');

        if ($uniqueIgnoreId) {
            $uniqueRule->ignore($uniqueIgnoreId);
        }

        $rules[] = $uniqueRule;

        return $rules;
    }

    public function tokenRule()
    {
        return ['bail', 'required', 'string', 'max:64'];
    }
}
