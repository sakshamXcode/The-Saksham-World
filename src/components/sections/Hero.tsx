import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { ArrowDown, Radio, Zap, Monitor, Cpu, Globe, Smartphone, MapPin } from 'lucide-react';

interface HeroProps {
    bgUrl: string | null;
    isDark: boolean;
}

const Hero: React.FC<HeroProps> = ({ bgUrl, isDark }) => {
  const [telemetry, setTelemetry] = useState({ 
    os: 'SCANNING...', 
    browser: 'INDEXING...',
    res: '---',
    loc: 'TRACING...'
  });
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    // Real Telemetry Data for "Ahh Effect"
    const getSystemInfo = () => {
        const ua = navigator.userAgent;
        const width = window.screen.width;
        const height = window.screen.height;
        
        let os = "Unknown OS";
        if (ua.indexOf("Win") !== -1) os = "Windows NT";
        if (ua.indexOf("Mac") !== -1) os = "MacOS X";
        if (ua.indexOf("Linux") !== -1) os = "Linux Kernel";
        if (ua.indexOf("Android") !== -1) os = "Android OS";
        if (ua.indexOf("like Mac") !== -1) os = "iOS";

        let browser = "Webkit Engine";
        if (ua.indexOf("Chrome") !== -1) browser = "Chrome Core";
        if (ua.indexOf("Firefox") !== -1) browser = "Gecko Engine";
        if (ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1) browser = "Safari Webkit";

        setTelemetry(prev => ({
            ...prev,
            os: os,
            browser: browser,
            res: `${width}x${height}`
        }));
    };

    const getLocation = async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);
            const res = await fetch('https://api.db-ip.com/v2/free/self', { 
                signal: controller.signal 
            });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                setTelemetry(prev => ({
                    ...prev,
                    loc: `${data.city || 'Unknown'}, ${data.countryCode || 'Earth'}`
                }));
            }
        } catch (e) {
            setTelemetry(prev => ({ ...prev, loc: 'Encrypted Proxy' }));
        }
    };

    getSystemInfo();
    getLocation();
    
    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHub = (e: React.MouseEvent) => {
    e.preventDefault();
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
        const navbarHeight = 80;
        const targetY = experienceSection.offsetTop - navbarHeight;
        window.scrollTo({
            top: targetY,
            behavior: "smooth"
        });
    }
  };

  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center pt-32 lg:pt-36 pb-12 overflow-hidden bg-background">
      
      {/* Background Layer */}
      <div 
         className="absolute inset-[-100px] z-0 pointer-events-none transition-opacity duration-1000"
         style={{ transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0004})` }}
      >
         {bgUrl ? (
            <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url(${bgUrl})`, opacity: isDark ? 0.35 : 0.35 }}
            />
         ) : (
            <div className={`absolute inset-0 transition-all duration-1000 ${isDark ? 'opacity-20' : 'opacity-40'}`}>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent/10" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                </svg>
            </div>
         )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background z-0 pointer-events-none"></div>

      {/* Connection HUD - Desktop */}
      <div className="absolute bottom-10 left-6 lg:left-10 hidden 2xl:flex flex-col gap-4 animate-fade-in z-20">
          <div className="flex flex-col gap-4 p-6 bg-surface/30 backdrop-blur-3xl border border-white/5 rounded-[2rem] shadow-xl hover:border-accent/40 transition-all duration-500 group">
             <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-green-500/20 rounded-full">
                    <Radio className="w-4 h-4 text-green-500 animate-pulse" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-textMain uppercase tracking-[0.2em]">Visitor Uplink</span>
                    <span className="text-[8px] text-green-500 font-mono">SECURE_CONN_EST</span>
                </div>
             </div>
             
             <div className="space-y-3 pl-1">
                 <div className="flex items-center gap-3 text-textMuted group-hover:text-textMain transition-colors">
                     <Globe className="w-3 h-3" />
                     <span className="text-[10px] font-mono">{telemetry.loc}</span>
                 </div>
                 <div className="flex items-center gap-3 text-textMuted group-hover:text-textMain transition-colors">
                     <Monitor className="w-3 h-3" />
                     <span className="text-[10px] font-mono">{telemetry.os}</span>
                 </div>
                 <div className="flex items-center gap-3 text-textMuted group-hover:text-textMain transition-colors">
                     <Cpu className="w-3 h-3" />
                     <span className="text-[10px] font-mono">{telemetry.browser}</span>
                 </div>
                 <div className="flex items-center gap-3 text-textMuted group-hover:text-textMain transition-colors">
                     <Zap className="w-3 h-3" />
                     <span className="text-[10px] font-mono">{telemetry.res}</span>
                 </div>
             </div>
          </div>
      </div>

      <div className="relative w-full max-w-[1440px] mx-auto px-6 z-10 flex flex-col items-center text-center"
           style={{ transform: `translateY(${scrollY * -0.05}px)` }}>
        
        {/* Main Header */}
        <div className="space-y-8 sm:space-y-10 animate-fade-in animation-delay-200 mt-4 sm:mt-0">
            <h1 className="text-[clamp(2.5rem,13vw,10rem)] font-black tracking-tighter text-textMain leading-[0.9] filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              Saksham<br/><span className="text-accent">Singh.</span>
            </h1>
            
            <div className="flex flex-col items-center gap-4 sm:gap-5">
                <p className="text-lg sm:text-2xl md:text-5xl lg:text-6xl font-black text-textMuted tracking-tight uppercase flex flex-col sm:block gap-1">
                    Architecting <span className="text-textMain px-3 relative inline-block">
                        <span className="relative z-10">
                            <Typewriter 
                                words={[
                                    'Intelligent Agents',
                                    'AI Pipelines', 
                                    'Neural Systems', 
                                    'Auto QA Systems'
                                ]} 
                                loop={0} 
                                cursor 
                                cursorStyle='_' 
                                typeSpeed={50} 
                                delaySpeed={2000} 
                            />
                        </span>
                        <span className="absolute bottom-1 sm:bottom-2 left-0 w-full h-3 sm:h-5 bg-accent/20 -z-10 rounded-full"></span>
                    </span>
                </p>
                <div className="h-px w-20 sm:w-40 bg-accent/30 rounded-full mt-2"></div>
            </div>
        </div>

        <p className="mt-8 sm:mt-16 max-w-[900px] text-base sm:text-xl md:text-2xl text-secondary leading-relaxed font-medium animate-fade-in animation-delay-400 px-4">
            Currently <strong className="text-textMain font-black">SDE Intern @ MarketsandMarkets</strong>. Specialized in building <span className="text-accent font-black">AI-driven production systems</span> that drastically reduce manual operational overhead and optimize data throughput.
        </p>

        {/* Mobile Connection Status - Cleaner Version */}
        <div className="mt-12 sm:mt-20 2xl:hidden animate-fade-in flex flex-col items-center gap-3">
            <div className="flex items-center gap-4 px-5 py-2.5 bg-surface/40 backdrop-blur-xl rounded-full border border-white/5 shadow-lg">
                <div className="flex items-center gap-2 text-[10px] font-bold text-textMain">
                    <MapPin className="w-3 h-3 text-accent" />
                    <span>{telemetry.loc.split(',')[0] || 'Unknown'}</span>
                </div>
                <div className="w-px h-3 bg-white/10"></div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-textMuted">
                    <Smartphone className="w-3 h-3" />
                    <span>{telemetry.os}</span>
                </div>
            </div>
        </div>

        <div className="mt-12 sm:mt-32 animate-bounce opacity-30 hover:opacity-100 transition-opacity z-50">
            <button 
                onClick={scrollToHub} 
                className="group flex flex-col items-center gap-4 text-textMuted hover:text-accent transition-all cursor-pointer bg-transparent border-none"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.8em]">Scroll to Hub</span>
                <ArrowDown className="w-5 h-5" />
            </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;