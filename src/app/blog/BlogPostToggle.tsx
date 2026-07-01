'use client';

import { useEffect } from 'react';
import { useArticleMode } from '../ArticleModeProvider';

interface BlogPostToggleProps {
  children: React.ReactNode;
}

export default function BlogPostToggle({ children }: BlogPostToggleProps) {
  const { articleMode, toggleMode } = useArticleMode();

  useEffect(() => {
    if (articleMode) {
      document.documentElement.setAttribute('data-blog-article-mode', 'true');
    } else {
      document.documentElement.removeAttribute('data-blog-article-mode');
    }
  }, [articleMode]);

  useEffect(() => {
    return () => {
      document.documentElement.removeAttribute('data-blog-article-mode');
    };
  }, []);

  return (
    <div className="blog-post-container">
      <button
        onClick={toggleMode}
        className="article-mode-toggle"
        title="Toggle article mode"
      >
        {articleMode ? 'MySpace Mode' : '2026 Mode'}
      </button>
      {children}
    </div>
  );
}
