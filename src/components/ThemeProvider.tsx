import React, { ReactNode, useEffect, useState } from 'react';

export type PacioliTheme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: ReactNode;
  theme?: PacioliTheme;
  className?: string; // Additional classes for the container
}

export function PacioliProvider({ children, theme = 'system', className = '' }: ThemeProviderProps) {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setActiveTheme(mediaQuery.matches ? 'dark' : 'light');
      
      const listener = (e: MediaQueryListEvent) => setActiveTheme(e.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      setActiveTheme(theme);
    }
  }, [theme]);

  const themeClass = activeTheme === 'dark' ? 'pacioli-theme-dark' : 'pacioli-theme-light';

  return (
    <div className={`pacioli-container ${themeClass} ${className}`}>
      {children}
    </div>
  );
}
