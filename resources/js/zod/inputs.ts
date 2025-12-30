import z from 'zod';

const minError = (field: string, min: number) => {
  return `minimum for ${field} is ${min} characters.`;
};

const maxError = (field: string, max: number) => {
  return `${field} is more than ${max} characters.`;
};

const minName = 3;
const maxName = 50;
export const nameRule = z
  .string()
  .trim()
  .min(minName, minError('name', minName))
  .max(maxName, maxError('name', maxName))
  .regex(/^[a-zA-Z0-9 _-]+$/, {
    error: 'allowed characters: english letters and numbers, underscores, hyphens and spaces.',
  });

const maxEmail = 50;
export const emailRule = z.email({ error: 'valid email is required.' }).max(maxEmail, maxError('email', maxEmail));

const maxPassword = 50;
export const passwordRule = (min = 1) => z.string().min(min, minError('password', min)).max(maxPassword, maxError('password', maxPassword));

export const remember_meRule = z.boolean({ error: 'invalid input.' });

const minUsername = 6;
const maxUsername = 50;
export const usernameRule = z
  .string()
  .trim()
  .min(minUsername, minError('username', minUsername))
  .max(maxUsername, maxError('username', maxUsername))
  .regex(/^[a-z0-9][a-z0-9_-]*$/, {
    message: 'username must start with a letter or number, and can only contain english lowercase letters, numbers, underscores and hyphens.',
  })
  .refine((val) => !['admin', 'root', 'system', 'support', 'api', 'www', 'mail', 'help'].includes(val), {
    message: 'this username is reserved and cannot be used.',
  });

const MAX_USER_AVATAR_SIZE = 2 * 1024 * 1024; // 2mb
export const VALID_USER_AVATAR_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
export const userAvatarRule = z
  .instanceof(File, { message: 'please select an image file.' })
  .refine((file) => file.size > 0, {
    message: 'the selected file is empty.',
  })
  .refine((file) => file.size <= MAX_USER_AVATAR_SIZE, {
    message: 'avatar must be smaller than 2 mb.',
  })
  .refine((file) => VALID_USER_AVATAR_MIME_TYPES.includes(file.type), {
    message: 'allowed formats: jpg, png, gif, webp and avif.',
  });
