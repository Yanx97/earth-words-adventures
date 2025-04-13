
import React from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { WordData } from "@/data/wordLearningData";
import { pronunciationService } from "@/services/pronunciationService";
import { useNavigate } from "react-router-dom";

interface RecognitionStageProps {
  wordInfo: WordData;
}

const RecognitionStage = ({ wordInfo }: RecognitionStageProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const navigate = useNavigate();

  const handlePlayAudio = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    await pronunciationService.playAudio(wordInfo.word);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center my-6">
        <div className="text-8xl">{wordInfo.imageUrl}</div>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-1">{wordInfo.word}</h2>
        <div className="text-muted-foreground mb-2">{wordInfo.phonetic}</div>
        <div className="text-sm font-medium text-muted-foreground mb-4">
          {wordInfo.partOfSpeech}
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="mb-6"
          onClick={handlePlayAudio}
          disabled={isPlaying}
        >
          <Volume2 className={`h-4 w-4 mr-1 ${isPlaying ? 'text-primary' : ''}`} />
          Play Pronunciation
        </Button>
        
        <div className="text-lg mb-4">{wordInfo.translation}</div>
        <div className="text-sm text-muted-foreground max-w-md">
          {wordInfo.meaning}
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="font-medium mb-2">Related Words</h3>
        <div className="flex flex-wrap gap-2">
          {wordInfo.relatedWords.map((relWord: string) => (
            <div 
              key={relWord} 
              className="px-3 py-1 bg-background rounded-full text-sm border cursor-pointer"
              onClick={() => navigate(`/learn/${relWord}`)}
            >
              {relWord}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecognitionStage;
