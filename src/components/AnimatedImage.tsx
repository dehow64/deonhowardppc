import React, { useState } from 'react';
import { motion } from 'motion/react';

interface AnimatedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  scale?: boolean;
}

export const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  delay = 0,
  direction = 'up',
  scale = true,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 28, x: 0 };
      case 'down':
        return { y: -28, x: 0 };
      case 'left':
        return { x: 28, y: 0 };
      case 'right':
        return { x: -28, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialOffset();

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialOffset,
        scale: scale ? 0.96 : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.12, // Triggers quickly as soon as 12% is in view, ideal on mobile
        margin: '0px 0px -30px 0px',
      }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Ultra-smooth cubic bezier easing
      }}
      className={`relative overflow-hidden ${wrapperClassName}`}
    >
      {/* Subtle pulse placeholder background while image is loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-[inherit]" />
      )}

      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          setIsLoaded(true);
          if (onError) onError(e);
        }}
        {...props}
      />
    </motion.div>
  );
};
