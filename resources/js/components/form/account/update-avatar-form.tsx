import AccountController from '@/actions/App/Http/Controllers/AccountController';
import { SubmitBtn } from '@/components/submit-btn';
import { TextInput } from '@/components/text-input';
import { FieldGroup } from '@/components/ui/field';
import { UserAvatar } from '@/components/user-avatar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { showServerValidationError } from '@/lib/utils';
import { userAvatarRule, VALID_USER_AVATAR_MIME_TYPES } from '@/zod/inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { DeleteAvatar } from '../../account/delete-avatar';

const updateAvatarSchema = z.object({
  avatar: userAvatarRule,
});

export const UpdateAvatarForm = () => {
  const { name, avatar } = useCurrentUser()!;
  const form = useForm({
    resolver: zodResolver(updateAvatarSchema),
    defaultValues: {
      avatar: undefined,
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const [isPending, setIsPending] = useState(false);
  const isFormDisabled = isSubmitting || isPending;
  const [avatarPreview, setAvatarPreview] = useState<string>();
  return (
    <form
      className="max-w-lg"
      onSubmit={handleSubmit((data) => {
        router.post(AccountController.updateAvatar(), data, {
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
        {(avatarPreview || avatar) && (
          <div className="relative h-16 w-16 min-w-16 overflow-hidden rounded-full">
            <img
              src={avatarPreview ?? (avatar as string | undefined)}
              alt={avatarPreview ? 'user avatar preview' : `${name} avatar`}
              className="h-full w-full object-cover"
            />
            {!avatarPreview && avatar && <DeleteAvatar />}
          </div>
        )}
        {!avatarPreview && !avatar && <UserAvatar width={16} height={16} className="text-2xl" />}
        <TextInput
          label="Avatar"
          control={control}
          name="avatar"
          inputProps={{
            type: 'file',
            accept: VALID_USER_AVATAR_MIME_TYPES.join(', '),
            onChange(e) {
              const file = e.target.files?.[0];
              const validation = userAvatarRule.safeParse(file);
              if (!validation.success) {
                setAvatarPreview(undefined);
                return;
              }
              const avatar = validation.data;
              const fileReader = new FileReader();
              fileReader.onload = (e) => {
                setAvatarPreview(e.target?.result?.toString());
              };
              fileReader.readAsDataURL(avatar);
            },
          }}
        />
        <SubmitBtn disabled={isFormDisabled} className="self-start">
          Update
        </SubmitBtn>
      </FieldGroup>
    </form>
  );
};
