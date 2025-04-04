import React from 'react';
import '../../styles/MapButton.css';
import { useNavigate } from 'react-router-dom';
const MapButton = ({details}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className="map-button">
      <button onClick={handleClick}>Show on Map</button>
    </div>
  );
};

export default MapButton;