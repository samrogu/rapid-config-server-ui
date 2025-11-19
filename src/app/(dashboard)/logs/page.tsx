'use client';

import { useEffect } from 'react';
import { useLayout } from '@/contexts/LayoutContext';

const LogsPage = () => {
    const { setLayoutInfo } = useLayout();

    useEffect(() => {
        setLayoutInfo("Logs", undefined);
    }, [setLayoutInfo]);

    return (
        <div className="text-white">
            <p>Logs page content goes here.</p>
        </div>
    );
};

export default LogsPage;
