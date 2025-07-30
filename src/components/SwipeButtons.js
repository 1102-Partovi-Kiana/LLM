import React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import IconButton from '@mui/material/IconButton';
import './SwipeButtons.css';

function SwipeButtons({ onSwipeLeft, onSwipeRight, onRewind, onSuperLike, onBoost }) {
  return (
    <div className="swipeButtons">
      <IconButton onClick={onRewind}>
        <ReplayIcon className="swipeButtons__repeat" fontSize="large" />
      </IconButton>
      <IconButton onClick={onSwipeLeft}>
        <CloseIcon className="swipeButtons__left" fontSize="large" />
      </IconButton>
      <IconButton onClick={onSuperLike}>
        <StarRateIcon className="swipeButtons__star" fontSize="large" />
      </IconButton>
      <IconButton onClick={onSwipeRight}>
        <FavoriteIcon className="swipeButtons__right" fontSize="large" />
      </IconButton>
      <IconButton onClick={onBoost}>
        <FlashOnIcon className="swipeButtons__lightning" fontSize="large" />
      </IconButton>
    </div>
  );
}


export default SwipeButtons;

