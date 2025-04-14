
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

interface QuizCardProps {
  totalQuestions: number;
  completedQuestions: number;
}

const QuizCard = ({ totalQuestions, completedQuestions }: QuizCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="hover:shadow-md transition-all cursor-pointer overflow-hidden relative"
      onClick={() => navigate('/earth-layers/quiz')}
    >
      {completedQuestions === totalQuestions && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="outline" className="bg-primary/10 border-primary/30">
            Completed
          </Badge>
        </div>
      )}
      <CardContent className="p-6 flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">
          <BookOpen className="w-16 h-16" />
        </div>
        <h3 className="font-bold text-lg mb-1">Chapter Quiz</h3>
        <p className="text-sm text-muted-foreground">{completedQuestions}/{totalQuestions} Questions</p>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
