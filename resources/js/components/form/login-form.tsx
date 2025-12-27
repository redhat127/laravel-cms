import LoginController from '@/actions/App/Http/Controllers/Auth/LoginController';
import { showServerValidationErrors } from '@/lib/utils';
import { emailRule, passwordRule, remember_meRule } from '@/zod/inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { CheckboxInput } from '../checkbox-input';
import { SubmitBtn } from '../submit-btn';
import { TextInput } from '../text-input';
import { FieldGroup } from '../ui/field';

const loginSchema = z.object({
  email: emailRule,
  password: passwordRule(),
  remember_me: remember_meRule,
});

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember_me: false,
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
        router.post(LoginController.post(), data, {
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
        <TextInput label="Email" control={control} name="email" inputProps={{ type: 'email' }} />
        <TextInput label="Password" control={control} name="password" inputProps={{ type: 'password' }} />
        <CheckboxInput label="Remember me?" control={control} name="remember_me" />
        <SubmitBtn disabled={isFormDisabled}>Login</SubmitBtn>
      </FieldGroup>
    </form>
  );
};
