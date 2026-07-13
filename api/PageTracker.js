// src/PageTracker.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    // 1. Grab your user identifier (adjust this to how your app stores auth state)
    const userId = localStorage.getItem('userId') || 'Guest';
    const pagePath = location.pathname + location.search; // Captures "/profile" or "/shop?item=123"

    // 2. Fire and forget the log request to your Vercel API
    fetch('/api/log-view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pagePath: pagePath,
        userId: userId,
      }),
    }).catch((err) => {
      // Gentle catch so it never crashes your users' screen if logging fails
      console.error('Analytics log failed:', err);
    });

  }, [location]); // This array ensures the effect fires EVERY time the URL changes

  return null; // This component is invisible; it just runs the background logic
}

export default PageTracker;
