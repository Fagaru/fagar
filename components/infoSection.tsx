import React from 'react';

const InfoSection = ({ title, content }) => (
  <div className="info-section">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

export default InfoSection;
