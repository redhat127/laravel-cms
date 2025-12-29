<?php

namespace App\Mail\Account;

use Carbon\CarbonImmutable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Queue\ShouldQueueAfterCommit;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;

class YourAccountDeletedMail extends Mailable implements ShouldQueue, ShouldQueueAfterCommit
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public string $name,
        private CarbonImmutable|Carbon $account_deleted_at,
        public $subject = 'Your Account Deleted'
    ) {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(config('mail.from.no-reply-address'), config('app.name')),
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'account/your-account-deleted',
            with: [
                'account_deleted_at_utc' => $this->account_deleted_at->copy()->setTimezone('UTC')->format('F j, Y \a\t g:i A'),
                'account_deleted_at_tehran' => $this->account_deleted_at->copy()->setTimezone('Asia/Tehran')->format('F j, Y \a\t g:i A'),
            ]
        );
    }
}
