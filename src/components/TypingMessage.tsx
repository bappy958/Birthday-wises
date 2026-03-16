import React, { useState, useEffect } from 'react';

interface TypingMessageProps {
  text: string;
  onComplete?: () => void;
}

const TypingMessage: React.FC<TypingMessageProps> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <div className="font-serif text-xl md:text-3xl text-center leading-relaxed text-pink-200 neon-glow">
      {displayedText.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default TypingMessage;
