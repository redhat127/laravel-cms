import AccountController from '@/actions/App/Http/Controllers/AccountController';
import { SubmitBtn } from '@/components/submit-btn';
import { TextInput } from '@/components/text-input';
import { FieldGroup } from '@/components/ui/field';
import { showServerValidationError } from '@/lib/utils';
import { passwordRule } from '@/zod/inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const deleteMyAccountSchema = z.object({
  current_password: passwordRule(10),
});

export const DeleteMyAccountForm = () => {
  const form = useForm({
    resolver: zodResolver(deleteMyAccountSchema),
    defaultValues: {
      current_password: '',
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
        router.delete(AccountController.deleteMyAccount(), {
          preserveScroll: true,
          preserveState: 'errors',
          data,
          onBefore() {
            if (!confirm('Are you sure you want to delete your account?')) return false;
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
        <SubmitBtn disabled={isFormDisabled} className="self-start" variant="destructive">
          Delete
        </SubmitBtn>
      </FieldGroup>
    </form>
  );
};
