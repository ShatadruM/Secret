import React from 'react';

const Star = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"              // Transparent inside
      stroke="currentColor"    // Inherits text-color from Tailwind
      strokeWidth="4"          // Adjust this number for line thickness
      strokeLinecap="round"    // Softens the sharp tips slightly
      strokeLinejoin="round"   // Softens the corners
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* This path uses 'Q 50 50' as the control point for all curves.
         It pulls the lines deep into the center, making the star very thin.
      */}
      <path d="M50 0 Q50 50 100 50 Q50 50 50 100 Q50 50 0 50 Q50 50 50 0Z" />
    </svg>
  );
};

export default Star;