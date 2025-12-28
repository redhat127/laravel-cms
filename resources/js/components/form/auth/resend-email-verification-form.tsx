import ResendEmailVerificationController from '@/actions/App/Http/Controllers/ResendEmailVerificationController';
import { showServerValidationError } from '@/lib/utils';
import { emailRule } from '@/zod/inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { SubmitBtn } from '../../submit-btn';
import { TextInput } from '../../text-input';
import { FieldGroup } from '../../ui/field';

const resendEmailVerificationSchema = z.object({
  email: emailRule,
});

export const ResendEmailVerificationForm = () => {
  const form = useForm({
    resolver: zodResolver(resendEmailVerificationSchema),
    defaultValues: {
      email: '',
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
        router.post(ResendEmailVerificationController.post(), data, {
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
        <TextInput label="Email" control={control} name="email" inputProps={{ type: 'email' }} />
        <SubmitBtn disabled={isFormDisabled}>Send</SubmitBtn>
      </FieldGroup>
    </form>
  );
};
