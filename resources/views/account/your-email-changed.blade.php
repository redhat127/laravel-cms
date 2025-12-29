<x-mail::message>
# {{ $subject }}

Dear {{ $name }},

Your email has been successfully changed from **{{ $old_email }}** to **{{ $new_email }}**. you need to verify your new email to login.

**Changed on:**
- UTC: {{ $email_changed_at_utc }}
- Tehran: {{ $email_changed_at_tehran }}

If you did not make this change, please contact our support team immediately to secure your account.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

