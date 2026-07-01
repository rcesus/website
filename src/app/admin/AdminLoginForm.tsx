'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [csrfToken, setCSRFToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch CSRF token on mount
    fetch('/api/admin/csrf-token')
      .then((res) => res.json())
      .then((data) => setCSRFToken(data.csrfToken))
      .catch(() => setError('Failed to load page'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, csrfToken }),
    });

    if (response.ok) {
      router.push('/admin/editor');
    } else {
      const data = await response.json();
      setError(data.error || 'Login failed');
      setPassword('');
      setIsLoading(false);
      // Refresh CSRF token on error
      fetch('/api/admin/csrf-token')
        .then((res) => res.json())
        .then((data) => setCSRFToken(data.csrfToken))
        .catch(() => {});
    }
  };

  return (
    <section className="admin-section">
      <header className="main-section-header">
        <h2 className="main-section-h2">Admin Login</h2>
      </header>

      <div className="admin-container">
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn" disabled={isLoading || !csrfToken}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <nav className="admin-nav">
          <span>[<Link href="/">Back Home</Link>]</span>
        </nav>
      </div>
    </section>
  );
}
