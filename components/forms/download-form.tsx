'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { downloadSchema, type DownloadFormData } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/content/site';

type Step = 1 | 2;

export function DownloadForm() {
    const [step, setStep] = useState<Step>(1);
    const [tempEmail, setTempEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, trigger, setValue, watch } = useForm({
        resolver: zodResolver(downloadSchema),
        defaultValues: {
            source: 'home-preview',
            email: '',
            name: '',
            organization: '',
            phone: ''
        } as any // Use as any or default to avoid conflict with resolver schema inference for now, since it's just defaults
    });

    const handleNextStep = async () => {
        // Validate only the email field before proceeding to step 2
        const isEmailValid = await trigger('email');
        if (isEmailValid) {
            setStep(2);
        }
    };

    const onSubmit = async (data: DownloadFormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await fetch('/api/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to submit');

            setIsSuccess(true);

            // Automatically open the PDF in a new tab upon success
            window.open(siteConfig.links.curriculum, '_blank', 'noopener,noreferrer');

        } catch (err) {
            setError('오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center animate-fade-in w-full md:max-w-md">
                <div className="flex justify-center mb-4">
                    <CheckCircle2 className="text-primary w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold mb-2">신청이 완료되었습니다!</h3>
                <p className="text-muted-foreground text-sm mb-6">
                    자료가 새 창에서 열렸습니다.<br />
                    혹시 열리지 않았다면 아래 버튼을 클릭해주세요.
                </p>
                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => window.open(siteConfig.links.curriculum, '_blank', 'noopener,noreferrer')}
                        className="w-full gap-2"
                    >
                        <Download size={16} /> Insight Book 다운로드
                    </Button>
                    <p className="text-xs text-muted-foreground">
                        * 입력하신 이메일로도 동일한 자료 링크를 발송해 드렸습니다.
                    </p>
                </div>
            </div>
        );
    }

    if (step === 1) {
        return (
            <div className="w-full md:max-w-md space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 relative">
                        <Input
                            placeholder="이메일을 입력하세요"
                            {...register('email')}
                            className={errors.email ? "border-red-500" : ""}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleNextStep();
                                }
                            }}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 absolute">{errors.email.message as string}</p>}
                    </div>
                    <Button type="button" onClick={handleNextStep} className="shrink-0 gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                        다음 단계 <ArrowRight size={16} />
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center sm:text-left pt-1">
                    * 무료 신청을 위해 다음 단계에서 간단한 정보를 입력해주세요.
                </p>
            </div>
        );
    }

    // Step 2
    return (
        <form onSubmit={handleSubmit(onSubmit as any)} className="w-full md:max-w-md space-y-4 bg-white/5 p-5 rounded-lg border border-white/10 relative">
            <div className="absolute top-4 right-4 text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">2 / 2 단계</div>

            <div className="mb-4">
                <h4 className="font-semibold text-lg mb-1">신청자 정보 입력</h4>
                <p className="text-sm text-muted-foreground">Insight Book 발송을 위해 필요한 정보입니다.</p>
            </div>

            <div className="space-y-3">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">이메일 (수신처)</label>
                    <Input {...register('email')} readOnly className="bg-muted text-muted-foreground cursor-not-allowed" />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">이름 <span className="text-red-500">*</span></label>
                    <Input placeholder="홍길동" {...register('name')} className={errors.name ? "border-red-500" : ""} />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message as string}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">소속 <span className="text-red-500">*</span></label>
                    <Input placeholder="회사명/직함" {...register('organization')} className={errors.organization ? "border-red-500" : ""} />
                    {errors.organization && <p className="text-red-500 text-xs">{errors.organization.message as string}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">휴대폰 번호 (선택)</label>
                    <Input placeholder="010-0000-0000" {...register('phone')} />
                </div>
            </div>

            <div className="pt-2 flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    이전
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1 gap-2">
                    {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
                    무료 받기
                </Button>
            </div>

            {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}

            <p className="text-xs text-muted-foreground text-center pt-2">
                * 개인정보는 자료 발송 및 구독 이외의 목적으로 사용되지 않습니다.
            </p>
        </form>
    );
}
