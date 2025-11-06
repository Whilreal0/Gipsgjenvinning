import React from 'react';

export const TruckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h-2a2 2 0 00-2-2H5a2 2 0 00-2 2v10h2M17 8v10M9 20h10a2 2 0 002-2V8h-5M9 20v-5h6v5M9 20H5" />
      <circle cx="7" cy="18" r="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <circle cx="17" cy="18" r="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
);
