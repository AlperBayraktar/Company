import React from "react";

export interface SolidColorBackgroundProps {
  color: string; // HEX code
}

const SolidColorBackground: React.FC<SolidColorBackgroundProps> = ({ color }) => {
  return (
    <div
      className="absolute inset-0 w-full h-full z-0 transition-colors duration-3000"
      style={{ backgroundColor: color }}
    />
  );
};

export default SolidColorBackground;
