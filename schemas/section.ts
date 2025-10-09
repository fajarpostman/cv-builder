/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

import { z } from 'zod';

export const PersonalInfo = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    summary: z.string().optional()
});

export const Experience = z.object({
    title: z.string(),
    company: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    description: z.string().optional()
});

export const Skill = z.object({
    name: z.string(),
    level: z.enum(['beginer', 'intermediate', 'advance']).optional()
});

export const Education = z.object({ 
    school: z.string(),
    degree: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional()
});

export const SectionInput = z.discriminatedUnion('type', [
  z.object({ type: z.literal('personal'), data: PersonalInfo }),
  z.object({ type: z.literal('experience'), data: z.array(Experience) }),
  z.object({ type: z.literal('skills'), data: z.array(Skill) }),
  z.object({ type: z.literal('education'), data: z.array(Education) }),
  z.object({ type: z.literal('interests'), data: z.array(z.string()) })
]);

export type SectionInputType = z.infer<typeof SectionInput>;