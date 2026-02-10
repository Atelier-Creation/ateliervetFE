import React from 'react';

export function Button({ className, variant, children, ...props }) {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    let variantStyles = "";
    switch (variant) {
        case 'ghost':
            variantStyles = "hover:bg-white/10 hover:text-white";
            break;
        default:
            variantStyles = "";
    }

    return (
        <button
            className={`${baseStyles} ${variantStyles} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
}
