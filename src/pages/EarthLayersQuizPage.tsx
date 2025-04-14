
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { quizSections } from "@/pages/EarthLayersPage";

const EarthLayersQuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Flatten all questions from all sections into a single array
  const allQuestions = quizSections.flatMap(section => section.questions);
  const currentQuestionData = allQuestions[currentQuestion];

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      navigate('/earth-layers');
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <div className="sticky top-0 z-30 flex items-center justify-between bg-background/80 backdrop-blur-sm px-4 py-3 mb-6 -mx-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate('/earth-layers')}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-sm font-medium">Earth Layers Quiz</div>
        <div className="w-9"></div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Question {currentQuestion + 1} of {allQuestions.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{currentQuestionData.question}</p>
          {currentQuestionData.type === 'multiple-choice' && currentQuestionData.options && (
            <RadioGroup value={selectedAnswer || ''} onValueChange={setSelectedAnswer}>
              {currentQuestionData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
          <Button 
            className="w-full mt-6" 
            onClick={handleNext}
          >
            {currentQuestion === allQuestions.length - 1 ? 'Finish' : 'Next Question'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarthLayersQuizPage;
