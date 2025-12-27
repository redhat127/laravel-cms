import RegisterController from '@/actions/App/Http/Controllers/RegisterController';
import { showServerValidationErrors } from '@/lib/utils';
import { emailRule, nameRule, passwordRule } from '@/zod/inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { SubmitBtn } from '../submit-btn';
import { TextInput } from '../text-input';
import { FieldGroup } from '../ui/field';

const registerSchema = z.object({
  name: nameRule,
  email: emailRule,
  password: passwordRule(10),
});

export const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
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
        router.post(RegisterController.post(), data, {
          onBefore() {
            setIsPending(true);
          },
          onFinish() {
            setIsPending(false);
          },
          onError(error) {
            showServerValidationErrors(error);
          },
        });
      })}
    >
      <FieldGroup className="gap-4">
        <TextInput label="Name" control={control} name="name" />
        <TextInput label="Email" control={control} name="email" inputProps={{ type: 'email' }} />
        <TextInput label="Password" control={control} name="password" inputProps={{ type: 'password' }} />
        <SubmitBtn disabled={isFormDisabled}>Register</SubmitBtn>
      </FieldGroup>
    </form>
  );
};
