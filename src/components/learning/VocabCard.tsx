
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface VocabCardProps {
  word: string;
  imageUrl: string;
  translation: string;
  isCompleted?: boolean;
}

const VocabCard = ({ word, imageUrl, translation, isCompleted = false }: VocabCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className={`hover:shadow-md transition-all cursor-pointer overflow-hidden relative ${
        isCompleted ? 'border-primary/40' : ''
      }`}
      onClick={() => navigate(`/learn/${word}`)}
    >
      {isCompleted && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="outline" className="bg-primary/10 border-primary/30 flex items-center gap-1 px-2 py-0.5">
            <CheckCircle className="h-3 w-3" />
            <span>Completed</span>
          </Badge>
        </div>
      )}
      <CardContent className="p-6 flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">{imageUrl}</div>
        <h3 className="font-bold text-lg mb-1">{word}</h3>
        <p className="text-sm text-muted-foreground">{translation}</p>
      </CardContent>
    </Card>
  );
};

export default VocabCard;
