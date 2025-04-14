
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import { wordLearningData } from "@/data/wordLearningData";
import VocabCard from "@/components/learning/VocabCard";

const areAllWordsCompleted = (words: string[], completedWords: string[]): boolean => {
  return words.every(word => completedWords.includes(word));
};

const EarthGeographyPage = () => {
  const navigate = useNavigate();
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  const earthGeographyWords = [
    "hydrosphere", "atmosphere", "lithosphere", 
    "longitude", "latitude", "horizon", "altitude"
  ];

  useEffect(() => {
    const savedCompletedWords = localStorage.getItem('completedEarthGeographyWords');
    if (savedCompletedWords) {
      setCompletedWords(JSON.parse(savedCompletedWords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('completedEarthGeographyWords', JSON.stringify(completedWords));
  }, [completedWords]);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-30 flex items-center justify-between bg-background/80 backdrop-blur-sm px-4 py-3 border-b">
        <Button variant="ghost" size="icon" onClick={handleGoBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-sm font-medium">Earth Geography Learning Path</div>
        <div className="flex items-center space-x-2">
          <div className="bg-secondary/80 px-2 py-1 rounded-full text-xs">
            {completedWords.length}/{earthGeographyWords.length} Completed
          </div>
        </div>
      </div>

      <div className="w-full h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all" 
          style={{ width: `${(completedWords.length / earthGeographyWords.length) * 100}%` }}
        ></div>
      </div>

      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Earth Geography Vocabulary</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {earthGeographyWords.map(word => {
            const wordData = wordLearningData[word];
            return wordData ? (
              <VocabCard
                key={word}
                word={word}
                imageUrl={wordData.imageUrl}
                translation={wordData.translation}
                isCompleted={completedWords.includes(word)}
              />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default EarthGeographyPage;
