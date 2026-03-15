import { z } from 'zod';

export const contactSchema = z.object({
    name: z.string().min(1, '이름을 입력해주세요.'),
    org: z.string().optional(),
    email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
    type: z.enum(['inquiry', 'lecture', 'other']),
    message: z.string().min(10, '메시지는 10자 이상 입력해주세요.'),
    source: z.string().default('home'),
    consent: z.boolean().default(false),
});

export const downloadSchema = z.object({
    email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
    name: z.string().min(1, '이름을 입력해주세요.'),
    organization: z.string().min(1, '소속을 입력해주세요.'),
    phone: z.string().optional(),
    source: z.string().default('home'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type DownloadFormData = z.infer<typeof downloadSchema>;
