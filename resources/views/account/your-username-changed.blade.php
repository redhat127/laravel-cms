<x-mail::message>
# {{ $subject }}

Dear {{ $name }},

Your username has been successfully changed from **{{ $old_username }}** to **{{ $new_username }}**.

**Changed on:**
- UTC: {{ $username_changed_at_utc }}
- Tehran: {{ $username_changed_at_tehran }}

If you did not make this change, please contact our support team immediately to secure your account.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
