
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, Check, AlertCircle } from "lucide-react";
import { WordData } from "@/data/wordLearningData";

interface PracticeStageProps {
  wordInfo: WordData;
}

interface SpeechResult {
  text: string;
  accuracy: Record<string, boolean>;
}

const PracticeStage = ({ wordInfo }: PracticeStageProps) => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [speechResult, setSpeechResult] = React.useState<SpeechResult | null>(null);

  const handleMicClick = () => {
    setIsRecording(true);
    
    setTimeout(() => {
      setIsRecording(false);
      
      const exampleSentence = wordInfo.sentences[0];
      const words = exampleSentence.toLowerCase().split(/\s+/).map(w => w.replace(/[,.!?;:]/g, ""));
      
      const accuracy: Record<string, boolean> = {};
      words.forEach(word => {
        accuracy[word] = Math.random() > 0.2;
      });
      
      setSpeechResult({
        text: exampleSentence,
        accuracy
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Practice Pronunciation</h2>
      
      <div className="bg-muted/30 rounded-lg p-4">
        <p className="text-center text-lg mb-4">
          {wordInfo.sentences[0]}
        </p>
        
        <div className="flex justify-center mb-4">
          <Button 
            variant={isRecording ? "destructive" : "default"}
            onClick={handleMicClick}
            disabled={isRecording}
            className="h-16 w-16 rounded-full"
          >
            <Mic className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="text-sm text-center text-muted-foreground">
          {isRecording ? "Listening..." : "Click the microphone and read the sentence"}
        </div>
      </div>
      
      {speechResult && (
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">Your Pronunciation</h3>
          <div className="mb-3 text-sm">
            {speechResult.text.split(/\s+/).map((word: string, idx: number) => {
              const cleanWord = word.toLowerCase().replace(/[,.!?;:]/g, "");
              const isCorrect = speechResult.accuracy[cleanWord];
              
              return (
                <span 
                  key={idx} 
                  className={`inline-block px-1 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}
                >
                  {word} {isCorrect ? 
                    <Check className="inline h-4 w-4" /> : 
                    <AlertCircle className="inline h-4 w-4" />
                  }
                </span>
              );
            })}
          </div>
          
          <div className="text-sm text-muted-foreground">
            {Object.values(speechResult.accuracy).filter(Boolean).length} out of {Object.values(speechResult.accuracy).length} words pronounced correctly.
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeStage;
