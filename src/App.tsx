import { useCallback, useState } from 'react';
import styles from './App.module.css';
import FantasyBackground from './components/FantasyBackground';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setIsLoaded(true), []);

  return (
    <>
      <FantasyBackground />
      <Navbar />
      <main className={styles.main} style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
        <HeroSection isLoaded={isLoaded} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      {!isLoaded && <LoadingScreen onLoadComplete={handleLoadComplete} />}
    </>
  );
}

export default App;
