
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { wordLearningData } from "@/data/wordLearningData";
import { pronunciationService } from "@/services/pronunciationService";

// Component imports
import LearningHeader from "@/components/learning/LearningHeader";
import LearningFooter from "@/components/learning/LearningFooter";
import RecognitionStage from "@/components/learning/stages/RecognitionStage";
import UnderstandingStage from "@/components/learning/stages/UnderstandingStage";
import PracticeStage from "@/components/learning/stages/PracticeStage";
import MasteryStage from "@/components/learning/stages/MasteryStage";

const WordLearningPage = () => {
  const { wordId } = useParams<{ wordId: string }>();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [wordInfo, setWordInfo] = useState<any | null>(null);

  useEffect(() => {
    if (wordId && wordLearningData[wordId as keyof typeof wordLearningData]) {
      setWordInfo(wordLearningData[wordId as keyof typeof wordLearningData]);
    } else {
      navigate("/");
    }
  }, [wordId, navigate]);

  if (!wordInfo) return <div>Loading...</div>;

  const handleNextStage = () => {
    if (currentStage < wordInfo.stages.length - 1) {
      setCurrentStage(currentStage + 1);
    } else {
      navigate("/");
    }
  };

  const handlePrevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    } else {
      navigate("/");
    }
  };

  const renderStageContent = () => {
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

  return (
    <div className="pb-20">
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
