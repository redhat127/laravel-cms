<x-mail::message>
# {{ $subject }}

Dear {{ $name }},

Your email has been successfully changed from **{{ $old_email }}** to **{{ $new_email }}**. A verification email has been sent to your new email address.

**Changed on:**
- UTC: {{ $email_changed_at_utc }}
- Tehran: {{ $email_changed_at_tehran }}

**Important:** You will need to verify your new email address before you can login again.

If you did not make this change, please contact our support team immediately to secure your account.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
