
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [currentSplash, setCurrentSplash] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentSplash(2);
    }, 2000);

    const timer2 = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center">
      <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20 text-center">
        {currentSplash === 1 ? (
          <div className="animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">SP</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">SouriPay</h1>
            <p className="text-white/80">البنك الرقمي الأول في سوريا</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-3xl font-bold text-white">💳</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">مرحباً بك</h1>
            <p className="text-white/80">في عالم المصرفية الرقمية</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SplashScreen;
