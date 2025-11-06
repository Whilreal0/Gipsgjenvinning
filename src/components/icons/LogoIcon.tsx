import React from 'react';

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
    monochromeColor?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ monochromeColor, ...props }) => (
    <svg viewBox="0 0 320 52" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g transform="scale(0.65) translate(0, -5)">
            {/* Left Shape */}
            <path d="M0 20 L34.64 40 L34.64 80 L0 60 Z" fill={monochromeColor || "#1E2328"}/>
            {/* Right Shape */}
            <path d="M69.28 20 L34.64 40 L34.64 80 L69.28 60 Z" fill={monochromeColor || "#0E4B4F"}/>
            {/* Top Triangle */}
            <path d="M34.64 0 L0 20 L69.28 20 Z" fill={monochromeColor || "#D7EEE9"}/>
        </g>
        <text x="70" y="38" fontFamily="Manrope, sans-serif" fontSize="26" fontWeight="800" fill={monochromeColor || "#1E2328"}>
            GIPS
        </text>
        <text x="150" y="38" fontFamily="Manrope, sans-serif" fontSize="26" fontWeight="700" fill={monochromeColor || "#0E4B4F"}>
            GJENVINNING
        </text>
    </svg>
);