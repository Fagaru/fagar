import React from 'react';

const InfoSection = ({ title, content }) => {
  return (
    <>
      <span className='font-medium'>{title}</span>
      <p>{content}</p>
    </>
  )
};

export default InfoSection;
