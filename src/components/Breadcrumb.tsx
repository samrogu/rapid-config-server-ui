'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const Breadcrumb = () => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-1 text-xs text-gray-400">
                <li>
                    <Link href="/organizations" className="capitalize hover:text-white transition-colors">
                        Organizations
                    </Link>
                </li>
                {segments.map((segment, index) => {
                    const href = `/${segments.slice(0, index + 1).join('/')}`;
                    const isLast = index === segments.length - 1;
                    return (
                        <li key={href}>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                                <Link
                                    href={href}
                                    className={`ml-1 capitalize hover:text-white transition-colors ${isLast ? 'font-semibold text-white' : ''}`}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {segment.replace(/-/g, ' ')}
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;