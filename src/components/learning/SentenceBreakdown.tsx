
import React from "react";
import SentenceWord from "./SentenceWord";

interface SentenceBreakdownProps {
  sentence: string;
  onWordClick: (word: string) => void;
  highlightedWord: string | null;
}

const SentenceBreakdown = ({ sentence, onWordClick, highlightedWord }: SentenceBreakdownProps) => {
  const words = sentence.split(/\b/).filter(word => word.trim());
  
  return (
    <div className="p-4 bg-muted/30 rounded-lg my-4">
      <div className="mb-3 text-sm text-muted-foreground">
        Click on any word to see its definition:
      </div>
      <div className="leading-loose">
        {words.map((word, idx) => {
          const cleanWord = word.replace(/[,.!?;:]/g, "");
          return (
            <SentenceWord 
              key={idx}
              word={word}
              isHighlighted={highlightedWord === cleanWord}
              onClick={() => onWordClick(cleanWord)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SentenceBreakdown;
