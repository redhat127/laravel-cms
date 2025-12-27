import z from 'zod';

const minError = (field: string, min: number) => {
  return `minimum for ${field} is ${min} characters.`;
};

const maxError = (field: string, max: number) => {
  return `${field} is more than ${max} characters.`;
};

const maxEmail = 50;

const maxPassword = 50;

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

export const emailRule = z.email({ error: 'valid email is required.' }).max(maxEmail, maxError('email', maxEmail));

export const passwordRule = (min = 1) => z.string().min(min, minError('password', min)).max(maxPassword, maxError('password', maxPassword));

export const remember_meRule = z.boolean({ error: 'invalid input.' });
