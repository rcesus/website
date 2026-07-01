'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface ArticleModeContextType {
  articleMode: boolean;
  toggleMode: () => void;
}

const ArticleModeContext = createContext<ArticleModeContextType | undefined>(undefined);

export function ArticleModeProvider({ children }: { children: React.ReactNode }) {
  const [articleMode, setArticleMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('blog-article-mode') === 'true';
    setArticleMode(saved);
  }, []);

  const toggleMode = () => {
    const newMode = !articleMode;
    setArticleMode(newMode);
    localStorage.setItem('blog-article-mode', String(newMode));
  };

  return (
    <ArticleModeContext.Provider value={{ articleMode, toggleMode }}>
      {children}
    </ArticleModeContext.Provider>
  );
}

export function useArticleMode() {
  const context = useContext(ArticleModeContext);
  if (!context) {
    throw new Error('useArticleMode must be used within ArticleModeProvider');
  }
  return context;
}
