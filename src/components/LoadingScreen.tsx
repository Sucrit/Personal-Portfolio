import { useState, useEffect, useCallback } from 'react';
import './LoadingScreen.css';

// All critical assets that must load before the portfolio is shown
const CRITICAL_IMAGES = [
  // Local assets
  '/png1.png',
  '/BIS_Logo.png',
  '/UPANG_Logo.png',
  '/mysql.svg',
  '/Rust.png',
  '/Laravel.svg',
  '/github-white-icon.svg',
  '/Flag_of_the_Philippines.svg',
  '/roomfinder/roomfinder_logo.png',
  '/evacudesk/evacudesk_logo.png',
  // CDN skill icons
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
];

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // Don't block on failures
    img.src = src;
  });
}

function waitForFonts(): Promise<void> {
  if (document.fonts?.ready) {
    return document.fonts.ready.then(() => {});
  }
  return Promise.resolve();
}

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const startLoading = useCallback(async () => {
    // 1. Start font loading
    const fontPromise = waitForFonts();

    // 2. Preload all images with progress tracking
    let loaded = 0;
    const total = CRITICAL_IMAGES.length + 1; // +1 for fonts

    const imagePromises = CRITICAL_IMAGES.map((src) =>
      preloadImage(src).then(() => {
        loaded++;
        setProgress(Math.round((loaded / total) * 100));
      })
    );

    // 3. Wait for fonts
    fontPromise.then(() => {
      loaded++;
      setProgress(Math.round((loaded / total) * 100));
    });

    // Wait for everything (with a safety timeout of 8s)
    await Promise.race([
      Promise.all([...imagePromises, fontPromise]),
      new Promise((resolve) => setTimeout(resolve, 8000)),
    ]);

    setProgress(100);

    // Minimum display time so UI doesn't flash (at least 600ms total)
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Trigger fade-out
    setFadeOut(true);

    // Wait for CSS fade-out transition to finish, then unmount
    setTimeout(() => {
      onLoadComplete();
    }, 500);
  }, [onLoadComplete]);

  useEffect(() => {
    startLoading();
  }, [startLoading]);

  return (
    <div className={`loading-screen ${fadeOut ? 'loading-screen--fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-name">Oliver</div>
        <div className="loading-bar-track">
          <div
            className="loading-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-percent">{progress}%</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
