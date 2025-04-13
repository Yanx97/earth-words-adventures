
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LearningFooterProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstStage: boolean;
  isLastStage: boolean;
}

const LearningFooter = ({ 
  onPrevious, 
  onNext,
  isFirstStage,
  isLastStage
}: LearningFooterProps) => {
  return (
    <div className="fixed bottom-16 left-0 right-0 flex justify-between px-4 py-3 bg-background/80 backdrop-blur-sm border-t">
      <Button 
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStage}
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Previous
      </Button>
      
      <Button onClick={onNext}>
        {isLastStage ? 'Finish' : 'Next'}
        <ChevronRight className="h-5 w-5 ml-1" />
      </Button>
    </div>
  );
};

export default LearningFooter;
