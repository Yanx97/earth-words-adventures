
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VocabGrid from "@/components/learning/VocabGrid";
import EarthLayersHeader from "@/components/learning/EarthLayersHeader";

const earthGeographyWords = [
  "hydrosphere", "atmosphere", "lithosphere", 
  "longitude", "latitude", "horizon", "altitude"
];

const EarthGeographyPage = () => {
  const navigate = useNavigate();
  const [completedWords, setCompletedWords] = useState<string[]>([]);

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
      <EarthLayersHeader 
        completedWords={completedWords} 
        totalWords={earthGeographyWords.length} 
      />

      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Earth Geography Vocabulary</h1>
        </div>

        <VocabGrid 
          words={earthGeographyWords}
          completedWords={completedWords}
        />
      </div>
    </div>
  );
};

export default EarthGeographyPage;
