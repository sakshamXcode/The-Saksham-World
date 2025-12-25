import React, { useState, useEffect, useRef } from 'react';
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
import { hydrateCache, getRandomHeroImage, replenishAssetPool } from './services/geminiService';

// MODULE-LEVEL GUARD
// This exists outside the component lifecycle to survive React.StrictMode double-invocations.
let isSessionInitialized = false;

const App: React.FC = () => {
  // Default to Dark Mode explicitly
  const [isDark, setIsDark] = useState(true);
  const [isBooting, setIsBooting] = useState(true);
  const [isBgReady, setIsBgReady] = useState(false);
  const [heroBg, setHeroBg] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [activeRemark, setActiveRemark] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("about"); 
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  
  const [hasScrolledDown, setHasScrolledDown] = useState(false);

  // 1. BOOT SEQUENCE INITIALIZATION (RUNS ONCE PER PAGE LOAD)
  useEffect(() => {
    // Strict Mode Guard
    if (isSessionInitialized) return;
    isSessionInitialized = true;

    const hasVisited = sessionStorage.getItem('alex_has_visited');
    if (!hasVisited) {
        setIsFirstVisit(true);
        sessionStorage.setItem('alex_has_visited', 'true');
    }

    // Set Random Accent
    const randomColor = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
    document.documentElement.style.setProperty('--accent-color', randomColor);

    // Theme Logic: Default to DARK if not specified
    const savedTheme = localStorage.getItem('theme');
    let initialThemeIsDark = true;
    
    if (savedTheme === 'light') {
        initialThemeIsDark = false;
        setIsDark(false);
        document.documentElement.classList.remove('dark');
    } else {
        // Enforce Dark Mode
        setIsDark(true);
        document.documentElement.classList.add('dark');
        if (!savedTheme) localStorage.setItem('theme', 'dark');
    }

    // --- SYSTEM STARTUP ---
    const systemInit = async () => {
        console.log("[ALEX SYSTEM] Boot sequence initiated.");
        
        // 1. Load saved images from disk (Fast)
        hydrateCache(); 
        
        // 2. Set the initial background immediately (From static or cache)
        const currentTheme = initialThemeIsDark ? 'dark' : 'light';
        const bgImage = getRandomHeroImage(currentTheme);
        setHeroBg(bgImage);
        
        // 3. Mark asset as ready to clear boot screen
        setIsBgReady(true);

        // 4. Trigger background generation queue (Fire and Forget)
        // This will check cache size and generate 1 Dark then 1 Light image if needed
        setTimeout(() => {
            replenishAssetPool();
        }, 1000); // Small delay to let UI settle before API hit
    };

    systemInit();
  }, []); // Empty dependency array

  // 2. SCROLL LISTENER FOR "BACK TO TOP" REFRESH
  useEffect(() => {
    const handleScroll = () => {
        const currentScroll = window.scrollY;
        const threshold = 20; 

        if (currentScroll > threshold && !hasScrolledDown) {
            setHasScrolledDown(true);
        } else if (currentScroll <= threshold && hasScrolledDown) {
            setHasScrolledDown(false);
            const theme = isDark ? 'dark' : 'light';
            setHeroBg(getRandomHeroImage(theme));
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolledDown, isDark]);

  // 3. THEME CHANGE HANDLER
  useEffect(() => {
      if (isBooting) return;
      const theme = isDark ? 'dark' : 'light';
      setHeroBg(getRandomHeroImage(theme));
  }, [isDark, isBooting]);


  const changeAccentColor = () => {
    const randomColor = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
    document.documentElement.style.setProperty('--accent-color', randomColor);
  };

  // Intersection Observer
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
          <Skills shouldRenderChart={!isBooting} />
          <Contact onOpenFeedback={() => setIsFeedbackOpen(true)} />
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