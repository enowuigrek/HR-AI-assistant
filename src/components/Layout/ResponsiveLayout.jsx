// components/Layout/ResponsiveLayout.jsx
import React from 'react';

const ResponsiveLayout = ({ children }) => {
    return (
        <div className="h-screen bg-gray-100 md:bg-gradient-to-br md:from-blue-50 md:via-white md:to-purple-50">
            {/* Mobile Layout - Full Screen Chat */}
            <div className="md:hidden h-full">
                {children}
            </div>

            {/* Desktop Layout - Centered with padding */}
            <div className="hidden md:flex items-center justify-center min-h-screen p-6">
                <div className="w-full max-w-4xl h-[600px]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ResponsiveLayout;
