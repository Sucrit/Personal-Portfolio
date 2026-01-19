import { useState, useEffect } from 'react';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export const useHackerEffect = (text: string, speed: number = 30) => {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    let iterations = 0;
    
    // Initial scramble, then resolve
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );
      
      if (iterations >= text.length) {
        clearInterval(interval);
      }
      
      iterations += 1 / 3; // Resolve slower than scramble
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayText;
};
