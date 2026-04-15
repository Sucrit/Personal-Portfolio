import { useState, useEffect, useCallback } from 'react';
import { loadingPhrases, preloadAssets } from '../data/portfolio';
import './LoadingScreen.css';

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    const handleLoad = () => {
      if ('decode' in img) {
        img.decode().then(resolve).catch(resolve);
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

const phraseCount = loadingPhrases.length;

function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const currentPhrase: string = loadingPhrases[phraseIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((current) => (current + 1) % phraseCount);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const startLoading = useCallback(async () => {
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 2000));
    const fontPromise = waitForFonts();

    let loaded = 0;
    const total = preloadAssets.length + 1;

    const updateProgress = () => {
      loaded += 1;
      const rawPercent = Math.round((loaded / total) * 100);
      setProgress(Math.min(rawPercent, 95));
    };

    const imagePromises = preloadAssets.map((src) => preloadImage(src).then(updateProgress));
    fontPromise.then(updateProgress);

    await Promise.all([Promise.all([...imagePromises, fontPromise]), minTimePromise]);

    setProgress(100);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setFadeOut(true);
    setTimeout(onLoadComplete, 800);
  }, [onLoadComplete]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void startLoading();
    }, 0);

    return () => clearTimeout(timeout);
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
    pointerEvents: fadeOut ? 'none' : 'auto',
  };

  return (
    <div
      className={`loading-screen ${fadeOut ? 'loading-screen--fade-out' : ''}`}
      style={backupStyles}
    >
      <div className="loading-content">
        <div className="loading-star-icon">✦</div>
        <div className="loading-text">{currentPhrase}</div>

        <div className="loading-bar-container">
          <div className="loading-bar-track">
            <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="loading-percent">{progress}%</div>
      </div>
    </div>
  );
}

export default LoadingScreen;
