import React, { useRef } from 'react';
import Header from './Header';
import TinderCards from './TinderCards';
import SwipeButtons from './SwipeButtons';

function FurnitureSwiper() {
  const tinderRef = useRef();

  const handleSwipeLeft = () => {
    tinderRef.current?.swipe('left');
  };

  const handleSwipeRight = () => {
    tinderRef.current?.swipe('right');
  };

  const handleRewind = () => {
    tinderRef.current?.rewind();
  };

  const handleSuperLike = () => {
    tinderRef.current?.superLike();
  };

  const handleBoost = () => {
    tinderRef.current?.boost();
  };

  return (
    <>
      <Header />
      <TinderCards ref={tinderRef} />
      <SwipeButtons
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        onRewind={handleRewind}
        onSuperLike={handleSuperLike}
        onBoost={handleBoost}
      />
    </>
  );
}

export default FurnitureSwiper;
