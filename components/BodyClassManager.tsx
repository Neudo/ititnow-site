'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const BodyClassManager: React.FC = () => {
    const pathname = usePathname();

    useEffect(() => {
        const body = document.body;
        if (pathname === '/') {
            body.classList.remove('bg-sky-100');
            body.classList.add('primary-green-linear');

        } else {
            body.classList.remove('primary-green-linear');
            body.classList.add('bg-sky-100');
        }
    }, [pathname]);

    return null;
};

export default BodyClassManager;
