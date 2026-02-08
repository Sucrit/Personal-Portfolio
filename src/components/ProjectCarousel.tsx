import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export type ImageItem = string | { src: string; type: 'web' | 'mobile' };

interface ProjectCarouselProps {
  images: ImageItem[];
  alt: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentItem = images[currentIndex];
  const src = typeof currentItem === 'string' ? currentItem : currentItem.src;
  const isMobile = typeof currentItem !== 'string' && currentItem.type === 'mobile';

  return (
    <div className="project-image-carousel" style={{ position: 'relative', width: '100%', height: '100%', background: isMobile ? 'rgba(0,0,0,0.2)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {isMobile ? (
        <div className="phone-mockup">
           <div className="phone-notch"></div>
           <img
             src={src}
             alt={`${alt} ${currentIndex + 1}`}
             className="phone-screen"
             loading="eager"
             fetchPriority="high"
           />
        </div>
      ) : (
        <img
          src={src}
          alt={`${alt} ${currentIndex + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="eager"
          fetchPriority="high"
        />
      )}

      {images.length > 1 && (
        <>
          <button className="carousel-btn prev" onClick={prevImage} aria-label="Previous Image">
            <FaChevronLeft />
          </button>
          <button className="carousel-btn next" onClick={nextImage} aria-label="Next Image">
            <FaChevronRight />
          </button>
          
          <div className="carousel-dots">
            {images.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentIndex ? 'active' : ''}`} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectCarousel;
