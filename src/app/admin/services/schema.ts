import * as z from 'zod';

const pricingPlanSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().default(''),
    price: z.string().min(1, 'Price is required'),
    features: z.string().default(''),
    popular: z.boolean().default(false),
});

const processStepSchema = z.object({
    step: z.string().min(1, 'Step number is required'),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
});

const successStorySchema = z.object({
    scenario: z.string().optional(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    result: z.string().optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  href: z.string().min(1, 'URL (href) is required').refine(val => val.startsWith('/'), { message: 'Href must start with /' }),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  short_description: z.string().optional(),
  icon: z.string().optional(),
  order_index: z.coerce.number().optional(),
  content: z.string().optional(),
  features: z.string().optional(),
  requirements: z.string().optional(),
  includes: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  processing_time: z.string().optional(),
  pricing: z.coerce.number().optional(),
  image: z.string().optional(),
  thumbnail: z.string().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.string().optional(),
  pricing_plans: z.array(pricingPlanSchema).default([]),
  process_steps: z.array(processStepSchema).default([]),
  success_story: successStorySchema.optional(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
