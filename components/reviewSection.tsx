import React from 'react';

interface Review {
    userId: string;
    comment: string;
    stars: number;
}

const ReviewSection = ({reviews}) => (
  <div className="review-section">
    {reviews.map((review, index) => (
      <div key={index} className="review">
        <p>{review.comment}</p>
        <span>{review.stars} étoiles</span>
      </div>
    ))}
  </div>
);

export default ReviewSection;
