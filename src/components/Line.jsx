import React from "react";

export default function Line({
  variant = "horizontal",
  thickness = 1,
  color = "white",
  className = "",
}) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: color,
        height: variant === "horizontal" ? `${thickness}px` : "100%",
        width: variant === "vertical" ? `${thickness}px` : "100%",
      }}
    />
  );
}
