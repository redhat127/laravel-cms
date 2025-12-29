<x-mail::message>
# Email Verification

Dear {{ $name }},

@if($isEmailChange)
You recently changed your email address. Please verify your new email by clicking the button below.
@else
Thank you for registering with {{ config('app.name') }}! Please verify your email address by clicking the button below.
@endif

<x-mail::button :url="$link">
Verify
</x-mail::button>

This verification link will expire in {{ $expires_in_minutes }} minutes.

@if($isEmailChange)
If you did not make this change, please contact our support team immediately.
@else
If you did not create an account, no further action is required.
@endif

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>