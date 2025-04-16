
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SentenceWordProps {
  word: string;
  definition?: string;
  isHighlighted?: boolean;
  onClick?: () => void;
}

const SentenceWord = ({ word, definition, isHighlighted, onClick }: SentenceWordProps) => {
  const cleanWord = word.replace(/[,.!?;:]/g, "");
  const hasDefinition = !!definition && cleanWord.length > 1;
  const [isClicking, setIsClicking] = useState(false);
  
  const handleClick = () => {
    if (isClicking) return;
    setIsClicking(true);
    
    // Call the onClick handler
    if (onClick) onClick();
    
    // Reset after a short delay
    setTimeout(() => {
      setIsClicking(false);
    }, 500);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span 
          className={`inline-block px-1 py-0.5 rounded cursor-pointer transition-colors ${
            isHighlighted ? 'bg-primary/20 text-primary' : 'hover:bg-muted'
          }`}
          onClick={handleClick}
        >
          {word}
        </span>
      </PopoverTrigger>
      {hasDefinition && (
        <PopoverContent className="w-72 p-3">
          <div className="space-y-1">
            <h4 className="font-medium">{cleanWord}</h4>
            <p className="text-sm text-muted-foreground">{definition}</p>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default SentenceWord;
