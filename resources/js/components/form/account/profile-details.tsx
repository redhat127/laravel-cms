import AccountController from '@/actions/App/Http/Controllers/AccountController';
import { SubmitBtn } from '@/components/submit-btn';
import { TextInput } from '@/components/text-input';
import { FieldGroup } from '@/components/ui/field';
import { useCurrentUser } from '@/hooks/use-current-user';
import { showServerValidationError } from '@/lib/utils';
import { nameRule, usernameRule } from '@/zod/inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const profileDetailsSchema = z.object({
  name: nameRule,
  username: usernameRule,
});

export const ProfileDetailsForm = () => {
  const { name, username, username_changed_at } = useCurrentUser()!;
  const form = useForm({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      name,
      username,
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
        router.patch(AccountController.profileDetails(), data, {
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
        <TextInput control={control} name="name" label="Name" />
        <div className="space-y-1">
          <TextInput control={control} name="username" label="Username" />
          {username_changed_at && (
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
              Username last changed on {new Date(username_changed_at).toLocaleString()}
            </p>
          )}
        </div>
        <SubmitBtn disabled={isFormDisabled} className="self-start">
          Update
        </SubmitBtn>
      </FieldGroup>
    </form>
  );
};
