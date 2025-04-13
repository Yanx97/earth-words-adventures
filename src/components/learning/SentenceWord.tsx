
import React from "react";

interface SentenceWordProps {
  word: string;
  isHighlighted?: boolean;
  onClick?: () => void;
}

const SentenceWord = ({ word, isHighlighted, onClick }: SentenceWordProps) => {
  return (
    <span 
      className={`inline-block px-1 py-0.5 rounded cursor-pointer transition-colors ${
        isHighlighted ? 'bg-primary/20 text-primary' : 'hover:bg-muted'
      }`}
      onClick={onClick}
    >
      {word}
    </span>
  );
};

export default SentenceWord;
