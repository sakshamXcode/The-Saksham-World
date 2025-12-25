import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import AIChatBot from './components/features/AIChatBot';
import Contact from './components/sections/Contact';
import BootSequence from './components/features/BootSequence';
import FeedbackModal from './components/ui/FeedbackModal';
import { SECTION_REMARKS, ACCENT_COLORS } from './utils/constants';
import { initializeBothThemes, getRandomHeroImage } from './services/geminiService';

const App: React.FC = () => {
  // Default to Dark Mode
  const [isDark, setIsDark] = useState(true);
  const [isBooting, setIsBooting] = useState(true);
  const [isBgReady, setIsBgReady] = useState(false);
  const [heroBg, setHeroBg] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [activeRemark, setActiveRemark] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("about"); 
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  
  // Track scroll state for "Back to Top" image refresh
  const [hasScrolledDown, setHasScrolledDown] = useState(false);

  // 1. BOOT SEQUENCE INITIALIZATION (RUNS ONCE)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('alex_has_visited');
    if (!hasVisited) {
        setIsFirstVisit(true);
        sessionStorage.setItem('alex_has_visited', 'true');
    }

    const randomColor = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
    document.documentElement.style.setProperty('--accent-color', randomColor);

    // Force Dark Mode initially unless explicitly set to light in local storage previously
    const savedTheme = localStorage.getItem('theme');
    let initialThemeIsDark = true;
    
    if (savedTheme === 'light') {
        initialThemeIsDark = false;
        setIsDark(false);
        document.documentElement.classList.remove('dark');
    } else {
        setIsDark(true);
        document.documentElement.classList.add('dark');
    }

    // --- CRITICAL: GENERATE BOTH THEMES HERE ---
    const bootSequenceLoad = async () => {
        const currentTheme = initialThemeIsDark ? 'dark' : 'light';
        // Generates BOTH dark and light images, saves to folder, returns current
        const bg = await initializeBothThemes(currentTheme); 
        setHeroBg(bg);
        setIsBgReady(true);
    };

    bootSequenceLoad();
  }, []); // Empty dependency array = Runs Once.

  // 2. SCROLL LISTENER FOR "BACK TO TOP" REFRESH
  useEffect(() => {
    const handleScroll = () => {
        const currentScroll = window.scrollY;
        // Threshold where Navbar style usually changes (around 20-50px)
        const threshold = 20; 

        if (currentScroll > threshold && !hasScrolledDown) {
            setHasScrolledDown(true);
        } else if (currentScroll <= threshold && hasScrolledDown) {
            // User has returned to top!
            setHasScrolledDown(false);
            
            // Trigger random image change from the FOLDER (No API)
            const theme = isDark ? 'dark' : 'light';
            setHeroBg(getRandomHeroImage(theme));
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolledDown, isDark]);

  // 3. THEME CHANGE HANDLER (NO API CALLS)
  useEffect(() => {
      // If booting, ignore this effect as the boot effect handles it.
      if (isBooting) return;

      const updateBgOnThemeChange = () => {
          // Picks random from folder (which now contains our generated assets)
          const theme = isDark ? 'dark' : 'light';
          setHeroBg(getRandomHeroImage(theme));
      };
      updateBgOnThemeChange();
  }, [isDark, isBooting]);


  const changeAccentColor = () => {
    const randomColor = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
    document.documentElement.style.setProperty('--accent-color', randomColor);
  };

  // Intersection Observer for section-based ALEX remarks AND Chat Context
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId); 

            const remarks = SECTION_REMARKS[sectionId];
            if (remarks) {
              const randomRemark = remarks[Math.floor(Math.random() * remarks.length)];
              setActiveRemark(randomRemark);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = ['about', 'experience', 'projects', 'skills', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
  };

  return (
    <>
      {isBooting && (
        <BootSequence 
            onComplete={() => setIsBooting(false)} 
            isAssetLoaded={isBgReady} 
        />
      )}
      
      <div className={`bg-background min-h-screen text-textMain selection:bg-accent selection:text-white transition-colors duration-300 ${isBooting ? 'hidden' : 'block'}`}>
        <Navbar 
            toggleTheme={toggleTheme} 
            isDark={isDark} 
            onChangeColor={changeAccentColor}
            onOpenFeedback={() => setIsFeedbackOpen(true)} 
        />
        <main className="w-full">
          <Hero bgUrl={heroBg} isDark={isDark} />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        
        <AIChatBot 
          isOpen={isChatOpen} 
          isBooting={isBooting}
          onToggle={setIsChatOpen}
          activeRemark={activeRemark}
          activeSection={activeSection} 
          onChangeColor={changeAccentColor}
          runIntro={isFirstVisit}
        />

        <FeedbackModal 
            isOpen={isFeedbackOpen} 
            onClose={() => setIsFeedbackOpen(false)} 
        />
      </div>
    </>
  );
};

export default App;