
import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";
import EarthLayersHeader from "@/components/learning/EarthLayersHeader";
import VocabGrid from "@/components/learning/VocabGrid";

const earthLayerWords = ["crust", "mantle", "core", "magma", "tectonic plates", "volcano", "erupt"];

export const EarthLayersPage = () => {
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedCompletedWords = localStorage.getItem('completedEarthLayersWords');
    if (savedCompletedWords) {
      setCompletedWords(JSON.parse(savedCompletedWords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('completedEarthLayersWords', JSON.stringify(completedWords));
    const allWordsCompleted = earthLayerWords.every(word => completedWords.includes(word));
    
    if (allWordsCompleted && !showConfetti) {
      setShowConfetti(true);
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 }
      });
      toast({
        title: "Congratulations!",
        description: "You've completed all the words in this section!",
        className: "bg-green-500 text-white",
        duration: 5000,
      });
    }
  }, [completedWords, showConfetti, toast]);

  return (
    <div className="pb-20">
      <EarthLayersHeader 
        completedWords={completedWords} 
        totalWords={earthLayerWords.length} 
      />

      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Earth Layers Vocabulary</h1>
          {earthLayerWords.every(word => completedWords.includes(word)) && (
            <div className="flex items-center space-x-2 text-green-500">
              <CheckCircle2 className="h-5 w-5" />
              <span>Completed!</span>
            </div>
          )}
        </div>

        <VocabGrid 
          words={earthLayerWords} 
          completedWords={completedWords} 
        />
      </div>
    </div>
  );
};

export default EarthLayersPage;
