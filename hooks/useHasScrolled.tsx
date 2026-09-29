import { useState, useEffect } from 'react';

export function useHasScrolled(threshold = 0) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the page has been scrolled past the threshold
      const isPastThreshold = window.scrollY > threshold;
      setHasScrolled(isPastThreshold);
    };

    // Run initially to capture current position on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return hasScrolled;
}
