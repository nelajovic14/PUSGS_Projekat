import React from 'react';

const Star = ({ size, color,filled }) => {
  const starStyle = {
    fill: filled ? color : 'transparent',
    stroke: 'black',
  };

  const calculatePoints = (size) => {
    const radius = size / 2;
    const angle = (Math.PI * 2) / 5;
    let points = '';

    for (let i = 0; i < 5; i++) {
      const outerX = radius * Math.cos(angle * i - Math.PI / 2) + radius;
      const outerY = radius * Math.sin(angle * i - Math.PI / 2) + radius;
      points += `${outerX},${outerY} `;
      
      const innerX = radius * 0.5 * Math.cos(angle * i + angle / 2 - Math.PI / 2) + radius;
      const innerY = radius * 0.5 * Math.sin(angle * i + angle / 2 - Math.PI / 2) + radius;
      points += `${innerX},${innerY} `;
    }

    return points;
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size}>
      <polygon points={calculatePoints(size)} style={starStyle} />
    </svg>
  );
};

export default Star;
