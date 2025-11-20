
'use client';

import React from 'react';

const Background = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden">
            <div className="absolute inset-0 bg-gray-950"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-900/50 to-transparent opacity-50"></div>
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-900/30 to-transparent rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-900/30 to-transparent rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        </div>
    );
};

export default Background;
