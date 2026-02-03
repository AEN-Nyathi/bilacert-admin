import * as z from 'zod';

export const submissionSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().optional(),
  serviceName: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'completed', 'rejected', 'archived']),
  details: z.string().optional().refine((val) => {
    if (!val || val.trim() === '') return true;
    try {
      JSON.parse(val);
      return true;
    } catch (e) {
      return false;
    }
  }, { message: 'Details must be a valid JSON object.' }),
  internalNotes: z.string().optional(),
  assignedTo: z.string().optional(),
});
