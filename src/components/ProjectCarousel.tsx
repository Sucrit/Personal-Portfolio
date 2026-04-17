import { useEffect, useMemo, useState } from 'react';
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

  const normalizedImages = useMemo(
    () => images.map((item) => (typeof item === 'string' ? item : item.src)),
    [images],
  );

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const currentItem = images[currentIndex];
  const src = typeof currentItem === 'string' ? currentItem : currentItem.src;
  const isMobile = typeof currentItem !== 'string' && currentItem.type === 'mobile';

  useEffect(() => {
    if (normalizedImages.length < 2) return;

    const nextIndex = (currentIndex + 1) % normalizedImages.length;
    const prevIndex = (currentIndex - 1 + normalizedImages.length) % normalizedImages.length;

    [normalizedImages[nextIndex], normalizedImages[prevIndex]].forEach((imageSrc) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = imageSrc;
    });
  }, [currentIndex, normalizedImages]);

  return (
    <div
      className={`project-image-carousel ${isMobile ? 'project-image-carousel--mobile-preview' : 'project-image-carousel--web-preview'}`}
      style={{
        position: 'relative',
        background: isMobile ? 'rgba(0,0,0,0.2)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="project-image-carousel__content"
        style={{
          width: '100%',
          height: '100%',
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
                className="project-preview-image project-preview-image--framed-bg"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'blur(12px)',
                  transform: 'scale(1.03)',
                  opacity: 0.42,
                }}
              />
              <img
                src={src}
                alt={`${alt} ${currentIndex + 1}`}
                className="project-preview-image project-preview-image--framed-foreground"
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
              className="project-preview-image project-preview-image--fill"
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
      </div>

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
