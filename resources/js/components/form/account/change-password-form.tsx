import AccountController from '@/actions/App/Http/Controllers/AccountController';
import { SubmitBtn } from '@/components/submit-btn';
import { TextInput } from '@/components/text-input';
import { FieldGroup } from '@/components/ui/field';
import { useCurrentUser } from '@/hooks/use-current-user';
import { showServerValidationError } from '@/lib/utils';
import { passwordRule } from '@/zod/inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const changePasswordSchema = z.object({
  current_password: passwordRule(10),
  password: passwordRule(10),
});

export const ChangePasswordForm = () => {
  const { password_changed_at } = useCurrentUser()!;
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: '',
      password: '',
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const [isPending, setIsPending] = useState(false);
  const isFormDisabled = isSubmitting || isPending;
  return (
    <form
      className="max-w-lg"
      onSubmit={handleSubmit((data) => {
        router.patch(AccountController.changePassword(), data, {
          preserveScroll: true,
          preserveState: 'errors',
          onBefore() {
            setIsPending(true);
          },
          onFinish() {
            setIsPending(false);
          },
          onError(error) {
            showServerValidationError(error);
          },
        });
      })}
    >
      <FieldGroup className="gap-4">
        <TextInput control={control} name="current_password" label="Current Password" inputProps={{ type: 'password' }} />
        <div className="space-y-1">
          <TextInput control={control} name="password" label="Password" inputProps={{ type: 'password' }} />
          {password_changed_at && (
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
              Password last changed on {new Date(password_changed_at).toLocaleString()}
            </p>
          )}
        </div>
        <SubmitBtn disabled={isFormDisabled} className="self-start">
          Change
        </SubmitBtn>
      </FieldGroup>
    </form>
  );
};
