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

    public function passwordRule($min = 1)
    {
        return ['bail', 'required', 'string', 'min:'.$min, 'max:50'];
    }

    public function remember_meRule()
    {
        return ['bail', 'required', 'boolean'];
    }

    public function nameRule()
    {
        return ['bail', 'required', 'string', 'min:3', 'max:50', 'regex:/^[a-zA-Z0-9 _-]+$/'];
    }
}
