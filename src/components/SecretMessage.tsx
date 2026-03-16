import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface SecretMessageProps {
  isOpen: boolean;
  onClose: () => void;
}

const SecretMessage: React.FC<SecretMessageProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="glass max-w-lg w-full p-8 rounded-3xl relative overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-pink-300 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>

            <h2 className="text-3xl font-serif text-pink-300 mb-6 text-center neon-glow">My Secret Message</h2>
            
            <div className="space-y-4 text-pink-100 leading-relaxed font-light text-lg">
              <p>To my dearest Aroni,</p>
              <p>
                Every moment with you feels like a dream I never want to wake up from. 
                You are the melody to my heart and the light in my world.
              </p>
              <p>
                On this special day, I want you to know how much you mean to me. 
                You're not just a year older, you're a year more beautiful, a year more amazing.
              </p>
              <p className="text-center font-serif italic text-pink-300 mt-8">
                Forever yours, ❤️
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecretMessage;
