import ChangePasswordController from '@/actions/App/Http/Controllers/Auth/ChangePasswordController';
import { showServerValidationError } from '@/lib/utils';
import { passwordRule } from '@/zod/inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { SubmitBtn } from '../../submit-btn';
import { TextInput } from '../../text-input';
import { FieldGroup } from '../../ui/field';

const changePasswordSchema = z.object({
  password: passwordRule(10),
});

export const ChangePasswordForm = ({ email, token }: { email: string; token: string }) => {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
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
      onSubmit={handleSubmit((data) => {
        router.post(
          ChangePasswordController.post(),
          {
            email,
            token,
            ...data,
          },
          {
            onBefore() {
              setIsPending(true);
            },
            onFinish() {
              setIsPending(false);
            },
            onError(error) {
              showServerValidationError(error);
            },
          },
        );
      })}
    >
      <FieldGroup className="gap-4">
        <TextInput label="New Password" control={control} name="password" inputProps={{ type: 'password' }} />
        <SubmitBtn disabled={isFormDisabled}>Change Password</SubmitBtn>
      </FieldGroup>
    </form>
  );
};
