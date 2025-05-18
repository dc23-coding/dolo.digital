// src/components/GlobalNavControls.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const GlobalNavControls = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleBack = () => window.history.length > 1 && navigate(-1);
  const handleForward = () => navigate(1);
  const goToRouteCalculator = () => navigate('/route-calculator');

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={handleBack} variant="outline" size="sm" className="rounded-full">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={goToRouteCalculator} variant="default" size="sm" className="rounded-full">
          <MapPin className="h-4 w-4" />
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={handleForward} variant="outline" size="sm" className="rounded-full">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={toggleTheme} variant="outline" size="sm" className="rounded-full">
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </motion.div>
    </div>
  );
};

export default GlobalNavControls;
