import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { ProjectImage } from '../data/portfolio';

interface ProjectCarouselProps {
  images: ProjectImage[];
  alt: string;
  desktopPreviewMode?: 'fill' | 'framed';
}

function ProjectCarousel({
  images,
  alt,
  desktopPreviewMode = 'fill',
}: ProjectCarouselProps) {
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

  const goToImage = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const currentItem = images[currentIndex];
  const src = typeof currentItem === 'string' ? currentItem : currentItem.src;
  const isMobile = typeof currentItem !== 'string' && currentItem.type === 'mobile';

  return (
    <div
      className="project-image-carousel"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: isMobile ? 'rgba(0,0,0,0.2)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
        desktopPreviewMode === 'framed' ? (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(22px)',
                transform: 'scale(1.08)',
                opacity: 0.58,
              }}
            />
            <img
              src={src}
              alt={`${alt} ${currentIndex + 1}`}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                display: 'block',
                zIndex: 1,
              }}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        ) : (
          <img
            src={src}
            alt={`${alt} ${currentIndex + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
            loading="eager"
            fetchPriority="high"
          />
        )
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
              <button
                key={idx}
                type="button"
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={goToImage(idx)}
                aria-label={`Show image ${idx + 1}`}
                aria-pressed={idx === currentIndex}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectCarousel;
