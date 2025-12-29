<x-mail::message>
# {{ $subject }}

Dear {{ $name }},

Your password has been successfully changed.

**Changed on:**
- UTC: {{ $password_changed_at_utc }}
- Tehran: {{ $password_changed_at_tehran }}

For your security, you have been logged out of all other devices. If you have a current session, it remains active.

If you made this change, you can safely ignore this email.

**If you did NOT make this change**, your account may be compromised. Please take action immediately:

- **If you're logged in:** Go to your account page to change your password
- **If you're not logged in:** Click the button below to reset your password

<x-mail::button :url="route('auth.reset-password.get')">
Reset Password Now
</x-mail::button>

If you need assistance, please contact our support team.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>