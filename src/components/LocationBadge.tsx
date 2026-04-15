import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './LocationBadge.css';

const LocationBadge: React.FC = () => {
  return (
    <div className="location-badge">
      <div className="location-icon-wrapper">
        <FaMapMarkerAlt className="location-icon" />
      </div>
      <span className="location-text">Based in Pangasinan, Philippines</span>
      <img src="/assets/flags/philippines.svg" alt="Philippines" className="location-flag" />
    </div>
  );
};

export default LocationBadge;
