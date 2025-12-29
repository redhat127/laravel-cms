<x-mail::message>
# {{ $subject }}

Dear {{ $name }},

You recently requested to change your email from **{{ $old_email }}** to **{{ $new_email }}**.

Please confirm this change by clicking the button below.

<x-mail::button :url="$link">
Confirm
</x-mail::button>

This confirmation link will expire in {{ $expires_in_minutes }} minutes.

If you did not request this email change, please ignore this email or contact our support team immediately.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
