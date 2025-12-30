import { useId, type ComponentProps } from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { PasswordInput } from './ui/password-input';

export const TextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  label,
  inputProps = {},
}: Pick<ControllerProps<TFieldValues, TName, TTransformedValues>, 'control' | 'name'> & {
  label: string;
  inputProps?: ComponentProps<'input'>;
}) => {
  const { type = 'text', autoComplete = 'on', ...rest } = inputProps;

  // 1. Determine which component to use
  const isPassword = type === 'password';
  const InputComponent = isPassword ? PasswordInput : Input;

  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, onBlur, onChange, ref, value, disabled }, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-2">
          <FieldLabel htmlFor={`${id}-${name}`}>{label}</FieldLabel>

          <InputComponent
            {...rest}
            name={name}
            onBlur={onBlur}
            onChange={(e) => {
              if (inputProps.type !== 'file') {
                onChange(e);
                return;
              }
              const file = e.target.files?.[0];
              onChange(file);
              inputProps.onChange?.(e);
            }}
            ref={ref}
            value={inputProps.type !== 'file' ? value : undefined}
            disabled={disabled}
            id={`${id}-${name}`}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
            // 2. Only pass 'type' if it's NOT a password field
            // (assuming PasswordInput handles its own type)
            {...(!isPassword && { type })}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
