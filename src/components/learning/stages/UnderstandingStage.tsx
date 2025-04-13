
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Video, FileAudio, Info, Link } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { WordData } from "@/data/wordLearningData";
import { pronunciationService } from "@/services/pronunciationService";
import SentenceBreakdown from "../SentenceBreakdown";
import ImageGenerator from "../ImageGenerator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface UnderstandingStageProps {
  wordInfo: WordData;
}

// Word definitions for example sentences
const exampleWordDefinitions: Record<string, Record<string, string>> = {
  "crust": {
    "crust": "The outermost solid layer of a planet or moon",
    "earth": "The planet we live on, third from the Sun",
    "varies": "Changes or differs according to circumstances or different situations",
    "thickness": "The distance between opposite surfaces of something",
    "continental": "Relating to or forming a continent",
    "thicker": "Having a greater distance between opposite surfaces",
    "oceanic": "Relating to the ocean",
    "earthquakes": "Sudden violent shaking of the ground due to movements within the earth's crust",
    "movement": "An act of changing physical location or position"
  },
  // Add definitions for other words as needed
};

// Example sentence sources
const exampleSentenceSources: Record<string, string[]> = {
  "crust": [
    "National Geographic Earth Science",
    "NASA Earth Observatory",
    "USGS Educational Resources"
  ]
};

const UnderstandingStage = ({ wordInfo }: UnderstandingStageProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [highlightedWord, setHighlightedWord] = React.useState<string | null>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = React.useState(0);
  const [selectedSentenceIndex, setSelectedSentenceIndex] = React.useState(0);

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

  // Get word definitions for the current word
  const wordDefinitions = exampleWordDefinitions[wordInfo.word] || {};

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
                  {media.type === "video" ? <Video className="h-4 w-4 mr-1" /> : <FileAudio className="h-4 w-4 mr-1" />}
                  {media.type === "video" ? "Video" : "Audio"}
                </Button>
              ))}
            </div>
            
            <div className="bg-muted rounded-lg p-4 mb-3">
              <div className="flex items-center text-sm mb-2">
                {wordInfo.mediaExamples[selectedMediaIndex].type === "video" ? (
                  <Video className="h-4 w-4 mr-2 text-primary" />
                ) : (
                  <FileAudio className="h-4 w-4 mr-2 text-primary" />
                )}
                <span className="font-medium">
                  {wordInfo.mediaExamples[selectedMediaIndex].description}
                </span>
              </div>
              
              <div className="bg-gray-800 h-40 rounded flex items-center justify-center text-white">
                {wordInfo.mediaExamples[selectedMediaIndex].type === "video" ? (
                  <div className="text-center">
                    <Video className="h-10 w-10 mx-auto mb-2" />
                    <div>Video demonstrates how the {wordInfo.word} is formed and its key characteristics</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <FileAudio className="h-10 w-10 mx-auto mb-2" />
                    <div>Audio explains the importance of {wordInfo.word} in Earth's structure</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <Link className="h-3 w-3 mr-1" />
              Source: {wordInfo.mediaExamples[selectedMediaIndex].source}
            </div>
            
            <div className="mt-3 p-3 bg-muted/50 rounded-md text-sm">
              <p>
                <span className="font-medium">Example from this {wordInfo.mediaExamples[selectedMediaIndex].type}:</span>
                <br />
                "The {wordInfo.word} is a crucial part of Earth's structure. {wordInfo.meaning}."
              </p>
            </div>
          </div>
        </Card>
      )}
      
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <h3 className="font-medium mb-3">Visualization</h3>
        
        <ImageGenerator 
          sentence={wordInfo.sentences[selectedSentenceIndex]} 
          word={wordInfo.word} 
        />
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Example Sentences</h3>
        
        <Carousel className="w-full">
          <CarouselContent>
            {wordInfo.sentences.map((sentence, idx) => (
              <CarouselItem key={idx}>
                <Card>
                  <div className="p-4">
                    <SentenceBreakdown 
                      sentence={sentence}
                      onWordClick={handleWordClick}
                      highlightedWord={highlightedWord}
                      wordDefinitions={wordDefinitions}
                    />
                    
                    <div className="flex flex-wrap justify-between items-center mt-2">
                      <div className="text-xs text-muted-foreground flex items-center mb-2">
                        <Link className="h-3 w-3 mr-1" />
                        Source: {exampleSentenceSources[wordInfo.word]?.[idx] || "Educational Resource"}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          handlePlaySentence(sentence);
                          setSelectedSentenceIndex(idx);
                        }}
                        disabled={isPlaying}
                      >
                        <Volume2 className={`h-4 w-4 mr-1 ${isPlaying ? 'text-primary' : ''}`} />
                        Play Sentence
                      </Button>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="relative static -left-0 translate-y-0 mr-2" />
            <CarouselNext className="relative static -right-0 translate-y-0 ml-2" />
          </div>
        </Carousel>
      </div>
      
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full">
            <Info className="h-4 w-4 mr-2" />
            Show Grammar Notes
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 mt-3 bg-muted/30 rounded-lg">
            <h3 className="font-medium mb-2">Grammar Structure</h3>
            <p className="text-sm text-muted-foreground">
              The word "{wordInfo.word}" acts as a {wordInfo.partOfSpeech} in most contexts.
              {wordInfo.partOfSpeech === "noun" ? 
                ` As a noun, "${wordInfo.word}" refers to a specific part or layer and is used with definite/indefinite articles.` : 
                ` As a ${wordInfo.partOfSpeech}, "${wordInfo.word}" typically follows standard ${wordInfo.partOfSpeech} conjugation patterns.`
              }
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default UnderstandingStage;
