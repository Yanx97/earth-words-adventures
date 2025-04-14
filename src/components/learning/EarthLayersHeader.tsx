
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EarthLayersHeaderProps {
  completedWords: string[];
  totalWords: number;
}

const EarthLayersHeader = ({ completedWords, totalWords }: EarthLayersHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between bg-background/80 backdrop-blur-sm px-4 py-3 border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-sm font-medium">Earth Layers Learning Path</div>
        <div className="flex items-center space-x-2">
          <div className="bg-secondary/80 px-2 py-1 rounded-full text-xs">
            {completedWords.length}/{totalWords} Completed
          </div>
        </div>
      </div>
      <div className="w-full h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${(completedWords.length / totalWords) * 100}%` }}
        ></div>
      </div>
    </>
  );
};

export default EarthLayersHeader;
