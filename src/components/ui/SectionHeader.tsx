import Link from 'next/link';

type SectionHeaderProps = {
    title: string;
    subtitle?: string;
    linkText?: string;
    linkHref?: string;
    light?: boolean;
};

export default function SectionHeader({ title, subtitle, linkText, linkHref, light = false }: SectionHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h2 className={`text-3xl font-bold ${light ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
                {subtitle && <p className={`mt-2 text-lg ${light ? 'text-gray-200' : 'text-gray-600'}`}>{subtitle}</p>}
            </div>
            {linkText && linkHref && (
                <Link
                    href={linkHref}
                    className={`font-medium hover:underline ${light ? 'text-white' : 'text-brand-600'}`}
                >
                    {linkText} &rarr;
                </Link>
            )}
        </div>
    );
}
