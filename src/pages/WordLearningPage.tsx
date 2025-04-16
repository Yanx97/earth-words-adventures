
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { wordLearningData } from "@/data/wordLearningData";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LearningHeader from "@/components/learning/LearningHeader";
import LearningFooter from "@/components/learning/LearningFooter";
import RecognitionStage from "@/components/learning/stages/RecognitionStage";
import UnderstandingStage from "@/components/learning/stages/UnderstandingStage";
import PracticeStage from "@/components/learning/stages/PracticeStage";
import MasteryStage from "@/components/learning/stages/MasteryStage";

// Define the chapter words
const earthLayersWords = ["crust", "mantle", "core", "erupt", "magma", "volcano"];
const earthGeographyWords = ["hydrosphere", "atmosphere", "lithosphere", "longitude", "latitude", "horizon", "altitude"];

const WordLearningPage = () => {
  const { wordId } = useParams<{ wordId: string }>();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [wordInfo, setWordInfo] = useState<any | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (wordId && wordLearningData[wordId as keyof typeof wordLearningData]) {
      setWordInfo(wordLearningData[wordId as keyof typeof wordLearningData]);
    } else {
      navigate("/");
    }
  }, [wordId, navigate]);

  const getChapterPath = (word: string): string => {
    if (earthLayersWords.includes(word)) return '/earth-layers';
    if (earthGeographyWords.includes(word)) return '/earth-geography';
    return '/';
  };

  // Update streak data when a word is completed
  const updateStreakData = () => {
    // Get current date in YYYY-MM-DD format
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    // Get existing streak data
    const existingStreakData = localStorage.getItem('streakData');
    let streakDates: string[] = existingStreakData ? JSON.parse(existingStreakData) : [];
    
    // Add today's date if not already in the list
    if (!streakDates.includes(dateStr)) {
      streakDates.push(dateStr);
      localStorage.setItem('streakData', JSON.stringify(streakDates));
    }
  };

  const handleNextStage = () => {
    if (currentStage < (wordInfo?.stages?.length - 1 || 0)) {
      setCurrentStage(currentStage + 1);
    } else {
      // When completing the last stage, save progress, update streak and return to chapter
      if (wordId) {
        // Save completion state based on the chapter
        const storageKey = earthLayersWords.includes(wordId) 
          ? 'completedEarthLayersWords' 
          : 'completedEarthGeographyWords';
        
        const existingCompleted = localStorage.getItem(storageKey);
        let completedWords: string[] = existingCompleted ? JSON.parse(existingCompleted) : [];
        
        if (!completedWords.includes(wordId)) {
          completedWords.push(wordId);
          localStorage.setItem(storageKey, JSON.stringify(completedWords));
          
          // Update streak data
          updateStreakData();
          
          // Show toast notification
          toast({
            title: "Word mastered!",
            description: `You've completed learning "${wordId}". A new sticker has been unlocked!`,
          });
        }

        navigate(getChapterPath(wordId));
      }
    }
  };

  const handlePrevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    } else {
      if (wordId) {
        navigate(getChapterPath(wordId));
      } else {
        navigate('/');
      }
    }
  };

  const handleExitLearning = () => {
    if (wordId) {
      navigate(getChapterPath(wordId));
    } else {
      navigate('/');
    }
  };

  const renderStageContent = () => {
    if (!wordInfo) return <div>Loading...</div>;
    
    switch (currentStage) {
      case 0: // Recognition
        return <RecognitionStage wordInfo={wordInfo} />;
      case 1: // Understanding
        return <UnderstandingStage wordInfo={wordInfo} />;
      case 2: // Practice
        return <PracticeStage wordInfo={wordInfo} />;
      case 3: // Mastery
        return <MasteryStage wordInfo={wordInfo} />;
      default:
        return <div>Unknown stage</div>;
    }
  };

  if (!wordInfo) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="pb-20">
      {/* Exit button */}
      <div className="fixed top-3 right-3 z-40">
        <Button 
          variant="outline" 
          size="sm"
          className="rounded-full" 
          onClick={handleExitLearning}
        >
          <X className="h-4 w-4 mr-1" />
          Exit
        </Button>
      </div>
      
      <LearningHeader 
        word={wordInfo.word}
        currentStage={currentStage}
        stages={wordInfo.stages}
      />

      <div className="container max-w-md mx-auto px-4 py-6">
        <Tabs 
          value={String(currentStage)} 
          className="mb-6"
          onValueChange={(value) => setCurrentStage(parseInt(value))}
        >
          <TabsList className="w-full">
            {wordInfo.stages.map((stage: any, idx: number) => (
              <TabsTrigger key={idx} value={String(idx)} className="flex-1 text-xs">
                {stage.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {wordInfo.stages.map((stage: any, idx: number) => (
            <TabsContent key={idx} value={String(idx)}>
              {renderStageContent()}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <LearningFooter 
        onPrevious={handlePrevStage}
        onNext={handleNextStage}
        isFirstStage={currentStage === 0}
        isLastStage={currentStage === wordInfo.stages.length - 1}
      />
    </div>
  );
};

export default WordLearningPage;
