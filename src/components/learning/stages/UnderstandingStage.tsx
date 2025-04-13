
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Film, Music } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { WordData } from "@/data/wordLearningData";
import { pronunciationService } from "@/services/pronunciationService";
import SentenceBreakdown from "../SentenceBreakdown";
import ImageGenerator from "../ImageGenerator";

interface UnderstandingStageProps {
  wordInfo: WordData;
}

const UnderstandingStage = ({ wordInfo }: UnderstandingStageProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [highlightedWord, setHighlightedWord] = React.useState<string | null>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = React.useState(0);

  const handlePlaySentence = async (sentence: string) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(false);
    }
  };

  const handleWordClick = (word: string) => {
    setHighlightedWord(word === highlightedWord ? null : word);
    
    if (word !== highlightedWord) {
      pronunciationService.playAudio(word);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Understanding "{wordInfo.word}" in Context</h2>
      
      {wordInfo.mediaExamples && wordInfo.mediaExamples.length > 0 && (
        <Card className="mb-6">
          <div className="p-4">
            <h3 className="font-medium mb-3">Media Examples</h3>
            
            <div className="flex gap-2 mb-4">
              {wordInfo.mediaExamples.map((media, idx) => (
                <Button
                  key={idx}
                  variant={selectedMediaIndex === idx ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMediaIndex(idx)}
                >
                  {media.type === "video" ? <Film className="h-4 w-4 mr-1" /> : <Music className="h-4 w-4 mr-1" />}
                  {media.type === "video" ? "Video" : "Audio"}
                </Button>
              ))}
            </div>
            
            <div className="bg-muted rounded-lg p-4 mb-2">
              <div className="flex items-center text-sm mb-2">
                {wordInfo.mediaExamples[selectedMediaIndex].type === "video" ? (
                  <Film className="h-4 w-4 mr-2 text-primary" />
                ) : (
                  <Music className="h-4 w-4 mr-2 text-primary" />
                )}
                <span className="font-medium">
                  {wordInfo.mediaExamples[selectedMediaIndex].description}
                </span>
              </div>
              
              <div className="bg-gray-800 h-40 rounded flex items-center justify-center text-white">
                {wordInfo.mediaExamples[selectedMediaIndex].type === "video" ? (
                  <div className="text-center">
                    <Film className="h-10 w-10 mx-auto mb-2" />
                    <div>Video Player Placeholder</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Music className="h-10 w-10 mx-auto mb-2" />
                    <div>Audio Player Placeholder</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Source: {wordInfo.mediaExamples[selectedMediaIndex].source}
            </div>
          </div>
        </Card>
      )}
      
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <h3 className="font-medium mb-3">Visualization</h3>
        
        <ImageGenerator 
          sentence={wordInfo.sentences[0]} 
          word={wordInfo.word} 
        />
      </div>
      
      <div className="mb-6">
        {wordInfo.sentences.map((sentence, idx) => (
          <Card key={idx} className="mb-3">
            <div className="p-4">
              <SentenceBreakdown 
                sentence={sentence}
                onWordClick={handleWordClick}
                highlightedWord={highlightedWord}
              />
              
              {highlightedWord && (
                <div className="bg-muted p-3 rounded-md text-sm mt-2">
                  <div className="font-medium">{highlightedWord}</div>
                  <div>Definition would appear here...</div>
                </div>
              )}
              
              <div className="flex justify-end mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePlaySentence(sentence)}
                  disabled={isPlaying}
                >
                  <Volume2 className={`h-4 w-4 mr-1 ${isPlaying ? 'text-primary' : ''}`} />
                  Play Sentence
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full">
            Show Grammar Notes
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 mt-3 bg-muted/30 rounded-lg">
            <h3 className="font-medium mb-2">Grammar Structure</h3>
            <p className="text-sm text-muted-foreground">
              The sentence "{wordInfo.sentences[0]}" uses a simple subject-verb structure.
              The word "{wordInfo.word}" acts as {wordInfo.partOfSpeech === "noun" ? "a noun" : "a verb"} in this context.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default UnderstandingStage;
