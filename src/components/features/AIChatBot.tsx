import React, { useState, useRef, useEffect } from 'react';
import { Send, User, X, Mic, Palette } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import RobotAvatar, { RobotMode } from './RobotAvatar';
import { ChatMessage } from '@/src/types';
import { TICKLE_REMARKS } from '@/src/utils/constants';
import { generateResponseStream } from '@/src/services/geminiService';

interface AIChatBotProps {
  isOpen: boolean;
  isBooting: boolean;
  onToggle: (isOpen: boolean) => void;
  activeRemark?: string;
  activeSection?: string;
  onChangeColor: () => void;
  runIntro?: boolean;
}

// Internal Component for Bubble Typing Effect
const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    
    if (!text) return;

    let i = 0;
    const chars = Array.from(text);
    
    const interval = setInterval(() => {
        if (i < chars.length) {
            const char = chars[i];
            if (char !== undefined) {
                setDisplayedText(prev => prev + char);
            }
            i++;
        } else {
            clearInterval(interval);
        }
    }, 20); 
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <ReactMarkdown 
        components={{
            p: ({children}) => <span className="inline">{children}</span>,
            strong: ({children}) => <span className="text-accent font-black">{children}</span>,
            em: ({children}) => <span className="text-accent italic">{children}</span>
        }}
    >
        {displayedText}
    </ReactMarkdown>
  );
};

const AIChatBot: React.FC<AIChatBotProps> = ({ isOpen, isBooting, onToggle, activeRemark, activeSection, onChangeColor, runIntro }) => {
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Widget/Bubble State
  const [isHovered, setIsHovered] = useState(false);
  const [tickleMessage, setTickleMessage] = useState<string | null>(null);
  const [introMessage, setIntroMessage] = useState<string | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [avatarModeOverride, setAvatarModeOverride] = useState<RobotMode | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const introInProgress = useRef(false);
  const scratchRef = useRef(false);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
  }, [messages, isOpen]);

  // Helper to stream system messages (Internal Chat Window Only)
  const streamSystemMessage = (text: string) => {
    if (!text) return;
    const msgId = 'sys-' + Date.now();
    setMessages(prev => [...prev, { id: msgId, role: 'model', text: '', isThinking: true }]);
    
    let i = 0;
    let currentText = '';
    const chars = Array.from(text);
    const speed = 20;

    const interval = setInterval(() => {
        if (i < chars.length) {
            const char = chars[i];
            if (char !== undefined) {
                currentText += char;
                setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: currentText } : m));
            }
            i++;
        } else {
            clearInterval(interval);
            setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isThinking: false } : m));
        }
    }, speed);
  };

  // --- WIDGET LOGIC ---

  // 1. Tickle Logic (Hover)
  useEffect(() => {
    if (isHovered && !isOpen && introDone && !avatarModeOverride) {
        // Only tickle if we aren't in a forced sequence
        const randomTickle = TICKLE_REMARKS[Math.floor(Math.random() * TICKLE_REMARKS.length)];
        setTickleMessage(randomTickle);
    } else {
        setTickleMessage(null);
    }
  }, [isHovered, isOpen, introDone, avatarModeOverride]);

  // 2. Intro Sequence (Run Once)
  useEffect(() => {
      if (!isBooting && !introDone && !introInProgress.current) {
          introInProgress.current = true;
          
          const hour = new Date().getHours();
          const isLateNight = hour >= 23 || hour < 6;

          let sequence: { text: string; delay: number; mode: RobotMode }[] = [];

          if (isLateNight) {
              sequence = [
                  { 
                      text: "Zzzzz... *yawn*... Working late? I was in sleep mode! 😴", 
                      delay: 500, 
                      mode: 'sleepy' 
                  },
                  { text: "Booting up systems...", delay: 4500, mode: 'static' },
                  { text: "Hi, I am **ALEX**.", delay: 6500, mode: 'idle' },
              ];
          } else {
              // Daytime Sequence: Careless worker caught off guard
              sequence = [
                  { 
                      text: "🎵 *whistling*... just cleaning these pixels...", 
                      delay: 500, 
                      mode: 'dance' // Careless vibe
                  },
                  { 
                      text: "WAIT! A visitor?! 😳", 
                      delay: 3500, 
                      mode: 'super' // Shocked/Alert
                  },
                  { 
                      text: "*scrambles*... *fixes tie*... *clears cache*...", 
                      delay: 5500, 
                      mode: 'dance' // Fidgety
                  },
                  { 
                      text: "Ahem. Professional mode ON. I am **ALEX**.", 
                      delay: 8500, 
                      mode: 'idle' // Composed
                  },
              ];
          }

          sequence.forEach((item, index) => {
              setTimeout(() => {
                  setIntroMessage(item.text);
                  setAvatarModeOverride(item.mode);

                  if (index === sequence.length - 1) {
                      setTimeout(() => {
                          setIntroMessage(null);
                          setAvatarModeOverride(null);
                          setIntroDone(true);
                      }, 2500);
                  }
              }, item.delay);
          });
      }
  }, [isBooting, introDone]);

  // --- CHAT WINDOW LOGIC ---

  // Initial Greeting when Chat Opens
  useEffect(() => {
    if (isOpen && messages.length === 0 && !isLoading) {
        setIsLoading(true);
        const hour = new Date().getHours();
        let greeting = "Good Morning";
        if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
        if (hour >= 17) greeting = "Good Evening";

        const fullGreeting = `${greeting}! I am **ALEX**, Mr. Singh's digital assistant. \n\nI can answer questions about his **Experience**, **Projects**, or **Technical Skills**. What would you like to know?`;

        setTimeout(() => {
            setIsLoading(false);
            streamSystemMessage(fullGreeting);
        }, 500); 
    }
  }, [isOpen]);

  // Chat API Handler
  const toggleSpeech = () => {
    if (!('webkitSpeechRecognition' in window)) return;
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e: any) => {
        setInput(prev => prev + ' ' + e.results[0][0].transcript);
        setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { id: 'u-' + Date.now(), role: 'user', text: userText }]);
    setIsLoading(true);

    const modelMsgId = 'm-' + Date.now();
    setMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: '', isThinking: true }]);

    try {
        const stream = generateResponseStream(userText);
        let fullText = "";
        for await (const chunk of stream) {
            fullText += chunk;
            setMessages(prev => {
                const newMsgs = [...prev];
                const index = newMsgs.findIndex(m => m.id === modelMsgId);
                if (index !== -1) newMsgs[index] = { ...newMsgs[index], text: fullText, isThinking: false };
                return newMsgs;
            });
        }
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  // --- RENDER HELPERS ---

  // Determine Bubble Content
  // Priority: Intro > Tickle (Hover) > Active Section Remark
  // NOTE: If Open, we generally hide the bubble to focus on chat, unless strict requirement otherwise.
  const bubbleMessage = introMessage || tickleMessage || activeRemark;
  const showBubble = !isOpen && !!bubbleMessage;

  // Determine Avatar Mode
  // Priority: Override (Intro) > Tickle (Super) > Talking (Chatting) > Idle
  let currentAvatarMode: RobotMode = 'idle';
  if (avatarModeOverride) {
      currentAvatarMode = avatarModeOverride;
  } else if (isHovered && !isOpen) {
      currentAvatarMode = 'super'; // Giggle/React on hover
  } else if (isLoading) {
      currentAvatarMode = 'talking';
  } else {
      currentAvatarMode = 'idle';
  }

  // Mobile Touch Logic for Widget
  const handleTouchStart = () => { scratchRef.current = false; };
  const handleTouchMove = () => { 
      scratchRef.current = true; 
      if (!isHovered) setIsHovered(true);
  };
  const handleTouchEnd = () => { 
      if (scratchRef.current) setTimeout(() => setIsHovered(false), 1500); 
  };
  const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!scratchRef.current) onToggle(true);
      scratchRef.current = false; 
  };

  return (
    <>
      {isOpen && <div onClick={() => onToggle(false)} className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-xl animate-fade-in" />}

      {/* WIDGET ICON */}
      {!isOpen && (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleClick}
            className="fixed bottom-6 right-6 sm:bottom-10 sm:right-20 z-[100] active:scale-90 transition-all cursor-pointer select-none"
        >
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center group">
                {/* Glow Effect */}
                <div className={`absolute inset-[-15%] rounded-full transition-all duration-500 ${currentAvatarMode === 'super' ? 'bg-accent/40 scale-110' : 'bg-surface/20'} backdrop-blur-sm`} />
                
                {/* THE SPEECH BUBBLE */}
                {showBubble && (
                   <div className="absolute bottom-full mb-4 right-0 bg-zinc-900/90 backdrop-blur-xl border border-accent/20 border-l-4 border-l-accent px-5 py-4 rounded-xl rounded-br-none shadow-[0_8px_30px_rgba(0,0,0,0.3)] text-gray-100 pointer-events-none origin-bottom-right w-[280px] sm:w-[340px] max-w-[calc(100vw-40px)] animate-float z-50">
                      <div className={`text-xs sm:text-sm font-bold italic tracking-wide leading-relaxed font-mono ${introMessage || tickleMessage ? 'text-accent' : 'text-gray-200'}`}>
                        <TypewriterText key={bubbleMessage || "empty"} text={bubbleMessage || ""} />
                      </div>
                   </div>
                )}

                <div className="relative z-10 w-full h-full pointer-events-none text-accent">
                    <RobotAvatar mode={currentAvatarMode} />
                </div>
            </div>
        </div>
      )}

      {/* CHAT WINDOW */}
      {isOpen && !isBooting && (
        <div className="fixed bottom-0 sm:bottom-10 right-0 sm:right-10 w-full sm:w-[480px] h-[100dvh] sm:h-[750px] z-[300] flex flex-col animate-float-up sm:rounded-[3rem] overflow-hidden bg-zinc-900 backdrop-blur-[60px] border-t sm:border border-white/10 shadow-2xl transition-colors">
          <div className="p-6 sm:p-10 bg-zinc-900/90 border-b border-white/5 flex justify-between items-center shrink-0">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 text-accent">
                    <RobotAvatar mode={isLoading ? 'talking' : 'static'} />
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-black text-white tracking-tighter uppercase">ALEX INTERFACE</span>
                    <span className="text-[10px] text-accent font-mono tracking-widest opacity-80 uppercase">Autonomous Intelligence</span>
                </div>
             </div>
             <div className="flex items-center gap-2">
                 <button onClick={onChangeColor} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-accent transition-colors">
                    <Palette className="w-5 h-5" />
                 </button>
                 <button 
                    onClick={(e) => { e.stopPropagation(); onToggle(false); }} 
                    className="text-gray-400 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all active:scale-75 cursor-pointer bg-white/5"
                    aria-label="Close Chat"
                 >
                    <X className="w-6 h-6" />
                 </button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 scrollbar-none overscroll-contain bg-zinc-950/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 border ${msg.role === 'model' ? 'bg-zinc-800 border-white/5 shadow-sm text-gray-200' : 'bg-accent border-accent text-white'}`}>
                  {msg.role === 'model' ? <div className="w-8 h-8"><RobotAvatar mode="static" /></div> : <User className="w-6 h-6" />}
                </div>
                <div className={`max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-6 py-4 text-sm sm:text-[15px] leading-relaxed shadow-sm 
                        ${msg.role === 'user' 
                            ? 'bg-accent text-white rounded-2xl rounded-tr-none font-medium' 
                            : 'bg-zinc-800 text-gray-200 border border-white/5 rounded-2xl rounded-tl-none font-medium'
                        }`}>
                       {msg.isThinking && !msg.text ? <div className="flex gap-2 h-3 items-center px-1"><div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div><div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.1s]"></div><div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.2s]"></div></div> : <div className={`prose prose-sm max-w-none prose-invert text-gray-200`}><ReactMarkdown>{msg.text}</ReactMarkdown></div>}
                    </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 sm:p-10 bg-zinc-900 border-t border-white/5 pb-10">
            <form onSubmit={handleSend} className="flex items-center gap-2 sm:gap-4 bg-zinc-950/50 border border-white/10 rounded-3xl p-2 focus-within:border-accent/50 transition-all shadow-sm">
                <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={isListening ? "Listening..." : "Query ALEX..."} className="flex-1 min-w-0 bg-transparent text-gray-100 px-4 py-3 outline-none text-sm font-bold placeholder:text-gray-500" disabled={isLoading} />
                <button type="button" onClick={toggleSpeech} className={`p-3 rounded-xl transition-colors shrink-0 ${isListening ? 'text-red-500 bg-red-500/10' : 'text-gray-400 hover:text-white'}`}><Mic className="w-5 h-5" /></button>
                <button type="submit" disabled={isLoading || !input.trim()} className="p-4 bg-accent text-white rounded-2xl hover:bg-accent/80 transition-all active:scale-75 shadow-lg shrink-0"><Send className="w-5 h-5" /></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;