"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb() {
    const pathname = usePathname();
    const paths = pathname.split('/').filter(path => path);

    return (
        <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        Inicio
                    </Link>
                </li>
                {paths.map((path, index) => {
                    const href = `/${paths.slice(0, index + 1).join('/')}`;
                    const isLast = index === paths.length - 1;
                    return (
                        <li key={path} className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                            {isLast ? (
                                <span className="text-gray-700 dark:text-gray-200 font-medium">{path}</span>
                            ) : (
                                <Link href={href} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                    {path}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}