<?php

namespace App\Http\Controllers;

use App\Mail\Account\ConfirmYourUsernameChange;
use App\Mail\Account\YourUsernameChangedMail;
use App\Models\UserToken;
use App\Models\UserTokenType;
use App\Trait\CustomRuleValidation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;

class AccountController extends Controller
{
    use CustomRuleValidation;

    public function get()
    {
        return inertia('account');
    }

    public function profileDetails()
    {
        $user = Auth::user();

        $validated = request()->validate([
            'name' => $this->nameRule(),
            'username' => $this->usernameRule(uniqueIgnoreId: $user->id),
        ]);

        $user->update([
            'name' => $validated['name'],
        ]);

        $text = 'Your profile details have been updated.';

        if ($validated['username'] !== $user->username) {
            [$token, $expires_in_minutes] = UserToken::createToken(
                user: $user,
                type: UserTokenType::CHANGE_USERNAME,
                expires_in_minutes: 15,
                payload: ['new_username' => $validated['username']]
            );

            Mail::to($user)->send(new ConfirmYourUsernameChange(
                name: $user->name,
                token: $token,
                expires_in_minutes: $expires_in_minutes,
                old_username: $user->username,
                new_username: $validated['username']
            ));

            $text .= ' an email to confirm your username change has been sent to you.';
        }

        return back()->with('flash_message', [
            'type' => 'success',
            'text' => $text,
        ]);
    }

    public function confirmUsernameChange(string $token)
    {
        $validator = validator([
            'token' => $token,
        ], [
            'token' => $this->tokenRule(),
        ]);

        if ($validator->fails()) {
            abort(404);
        }

        $user = Auth::user();

        $userToken = $user->userTokens()
            ->where('type', UserTokenType::CHANGE_USERNAME)
            ->first();

        if (! $userToken || ! $userToken->isValid($token)) {
            return redirect()->route('account.get')
                ->with('flash_message', [
                    'type' => 'error',
                    'text' => 'Token is invalid or expired. try again.',
                ]);
        }

        $validator = validator([
            'new_username' => $userToken->payload['new_username'],
        ], [
            'new_username' => $this->usernameRule(uniqueIgnoreId: $user->id),
        ]);

        if ($validator->fails()) {
            return redirect()->route('account.get')
                ->with('flash_message', [
                    'type' => 'error',
                    'text' => 'This username is already taken. choose a different one.',
                ]);
        }

        $old_username = $user->username;
        $new_username = $validator->validated()['new_username'];

        $user->update([
            'username' => $new_username,
            'username_changed_at' => now(),
        ]);

        $userToken->delete();

        Mail::to($user)->send(new YourUsernameChangedMail(
            name: $user->name,
            old_username: $old_username,
            new_username: $user->username,
            username_changed_at: $user->username_changed_at
        ));

        return redirect()->route('account.get')
            ->with('flash_message', [
                'type' => 'success',
                'text' => 'Your username has changed.',
            ]);
    }

    public function changePassword()
    {
        $validated = request()->validate([
            'current_password' => $this->passwordRule(
                min: 10,
                checkCurrentPassword: true
            ),
            'password' => $this->passwordRule(min: 10),
        ]);

        $user = Auth::user();

        $user->update([
            'password' => $validated['password'],
            'password_changed_at' => now(),
            'remember_token' => null,
        ]);

        $user->logoutOtherDevices();

        Cookie::queue(Cookie::forget(Auth::getRecallerName()));

        return back()->with('flash_message', [
            'type' => 'success',
            'text' => 'Your password has been changed.',
        ]);
    }
}
