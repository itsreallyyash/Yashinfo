'use client'

import { CV } from '../../components/CV';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CVPage() {
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = () => {
      const terminalState = localStorage.getItem('terminalState');
      if (terminalState) {
        sessionStorage.setItem('terminalState', terminalState);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <CV />;
}

