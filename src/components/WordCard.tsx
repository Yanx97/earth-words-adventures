
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2 } from "lucide-react";
import { pronunciationService } from "@/services/pronunciationService";

interface WordDefinition {
  word: string;
  translation: string;
  meaning?: string;
  example?: string;
  phonetic?: string;
  partOfSpeech?: string;
}

interface WordCardProps {
  wordData: WordDefinition;
  expanded?: boolean;
  onClick?: () => void;
}

const WordCard = ({ wordData, expanded = false, onClick }: WordCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isPlaying) return;
    
    setIsPlaying(true);
    await pronunciationService.playAudio(wordData.word);
    setIsPlaying(false);
  };
  
  return (
    <Card 
      className={`word-card transition-all ${expanded ? 'ring-2 ring-primary' : ''}`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-bold">{wordData.word}</h3>
          <Button 
            variant="ghost" 
            size="sm"
            className="p-1 h-auto rounded-full hover:bg-muted transition-colors"
            onClick={handlePlayAudio}
            disabled={isPlaying}
          >
            <Volume2 className={`h-4 w-4 ${isPlaying ? 'text-primary' : ''}`} />
            <span className="sr-only">Pronounce {wordData.word}</span>
          </Button>
        </div>
        
        {wordData.phonetic && (
          <div className="text-xs text-muted-foreground mb-1">
            {wordData.phonetic}
          </div>
        )}
        
        {wordData.partOfSpeech && (
          <div className="text-xs font-medium text-muted-foreground mb-1">
            {wordData.partOfSpeech}
          </div>
        )}
        
        <p className="text-muted-foreground">{wordData.translation}</p>
        
        {expanded && (
          <div className="mt-3 pt-3 border-t text-sm">
            {wordData.meaning && (
              <p className="mb-2 text-foreground">{wordData.meaning}</p>
            )}
            {wordData.example && (
              <p className="text-muted-foreground italic">"{wordData.example}"</p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default WordCard;
