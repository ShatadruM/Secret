import React from 'react'

const Plus = ({
  size = 24,
  thickness = 1,
  color = "white",
  className = "",
}) => {
  return (
    <div
      className={` ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Horizontal bar */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: size, height: thickness, backgroundColor: color }}
      />

      {/* Vertical bar */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: thickness, height: size, backgroundColor: color }}
      />
    </div>
  );
}
export default Plus