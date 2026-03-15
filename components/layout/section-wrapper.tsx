import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    containerClassName?: string;
}

export function SectionWrapper({
    children,
    className,
    containerClassName,
    ...props
}: SectionWrapperProps) {
    return (
        <section className={cn("w-full py-10 md:py-16", className)} {...props}>
            <div className={cn("container px-4 md:px-6 mx-auto max-w-6xl", containerClassName)}>
                {children}
            </div>
        </section>
    );
}
