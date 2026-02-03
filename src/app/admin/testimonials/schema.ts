import * as z from 'zod';

export const testimonialSchema = z.object({
  postUrl: z.string().url('Please enter a valid Facebook post URL'),
});
