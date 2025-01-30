'use client'

import { useState, useEffect } from 'react';
import { Terminal } from '../components/Terminal';
import { MinimalPortfolio } from '../components/MinimalPortfolio';
import { ViewToggle } from '../components/ViewToggle';

export default function Home() {
  const [isMinimal, setIsMinimal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent hydration issues by not rendering until mounted
  }

  return (
    <main className="relative">
      <ViewToggle isMinimal={isMinimal} onToggle={() => setIsMinimal(!isMinimal)} />
      {!isMinimal && <Terminal />}
      {isMinimal && <MinimalPortfolio />}
    </main>
  );
}

