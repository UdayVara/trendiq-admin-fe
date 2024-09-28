import { z } from 'zod';

export const SigninSchema = z.object({
  email: z.string().email("Email is Required"),
  password: z
    .string()
    .min(8,"Password Should be Between 8 to 20 Characters")
    .max(20,"Password Should be Between 8 to 20 Characters")
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;