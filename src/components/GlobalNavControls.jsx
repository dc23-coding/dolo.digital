import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * GlobalNavControls
 * - Back/Forward navigation
 * - Link to Route Calculator
 * - Theme toggle (light / dark)
 */
const GlobalNavControls = () => {
  const navigate = useNavigate();
  // Initialize theme from localStorage or OS preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Apply/remove `dark` class on <html> and persist
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Navigation handlers
  const handleBack = () => window.history.length > 1 && navigate(-1);
  const handleForward = () => navigate(1);
  const goToRouteCalculator = () => navigate('/route-calculator');
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 
                    bg-white/75 dark:bg-gray-800/75 backdrop-blur-lg rounded-full p-2 z-50">
      <Button onClick={handleBack} variant="outline" size="sm" className="rounded-full">
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <Button onClick={goToRouteCalculator} variant="default" size="sm" className="rounded-full">
        <MapPin className="h-4 w-4" />
      </Button>

      <Button onClick={handleForward} variant="outline" size="sm" className="rounded-full">
        <ArrowRight className="h-4 w-4" />
      </Button>

      <Button onClick={toggleTheme} variant="outline" size="sm" className="rounded-full">
        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default GlobalNavControls;
