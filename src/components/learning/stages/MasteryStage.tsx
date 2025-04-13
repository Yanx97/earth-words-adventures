
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WordData } from "@/data/wordLearningData";
import { Progress } from "@/components/ui/progress";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface MasteryStageProps {
  wordInfo: WordData;
}

const MasteryStage = ({ wordInfo }: MasteryStageProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Word arrangement exercise
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [sentenceParts, setSentenceParts] = useState<string[]>([]);
  const [isArrangementComplete, setIsArrangementComplete] = useState(false);

  // Create sentence for the word arrangement exercise
  useEffect(() => {
    const generateSentenceParts = () => {
      // Create different sentences based on the part of speech
      if (wordInfo.partOfSpeech === "noun") {
        setSentenceParts(["The ", " is an important layer of the Earth."]);
        setAvailableWords(shuffle([wordInfo.word, "atmosphere", "ocean", "continent"]));
      } else if (wordInfo.partOfSpeech === "verb") {
        setSentenceParts(["Volcanoes can ", " when pressure builds beneath the Earth's surface."]);
        setAvailableWords(shuffle([wordInfo.word, "collapse", "explode", "form"]));
      } else {
        setSentenceParts(["The ", " nature of Earth's layers fascinates geologists."]);
        setAvailableWords(shuffle([wordInfo.word, "mysterious", "scientific", "ancient"]));
      }
    };

    generateSentenceParts();
  }, [wordInfo]);

  // Function to shuffle array (for randomizing word options)
  const shuffle = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === wordInfo.word;
    setIsCorrect(correct);
    
    if (correct) {
      // Play success sound
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");
      audio.play();
      
      // Show confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleWordSelect = (word: string) => {
    if (selectedWords.length < 1) {
      setSelectedWords([...selectedWords, word]);
      setAvailableWords(availableWords.filter(w => w !== word));
      
      // Check if selected word is correct
      if (word === wordInfo.word) {
        setIsArrangementComplete(true);
        
        // Play success sound
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");
        audio.play();
        
        // Show confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const resetWordArrangement = () => {
    const allWords = [...availableWords, ...selectedWords];
    setAvailableWords(shuffle(allWords));
    setSelectedWords([]);
    setIsArrangementComplete(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Mastery Exercises</h2>
      
      <div className="bg-muted/30 rounded-lg p-4">
        <p className="mb-4">
          Fill in the blank with the correct word to complete this sentence:
        </p>
        <p className="mb-4">
          {wordInfo.partOfSpeech === "noun" 
            ? `The _____ ${wordInfo.meaning.split(" ").slice(3).join(" ")}`
            : wordInfo.partOfSpeech === "verb"
            ? `When pressure builds up, volcanoes can _____ violently.`
            : `Scientists study the _____ ${wordInfo.meaning.split(" ").slice(3).join(" ")}`
          }
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className={cn(
              isCorrect === true && selectedAnswer === wordInfo.word && "bg-green-500 text-white",
              isCorrect === false && selectedAnswer === wordInfo.word && "bg-red-500 text-white"
            )}
            onClick={() => handleAnswerClick(wordInfo.word)}
          >
            {wordInfo.word}
          </Button>
          <Button 
            variant="outline"
            className={cn(
              isCorrect === true && selectedAnswer === wordInfo.relatedWords[0] && "bg-green-500 text-white",
              isCorrect === false && selectedAnswer === wordInfo.relatedWords[0] && "bg-red-500 text-white"
            )}
            onClick={() => handleAnswerClick(wordInfo.relatedWords[0])}
          >
            {wordInfo.relatedWords[0]}
          </Button>
        </div>
      </div>
      
      <Card className="p-4">
        <h3 className="font-medium mb-3">Complete the sentence with the right word</h3>
        
        <div className="mb-4 flex items-center">
          {sentenceParts[0]}
          {selectedWords.length > 0 ? (
            <span className={cn(
              "px-2 py-1 rounded mx-1 font-medium inline-block border",
              isArrangementComplete ? "bg-green-500 text-white" : "bg-blue-100"
            )}>
              {selectedWords[0]}
            </span>
          ) : (
            <span className="px-2 py-1 bg-muted rounded mx-1 inline-block min-w-16">&nbsp;</span>
          )}
          {sentenceParts[1]}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {availableWords.map((word, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="bg-primary/10"
              onClick={() => handleWordSelect(word)}
              disabled={selectedWords.length >= 1 || isArrangementComplete}
            >
              {word}
            </Button>
          ))}
        </div>
        
        {isArrangementComplete && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={resetWordArrangement}
          >
            Try again
          </Button>
        )}
      </Card>
    </div>
  );
};

export default MasteryStage;
