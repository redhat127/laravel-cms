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

class YourEmailChangedMail extends Mailable implements ShouldQueue, ShouldQueueAfterCommit
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public string $name,
        public string $old_email,
        public string $new_email,
        private CarbonImmutable|Carbon $email_changed_at,
        public $subject = 'Your Email Changed'
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
            markdown: 'account/your-email-changed',
            with: [
                'email_changed_at_utc' => $this->email_changed_at->copy()->setTimezone('UTC')->format('F j, Y \a\t g:i A'),
                'email_changed_at_tehran' => $this->email_changed_at->copy()->setTimezone('Asia/Tehran')->format('F j, Y \a\t g:i A'),
            ]
        );
    }
}
