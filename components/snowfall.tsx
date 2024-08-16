"use client";

import React, { useEffect } from 'react';
import '@/styles/snowfall.css';

interface SnowfallProps {
  snowflakeCount?: number;
  color?: string;
  sizeRange?: [number, number];
  speedRange?: [number, number];
}

const Snowfall: React.FC<SnowfallProps> = ({
  snowflakeCount = 100,
  color = '#ffffff',
  sizeRange = [5, 15],
  speedRange = [3, 10],
}) => {

  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.style.position = 'fixed'; // Fixed position to stay in viewport
      snowflake.style.top = '-10px';
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.width = `${Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]}px`;
      snowflake.style.height = snowflake.style.width;
      snowflake.style.background = color;
      snowflake.style.borderRadius = '50%';
      snowflake.style.opacity = `${Math.random()}`;
      snowflake.style.zIndex = '9999'; // Ensure it stays on top
      snowflake.style.pointerEvents = 'none'; // Ensure it doesn't interfere with user actions

      // Animation
      snowflake.style.animation = `fall ${Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0]}s linear infinite`;

      document.body.appendChild(snowflake);

      // Remove snowflake after animation ends
      setTimeout(() => {
        snowflake.remove();
      }, (Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0]) * 1000);
    };

    for (let i = 0; i < snowflakeCount; i++) {
      setTimeout(createSnowflake, i * 200); // Slight delay between flake creation
    }

    // Cleanup on unmount
    return () => {
      document.querySelectorAll('.snowflake').forEach((el) => el.remove());
    };
  }, [snowflakeCount, color, sizeRange, speedRange]);

  return null; // This component doesn't render anything itself
};

export default Snowfall;
