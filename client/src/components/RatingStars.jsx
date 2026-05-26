import React, { useState } from 'react';

export default function RatingStars({ rating, onChange, interactive = false, size = 18 }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (score) => {
    if (interactive && onChange) {
      onChange(score);
    }
  };

  const handleMouseEnter = (score) => {
    if (interactive) {
      setHoverRating(score);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const currentDisplayRating = hoverRating || rating;

  return (
    <div 
      className={`stars-container ${interactive ? 'interactive' : ''}`}
      onMouseLeave={handleMouseLeave}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star-icon ${star <= currentDisplayRating ? 'active' : ''} ${star <= hoverRating ? 'hovered' : ''}`}
          style={{ fontSize: `${size}px` }}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
        >
          ★
        </span>
      ))}

      <style jsx="true">{`
        .stars-container {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .star-icon {
          color: rgba(255, 255, 255, 0.15);
          user-select: none;
          transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .stars-container.interactive .star-icon {
          cursor: pointer;
        }

        .star-icon.active {
          color: var(--accent-gold);
          text-shadow: 0 0 10px rgba(251, 191, 36, 0.6);
        }

        .stars-container.interactive .star-icon:active {
          transform: scale(0.85);
        }

        .stars-container.interactive .star-icon.hovered {
          transform: scale(1.2);
          color: #fbbf24;
          text-shadow: 0 0 12px rgba(251, 191, 36, 0.8);
        }
      `}</style>
    </div>
  );
}
