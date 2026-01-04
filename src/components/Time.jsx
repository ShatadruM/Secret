import React, { useState, useEffect } from "react";

const Time = ({ className = "" }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Updatig every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format: HH
  const hours = String(time.getHours()).padStart(2, "0");
  // Format: MM
  const minutes = String(time.getMinutes()).padStart(2, "0");

  return (
    <div className={`clash-title text-white tracking-widest text-xs md:text-xl flex items-center gap-0.5 ${className}`}>
      <span>{hours}</span>
      <span className="animate-pulse">:</span>
      <span>{minutes}</span>
    </div>
  );
};

export default Time;