import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import BirthdayScene from './components/BirthdayScene';
import TypingMessage from './components/TypingMessage';
import MemoryGallery from './components/MemoryGallery';
import SecretMessage from './components/SecretMessage';
import { Heart, Stars, Sparkles } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<'opening' | 'reveal'>('opening');
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [isSecretOpen, setIsSecretOpen] = useState(false);

  const startSurprise = () => {
    setStep('reveal');
  };

  const blowCandles = () => {
    setCandlesBlown(true);
    
    // Confetti explosion
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    setTimeout(() => setShowGallery(true), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0502] text-white overflow-x-hidden relative">
      {/* Background Stars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'opening' ? (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-screen flex flex-col items-center justify-center relative z-10"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-8"
            >
              <Heart className="text-pink-500 w-16 h-16 fill-pink-500/20 neon-glow" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-serif text-center mb-12 px-4 leading-tight">
              A Special Surprise Awaits<br />
              <span className="text-pink-400 italic">For Someone Special</span>
            </h1>

            <button
              onClick={startSurprise}
              className="glass px-8 py-4 rounded-full text-xl font-medium text-pink-200 hover:text-white hover:bg-pink-500/20 transition-all duration-500 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Open Your Birthday Surprise <Stars className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            <BirthdayScene candlesBlown={candlesBlown} />

            {/* Main Content Overlay */}
            <div className="relative min-h-screen flex flex-col items-center pt-20 pb-40">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-center mb-12"
              >
                <h2 className="text-5xl md:text-7xl font-serif mb-4 neon-glow">
                  Happy Birthday Aroni 🎂❤️
                </h2>
                <p className="text-pink-300 text-xl font-light tracking-widest uppercase">17 March</p>
              </motion.div>

              {!candlesBlown && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={blowCandles}
                  className="glass px-10 py-4 rounded-full text-2xl font-serif text-pink-200 hover:text-white neon-border mb-20 flex items-center gap-3"
                >
                  Blow the Candles <Sparkles className="text-yellow-400" />
                </motion.button>
              )}

              {candlesBlown && (
                <div className="max-w-2xl px-6 mb-32">
                  <TypingMessage 
                    text={"Today is special because you were born.\nYou make my life brighter and happier.\nHappy Birthday Aroni ❤️"} 
                  />
                </div>
              )}

              {showGallery && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full max-w-7xl mx-auto"
                >
                  <h3 className="text-3xl font-serif text-center mb-12 text-pink-300">Our Magical Memories</h3>
                  <MemoryGallery />
                  
                  <div className="flex justify-center mt-20">
                    <button
                      onClick={() => setIsSecretOpen(true)}
                      className="glass px-12 py-5 rounded-full text-2xl font-serif text-pink-200 hover:text-white neon-border group flex items-center gap-3"
                    >
                      Open My Secret Message <Heart className="fill-pink-500 text-pink-500 group-hover:scale-125 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SecretMessage isOpen={isSecretOpen} onClose={() => setIsSecretOpen(false)} />

      {/* Floating Hearts CSS Animation */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-500/20 floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 3}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
    </div>
  );
}
