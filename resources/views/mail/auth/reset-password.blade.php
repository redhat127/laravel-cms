<x-mail::message>
# {{ $subject }}

Dear {{ $name }},

You have requested to reset your password. Please click the button below to create a new password.

<x-mail::button :url="$link">
Reset Password
</x-mail::button>

This password reset link will expire in {{ $expires_in_minutes }} minutes.

If you did not request a password reset, please ignore this email or contact our support team if you have concerns.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>