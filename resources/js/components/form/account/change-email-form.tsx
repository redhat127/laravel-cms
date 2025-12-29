import AccountController from '@/actions/App/Http/Controllers/AccountController';
import { SubmitBtn } from '@/components/submit-btn';
import { TextInput } from '@/components/text-input';
import { FieldGroup } from '@/components/ui/field';
import { useCurrentUser } from '@/hooks/use-current-user';
import { showServerValidationError } from '@/lib/utils';
import { emailRule } from '@/zod/inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const changeEmailSchema = z.object({
  email: emailRule,
});

export const ChangeEmailForm = () => {
  const { email, email_changed_at } = useCurrentUser()!;
  const form = useForm({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email,
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
        router.patch(AccountController.changeEmail(), data, {
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
        <div className="space-y-1">
          <TextInput control={control} name="email" label="Email" inputProps={{ type: 'email' }} />
          {email_changed_at && (
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
              Email last changed on {new Date(email_changed_at).toLocaleString()}
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
