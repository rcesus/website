'use client';

import { useEffect, useState } from 'react';

interface BlogPostToggleProps {
  children: React.ReactNode;
}

export default function BlogPostToggle({ children }: BlogPostToggleProps) {
  const [articleMode, setArticleMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('blog-article-mode') === 'true';
    setArticleMode(saved);
    setMounted(true);

    // Apply article mode to document element
    if (saved) {
      document.documentElement.setAttribute('data-blog-article-mode', 'true');
    }
  }, []);

  useEffect(() => {
    // Update document element whenever article mode changes
    if (articleMode) {
      document.documentElement.setAttribute('data-blog-article-mode', 'true');
    } else {
      document.documentElement.removeAttribute('data-blog-article-mode');
    }
  }, [articleMode]);

  const toggleMode = () => {
    const newMode = !articleMode;
    setArticleMode(newMode);
    localStorage.setItem('blog-article-mode', String(newMode));
  };

  const currentYear = new Date().getFullYear();

  if (!mounted) return <>{children}</>;

  return (
    <div className="blog-post-container">
      <button
        onClick={toggleMode}
        className="article-mode-toggle"
        title="Toggle article mode"
      >
        {currentYear} Mode
      </button>
      <div data-article-mode={articleMode}>{children}</div>
    </div>
  );
}
