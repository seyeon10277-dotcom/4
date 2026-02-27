import { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

interface StarRatingProps {
  productId: string;
  productName: string;
  onRate?: (rating: number) => void;
}

export function StarRating({ productId, productName, onRate }: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRate = (value: number) => {
    setRating(value);
    setSubmitted(true);
    
    const reviews = JSON.parse(localStorage.getItem('klear_reviews') || '{}');
    reviews[productId] = { rating: value, productName, timestamp: new Date().toISOString() };
    localStorage.setItem('klear_reviews', JSON.stringify(reviews));
    
    if (onRate) {
      onRate(value);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-[#E6E6E0]">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleRate(star)}
            className="focus:outline-none"
          >
            <Star
              size={24}
              className={`transition-colors ${
                star <= (hover || rating)
                  ? 'fill-[#A9C356] text-[#A9C356]'
                  : 'text-gray-300'
              }`}
            />
          </motion.button>
        ))}
      </div>
      {submitted && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-[#6F832E]"
        >
          ⭐ {rating}/5 - 리뷰 감사합니다!
        </motion.p>
      )}
    </div>
  );
}
