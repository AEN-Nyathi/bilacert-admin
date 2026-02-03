import * as z from 'zod';

export const contactFormSchema = z.object({
  formType: z.string(),
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
});
