
import { useState } from "react";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Volume2 } from "lucide-react";

// Mock data
const mockLevels = [
  {
    id: "earth-layers",
    title: "Earth Layers",
    progress: 3,
    total: 10,
    words: ["crust", "mantle", "core"],
    image: "🌍"
  },
  {
    id: "volcanoes",
    title: "Volcanoes",
    progress: 0,
    total: 8,
    words: ["erupt", "magma", "volcano"],
    image: "🌋",
    locked: true
  },
  {
    id: "atmosphere",
    title: "Atmosphere",
    progress: 0,
    total: 9,
    words: ["atmosphere", "oxygen", "carbon dioxide"],
    image: "☁️",
    locked: true
  }
];

const todaysWords = [
  {
    word: "erupt",
    translation: "爆发",
    example: "The volcano could erupt at any moment."
  },
  {
    word: "magma",
    translation: "岩浆",
    example: "Magma forms deep within the Earth."
  },
  {
    word: "crust",
    translation: "地壳",
    example: "The Earth's crust is the outermost layer."
  }
];

const Index = () => {
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  
  const handlePlayAudio = (word: string) => {
    console.log(`Playing audio for ${word}`);
    // Here we would use a speech synthesis API
  };

  return (
    <div className="pb-20">
      {/* Top header */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-background/80 backdrop-blur-sm px-4 py-3 border-b">
        <div className="flex items-center">
          <div className="text-sm font-medium">IELTS Earth & Geography</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-secondary/80 px-2 py-1 rounded-full">
            <span className="text-sm font-medium mr-1">120</span>
            <span className="text-xs">points</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Learning Path</h1>
        
        {/* Learning path */}
        <div className="space-y-4 mb-8">
          {mockLevels.map((level) => (
            <Card 
              key={level.id} 
              className={`relative overflow-hidden ${level.locked ? 'opacity-70' : ''}`}
            >
              <div className="p-4 flex items-center">
                <div className="text-4xl mr-4">{level.image}</div>
                <div className="flex-1">
                  <h3 className="font-bold">{level.title}</h3>
                  <div className="text-xs text-muted-foreground mb-1">
                    Progress: {level.progress}/{level.total}
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${(level.progress / level.total) * 100}%` }}
                    />
                  </div>
                </div>
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="ml-2"
                  disabled={level.locked}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              {level.locked && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  <div className="bg-background/90 px-3 py-2 rounded-md text-sm">
                    Complete previous level to unlock
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Daily task */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Today's Words</h2>
          <div className="space-y-3">
            {todaysWords.map((wordItem, idx) => (
              <div 
                key={wordItem.word}
                className={`word-card ${selectedWord === idx ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedWord(idx === selectedWord ? null : idx)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">{wordItem.word}</h3>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(wordItem.word);
                      }}
                      className="p-1.5 rounded-full hover:bg-muted transition-colors"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-muted-foreground">{wordItem.translation}</p>
                  
                  {selectedWord === idx && (
                    <div className="mt-3 pt-3 border-t text-sm">
                      <p>{wordItem.example}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
