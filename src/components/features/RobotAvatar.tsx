import React from 'react';

export type RobotMode = 'idle' | 'dance' | 'super' | 'talking' | 'static' | 'sleepy';

interface RobotAvatarProps {
  mode: RobotMode;
  className?: string;
}

const RobotAvatar: React.FC<RobotAvatarProps> = ({ mode, className = "w-full h-full" }) => {
  const isSuper = mode === 'super';
  const isDancing = mode === 'dance' || isSuper;
  const isTalking = mode === 'talking';
  const isSleepy = mode === 'sleepy';
  const isStatic = mode === 'static';

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} transition-all duration-500 
        ${isStatic ? '' : 
          isSuper ? 'animate-[robot-super-dance_0.4s_ease-in-out_infinite]' : 
          isDancing ? 'animate-[robot-dance_0.8s_ease-in-out_infinite]' : 
          isSleepy ? 'animate-[robot-float_6s_ease-in-out_infinite]' :
          'animate-[robot-float_4s_ease-in-out_infinite]'
        }`}
    >
      <style>{`
        @keyframes robot-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes robot-dance {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(3deg) translateY(-3px); }
          75% { transform: rotate(-3deg) translateY(-3px); }
        }
        @keyframes robot-super-dance {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(8deg) translateY(-10px); }
          75% { transform: scale(1.1) rotate(-8deg) translateY(-10px); }
        }
        @keyframes antenna-glow {
          0%, 100% { fill: #ef4444; filter: drop-shadow(0 0 2px #ef4444); }
          50% { fill: #fbbf24; filter: drop-shadow(0 0 8px #fbbf24); }
        }
        @keyframes eye-blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
      `}</style>
      
      <rect x="25" y="45" width="50" height="40" rx="8" fill="currentColor" opacity="0.1" />
      <rect x="25" y="45" width="50" height="40" rx="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="30" y="15" width="40" height="25" rx="12" fill="currentColor" opacity="0.1" />
      <rect x="30" y="15" width="40" height="25" rx="12" stroke="currentColor" strokeWidth="2" fill="none" />
      
      {/* Eyes Container */}
      <g className={(!isStatic && !isSleepy) ? 'animate-[eye-blink_4s_infinite]' : ''} style={isSleepy ? { transform: 'scaleY(0.1)', transformOrigin: 'center' } : {}}>
        <circle cx="42" cy="27" r="3" fill={isSleepy ? "#71717a" : isSuper ? "#fbbf24" : "#3b82f6"} />
        <circle cx="58" cy="27" r="3" fill={isSleepy ? "#71717a" : isSuper ? "#fbbf24" : "#3b82f6"} />
      </g>
      
      <line x1="50" y1="15" x2="50" y2="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="5" r="3" className={isSuper || isTalking ? 'animate-[antenna-glow_0.5s_infinite]' : ''} fill="currentColor" />
      
      <path d={isDancing ? "M 15 50 Q 20 40 25 50" : "M 10 55 Q 18 60 25 60"} stroke="currentColor" strokeWidth="2" fill="none" />
      <path d={isDancing ? "M 85 50 Q 80 40 75 50" : "M 90 55 Q 82 60 75 60"} stroke="currentColor" strokeWidth="2" fill="none" />
      
      {/* ZZZ for Sleepy Mode */}
      {isSleepy && (
          <g className="animate-[robot-float_3s_ease-in-out_infinite]" style={{ transform: 'translateX(60px) translateY(-10px)' }}>
             <text x="60" y="10" fontSize="10" fontWeight="bold" fill="currentColor" opacity="0.7">z</text>
             <text x="68" y="5" fontSize="8" fontWeight="bold" fill="currentColor" opacity="0.5">z</text>
          </g>
      )}
    </svg>
  );
};

export default RobotAvatar;