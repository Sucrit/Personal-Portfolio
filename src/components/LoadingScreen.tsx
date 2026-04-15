import { useState, useEffect, useCallback } from 'react';
import './LoadingScreen.css';

// Preload assets
const CRITICAL_IMAGES = [
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
  '/roomfinder/mobile1.png',
  '/roomfinder/mobile2.png',
  '/roomfinder/ss1.png',
  '/roomfinder/ss2.png',
  '/roomfinder/ss3.png',
  '/evacudesk/adl.png',
  '/evacudesk/evacudesk.png',
  '/evacudesk/web1.png',
  '/evacudesk/ss2.png',
  '/evacudesk/ss3.png',
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

// Preload helpers
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    
    const handleLoad = () => {
      if ('decode' in img) {
        img.decode()
          .then(() => resolve())
          .catch(() => resolve()); 
      } else {
        resolve();
      }
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.onload = handleLoad;
      img.onerror = () => resolve();
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

const LoadingPhrases = [
  "Gathering the stars...", 
  "Building pixels...",
  "Summoning the moon...",
  "Building the lighthouse...",
  "Constructing the horizon...",
  "Planting the trees...",
  "Brewing your coffee...",
];

// Loading UI
const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(LoadingPhrases[0]);

  useEffect(() => {
    setCurrentPhrase(LoadingPhrases[Math.floor(Math.random() * LoadingPhrases.length)]);
    
    const interval = setInterval(() => {
        setCurrentPhrase(LoadingPhrases[Math.floor(Math.random() * LoadingPhrases.length)]);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const startLoading = useCallback(async () => {
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 2000));
    const fontPromise = waitForFonts();

    let loaded = 0;
    const total = CRITICAL_IMAGES.length + 1;

    const updateProgress = () => {
      loaded++;
      const rawPercent = Math.round((loaded / total) * 100);
      setProgress(Math.min(rawPercent, 95));
    };

    const imagePromises = CRITICAL_IMAGES.map((src) =>
      preloadImage(src).then(updateProgress)
    );

    fontPromise.then(updateProgress);

    await Promise.all([
      Promise.all([...imagePromises, fontPromise]),
      minTimePromise
    ]);

    setProgress(100);
    await new Promise(resolve => setTimeout(resolve, 500));

    setFadeOut(true);

    setTimeout(() => {
      onLoadComplete();
    }, 800);
  }, [onLoadComplete]);

  useEffect(() => {
    startLoading();
  }, [startLoading]);

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
        <div className="loading-star-icon">✦</div>
        <div className="loading-text">{currentPhrase}</div>
        
        <div className="loading-bar-container">
            <div className="loading-bar-track">
            <div
                className="loading-bar-fill"
                style={{ width: `${progress}%` }}
            />
            </div>
        </div>
        
        <div className="loading-percent">{progress}%</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
