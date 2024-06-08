import React from 'react';

interface Image {
    label: string,
    url: string
}

const ImagesGallery = ({images}) => (
  <div className="images-gallery">
    {images.map((image, index) => (
      <img key={index} src={image.url} alt={`Image ${index + 1}`} />
    ))}
  </div>
);

export default ImagesGallery;
