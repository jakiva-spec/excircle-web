'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            type: 'inquiry',
            consent: false,
            source: 'contact-page'
        }
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to submit');

            setIsSuccess(true);
        } catch (err) {
            setError('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-green-50/50 border border-green-200 rounded-xl p-8 text-center animate-fade-in max-w-lg mx-auto">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle2 className="text-green-600 w-12 h-12" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-green-800">문의가 접수되었습니다.</h3>
                <p className="text-green-700">
                    보내주신 내용을 확인 후,<br />
                    입력하신 이메일로 24시간 이내에 답변드리겠습니다.
                </p>
                <Button onClick={() => window.location.reload()} variant="outline" className="mt-8 border-green-200 text-green-700 hover:bg-green-50">
                    추가 문의하기
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">이름 <span className="text-red-500">*</span></label>
                        <Input placeholder="홍길동" {...register('name')} className={errors.name ? "border-red-500" : ""} />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">소속 (선택)</label>
                        <Input placeholder="회사명/직함" {...register('org')} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">이메일 <span className="text-red-500">*</span></label>
                    <Input type="email" placeholder="example@company.com" {...register('email')} className={errors.email ? "border-red-500" : ""} />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">문의 유형 <span className="text-red-500">*</span></label>
                    <select
                        {...register('type')}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="inquiry">일반 문의 / 상담</option>
                        <option value="lecture">강연 / 프로그램 의뢰</option>
                        <option value="other">기타</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-xs">{errors.type.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">메시지 <span className="text-red-500">*</span></label>
                    <Textarea
                        placeholder="문의하실 내용을 구체적으로 적어주세요."
                        className={`min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
                        {...register('message')}
                    />
                    {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                </div>
            </div>

            <Button type="submit" disabled={isSubmitting} size="lg" className="w-full h-12 text-base gap-2">
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                문의 보내기
            </Button>

            {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">{error}</p>}
        </form>
    );
}
