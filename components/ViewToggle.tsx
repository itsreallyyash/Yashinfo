'use client';

import { useState, useEffect, useRef } from 'react';
import { Monitor, Terminal } from 'lucide-react';

interface ViewToggleProps {
  isMinimal: boolean;
  onToggle: () => void;
}

const CustomSwitch = ({ checked, onCheckedChange, className = '', ...props }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center 
        rounded-full transition-colors duration-200 ease-in-out
        bg-black/50
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white 
        focus-visible:ring-opacity-75
        ${className}
      `}
      {...props}
    >
      <span className="sr-only">Toggle view mode</span>
      <div
        className={`
          ${checked ? 'translate-x-6 bg-white' : 'translate-x-1 bg-gray-400'}
          pointer-events-none inline-block h-4 w-4 transform 
          rounded-full shadow-lg ring-0 
          transition duration-200 ease-in-out
        `}
      />
    </button>
  );
};

export function ViewToggle({ isMinimal, onToggle }: ViewToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth - 150 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight - 80 : 0 
  });
  const toggleRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      if (!isDraggingRef.current && toggleRef.current) {
        setPosition({
          x: window.innerWidth - 150,
          y: window.innerHeight - 80,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current && toggleRef.current) {
        const newX = e.clientX - offsetRef.current.x;
        const newY = e.clientY - offsetRef.current.y;
        
        const distToRight = window.innerWidth - newX - toggleRef.current.offsetWidth;
        const distToBottom = window.innerHeight - newY - toggleRef.current.offsetHeight;
        
        let snappedX = newX;
        let snappedY = newY;
        
        if (newX < 20) snappedX = 0;
        else if (distToRight < 20) snappedX = window.innerWidth - toggleRef.current.offsetWidth;
        
        if (newY < 20) snappedY = 0;
        else if (distToBottom < 20) snappedY = window.innerHeight - toggleRef.current.offsetHeight;
        
        setPosition({ x: snappedX, y: snappedY });
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (toggleRef.current) {
      isDraggingRef.current = true;
      offsetRef.current = {
        x: e.clientX - toggleRef.current.getBoundingClientRect().left,
        y: e.clientY - toggleRef.current.getBoundingClientRect().top,
      };
    }
  };

  if (!mounted) return null;

  return (
    <div
      ref={toggleRef}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '1rem',
        borderRadius: '9999px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        zIndex: 50,
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isDraggingRef.current ? 'none' : 'all 0.3s ease-in-out',
      }}
      className="cursor-move"
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center gap-2">
        <Terminal className={`w-4 h-4 ${isMinimal ? 'text-gray-400' : 'text-[#ff72e1]'}`} />
        <CustomSwitch
          checked={isMinimal}
          onCheckedChange={onToggle}
          aria-label="Toggle view mode"
        />
        <Monitor className={`w-4 h-4 ${isMinimal ? 'text-blue-400' : 'text-gray-400'}`} />
      </div>
    </div>
  );
}

export default ViewToggle;

