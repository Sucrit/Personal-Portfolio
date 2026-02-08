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
  // First image of each project carousel (Critical for initial render)
  '/roomfinder/mobile1.png',
  '/evacudesk/adl.png',
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
    img.src = src;
    
    const handleLoad = () => {
      // Try to decode if supported to ensure it's ready for GPU
      if ('decode' in img) {
        img.decode()
          .then(() => resolve())
          .catch(() => resolve()); // Fallback if decode fails
      } else {
        resolve();
      }
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.onload = handleLoad;
      img.onerror = () => resolve(); // Don't block on failures
    }
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
    // 1. Minimum display time (2s) to prevent flashing
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 2000));
    const fontPromise = waitForFonts();

    // 2. Preload all images
    let loaded = 0;
    const total = CRITICAL_IMAGES.length + 1; // +1 for fonts

    // Helper to update progress smoothly
    const updateProgress = () => {
      loaded++;
      // We cap the visual progress at 95% until minimum time is met
      const rawPercent = Math.round((loaded / total) * 100);
      setProgress(Math.min(rawPercent, 95));
    };

    const imagePromises = CRITICAL_IMAGES.map((src) =>
      preloadImage(src).then(updateProgress)
    );

    // 3. Wait for fonts
    fontPromise.then(updateProgress);

    // Wait for everything: Assets AND Minimum Time
    await Promise.all([
      Promise.all([...imagePromises, fontPromise]),
      minTimePromise
    ]);

    // Force 100% and wait a tick for visual completion
    setProgress(100);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Trigger fade-out
    setFadeOut(true);

    // Wait for fade-out transition
    setTimeout(() => {
      onLoadComplete();
    }, 800);
  }, [onLoadComplete]);

  useEffect(() => {
    startLoading();
  }, [startLoading]);

  // Inline styles as backup for critical layout properties to ensure visibility even if CSS loads late
  const backupStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0b1026',
    transition: 'opacity 0.5s ease-out',
    opacity: fadeOut ? 0 : 1,
    pointerEvents: fadeOut ? 'none' : 'auto'
  };

  return (
    <div className={`loading-screen ${fadeOut ? 'loading-screen--fade-out' : ''}`} style={backupStyles}>
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
