'use client';

import { useEffect } from 'react';
import { useLayout } from '@/contexts/LayoutContext';

const SettingsPage = () => {
    const { setLayoutInfo } = useLayout();

    useEffect(() => {
        setLayoutInfo("Settings", undefined);
    }, [setLayoutInfo]);

    return (
        <div className="text-white">
            <p>Settings page content goes here.</p>
        </div>
    );
};

export default SettingsPage;
