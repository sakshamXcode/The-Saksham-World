import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Code2, Sun, Moon, Palette, MessageSquarePlus, ChevronRight } from 'lucide-react';

interface NavbarProps {
  toggleTheme: () => void;
  isDark: boolean;
  onChangeColor: () => void;
  onOpenFeedback: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDark, onChangeColor, onOpenFeedback }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      
      setScrolled(window.scrollY > 20);
      const sections = ['about', 'experience', 'projects', 'skills', 'contact'];
      // Offset for mobile to trigger earlier
      const scrollPosition = window.scrollY + (window.innerWidth < 768 ? 100 : 150);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    
    if (element) {
      isScrollingRef.current = true;
      setActiveSection(id);
      
      const targetPosition = element.offsetTop - 80;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
    <nav className={`fixed top-0 left-0 w-full z-[150] transition-all duration-300 ${
      scrolled ? 'py-3 sm:py-4 bg-background/80 backdrop-blur-3xl border-b border-white/5 shadow-xl' : 'py-4 sm:py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center lg:pl-8">
            <a href="#" onClick={(e) => handleNavClick(e, '#about')} className="flex items-center gap-3 sm:gap-4 group">
             <div className="p-2 sm:p-2.5 bg-primary text-primary-foreground rounded-xl shadow-2xl group-hover:bg-accent transition-all duration-300">
                {/* Fixed Image Size & Used Data URI for consistency */}
                <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%2318181b'/%3E%3Cg transform='translate(4,4)' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' fill='none'%3E%3Cpath d='m18 16 4-4-4-4'/%3E%3Cpath d='m6 8-4 4 4 4'/%3E%3Cpath d='m14.5 4-5 16'/%3E%3C/g%3E%3C/svg%3E" 
                    alt="SS" 
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-md"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <h1 className="font-black text-base sm:text-xl text-textMain tracking-tighter">
                  SAKSHAM<span className="text-accent">.</span>
                </h1>
                <span className="hidden sm:block text-xs font-black text-accent uppercase tracking-[0.25em] mt-1 drop-shadow-sm">
                  Full Stack AI Engineer
                </span>
              </div>
            </a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative text-xs sm:text-sm font-black uppercase tracking-[0.15em] hover:tracking-[0.2em] transition-all py-1
                      ${isActive ? 'text-textMain' : 'text-textMuted hover:text-textMain'}
                    `}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-accent rounded-full animate-fade-in shadow-[0_0_10px_var(--accent-color)]"></span>
                    )}
                  </a>
                );
              })}
            </div>

            <div className="w-px h-5 bg-white/10 mx-2"></div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onOpenFeedback}
                    className="px-4 py-2 rounded-xl bg-accent text-white hover:bg-accent/80 transition-all text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-accent/20 flex items-center gap-2 active:scale-95"
                >
                    <MessageSquarePlus className="w-4 h-4" /> Feedback
                </button>
                <button
                    onClick={onChangeColor}
                    className="p-2.5 rounded-xl hover:bg-surface text-textMuted hover:text-accent transition-all active:scale-75 border border-transparent hover:border-white/5"
                    aria-label="Change Color Theme"
                >
                    <Palette className="w-4 h-4" />
                </button>
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl hover:bg-surface text-textMuted hover:text-textMain transition-all active:scale-75 border border-transparent hover:border-white/5"
                >
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-surface/50 border border-white/10 text-textMain active:scale-75 relative z-[160] transition-all"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Overlay Menu - Moved outside nav to avoid stacking context issues and boosted Z-Index */}
    <div className={`md:hidden fixed inset-0 z-[9999] bg-background h-[100dvh] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${
      isOpen ? 'opacity-100 pointer-events-all translate-x-0' : 'opacity-0 pointer-events-none translate-x-full'
    }`}>
        {/* Navigation Links */}
        <div className="flex-1 flex flex-col justify-center px-8 gap-6 pt-20">
          {navLinks.map((link, idx) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center justify-between text-3xl font-black uppercase tracking-tighter py-2 transition-all duration-500 delay-[${idx * 50}ms] border-b border-white/5 pb-4
                  ${isActive ? 'text-accent pl-2' : 'text-textMuted hover:text-textMain'}
                  ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}
                `}
              >
                {link.name}
                {isActive && <ChevronRight className="w-6 h-6 animate-pulse" />}
              </a>
            );
          })}
        </div>
        
        {/* Mobile Controls & Footer */}
        <div className={`p-8 bg-surface/30 border-t border-white/5 flex flex-col gap-6 transition-all duration-700 delay-300 pb-12 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            <button
                onClick={() => { onOpenFeedback(); setIsOpen(false); }}
                className="w-full py-4 rounded-xl bg-accent text-white flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs shadow-lg active:scale-95"
            >
                <MessageSquarePlus className="w-4 h-4" /> Give Feedback
            </button>

            <div className="flex gap-4">
                <button
                    onClick={onChangeColor}
                    className="flex-1 py-4 rounded-xl bg-surface border border-white/10 text-textMain flex items-center justify-center gap-2 active:scale-95"
                >
                    <Palette className="w-4 h-4" /> <span className="text-xs font-bold uppercase">Color</span>
                </button>
                <button
                    onClick={toggleTheme}
                    className="flex-1 py-4 rounded-xl bg-surface border border-white/10 text-textMain flex items-center justify-center gap-2 active:scale-95"
                >
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} <span className="text-xs font-bold uppercase">Theme</span>
                </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-textMuted/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
                <span>Saksham</span>
                <div className="w-1 h-1 bg-accent rounded-full"></div>
                <span>Singh</span>
            </div>
        </div>
    </div>
    </>
  );
};

export default Navbar;