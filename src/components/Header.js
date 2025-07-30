import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import './Header.css';

function Header({ backButton }) {
  const navigate = useNavigate();

  return (
    <div className="header">
      {backButton ? (
        <IconButton onClick={() => navigate(backButton)}>
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
      ) : (
        <IconButton onClick={() => navigate('/profile')}>
          <PersonIcon fontSize="large" />
        </IconButton>
      )}

      <img
        className="header__logo"
        src="/logo192.png"
        alt="App logo"
      />

      <div style={{ width: 48 }} />
    </div>
  );
}

export default Header;
