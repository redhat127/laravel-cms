<x-mail::message>
# {{ $subject }}

Dear {{ $name }},

Your account has been successfully deleted as requested.

**Deleted on:**
- UTC: {{ $account_deleted_at_utc }}
- Tehran: {{ $account_deleted_at_tehran }}

All your personal data and associated information have been permanently removed from our systems.

**If you did NOT request this deletion**, please contact our support team immediately. We may be able to help recover your account within a limited timeframe.

We're sorry to see you go. If you decide to return in the future, you're always welcome to create a new account.

If you have any questions or need assistance, please don't hesitate to contact our support team.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
