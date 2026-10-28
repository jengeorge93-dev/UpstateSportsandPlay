import {z} from 'zod';
export const inquirySchema=z.object({
 name:z.string().trim().min(2).max(100),
 email:z.email().max(200),
 phone:z.string().trim().max(40).optional().default(''),
 eventType:z.enum(['Birthday party','School or youth club','Corporate family event','Festival or community event','Other']),
 eventDate:z.iso.date().refine(d=>d>='2027-02-01','Event must be February 2027 or later'),
 location:z.string().trim().min(2).max(120),
 childCount:z.preprocess(v=>v===''||v===null||v===undefined?null:v,z.coerce.number().int().min(1).max(5000).nullable()),
 ageRange:z.string().trim().max(80).optional().default(''),
 package:z.string().max(100),
 duration:z.string().max(50),
 notes:z.string().max(2000).optional().default(''),
 website:z.string().max(200).optional().default(''),
 turnstileToken:z.string().max(2048).optional().default('')
});
