import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle2, ChevronLeft, Award, X } from "lucide-react";
import { wordLearningData } from "@/data/wordLearningData";
import VocabCard from "@/components/learning/VocabCard";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

const areAllWordsCompleted = (words: string[], completedWords: string[]): boolean => {
  return words.every(word => completedWords.includes(word));
};

const EarthLayersQuiz = ({ onComplete, onClose }: { onComplete: () => void, onClose: () => void }) => {
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({
    matching: ["", "", ""],
    fillBlanks: ["", "", ""]
  });
  const { toast } = useToast();

  const correctAnswers = {
    matching: ["地壳", "地幔", "地核"],
    fillBlanks: ["erupted", "magma", "core"]
  };

  const handleSubmit = () => {
    let newScore = 0;
    
    answers.matching.forEach((answer, index) => {
      if (answer === correctAnswers.matching[index]) newScore++;
    });
    
    answers.fillBlanks.forEach((answer, index) => {
      if (answer.toLowerCase() === correctAnswers.fillBlanks[index]) newScore++;
    });
    
    setScore(newScore);
    setIsSubmitted(true);
    
    if (newScore === 6) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");
      audio.play();
      
      toast({
        title: "Congratulations!",
        description: "You've completed the Earth Layers quiz!",
        variant: "default"
      });
      
      onComplete();
    }
  };

  const handleInputChange = (
    section: 'matching' | 'fillBlanks', 
    index: number, 
    value: string
  ) => {
    setAnswers(prev => ({
      ...prev,
      [section]: prev[section].map((ans, i) => i === index ? value : ans)
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-6 w-6 text-yellow-500" />
          Earth Layers Quiz
        </CardTitle>
        <CardDescription>Test your knowledge of Earth Layers vocabulary</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Match English words with Chinese translations:</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-24">1. crust</div>
              <select
                value={answers.matching[0]}
                onChange={(e) => handleInputChange('matching', 0, e.target.value)}
                disabled={isSubmitted}
                className="flex-1 rounded-md border p-2"
              >
                <option value="">Select translation</option>
                <option value="地壳">地壳</option>
                <option value="地幔">地幔</option>
                <option value="地核">地核</option>
              </select>
              {isSubmitted && (
                <span className={answers.matching[0] === correctAnswers.matching[0] ? "text-green-500" : "text-red-500"}>
                  {answers.matching[0] === correctAnswers.matching[0] ? "✓" : "✗"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24">2. mantle</div>
              <select
                value={answers.matching[1]}
                onChange={(e) => handleInputChange('matching', 1, e.target.value)}
                disabled={isSubmitted}
                className="flex-1 rounded-md border p-2"
              >
                <option value="">Select translation</option>
                <option value="地壳">地壳</option>
                <option value="地幔">地幔</option>
                <option value="地核">地核</option>
              </select>
              {isSubmitted && (
                <span className={answers.matching[1] === correctAnswers.matching[1] ? "text-green-500" : "text-red-500"}>
                  {answers.matching[1] === correctAnswers.matching[1] ? "✓" : "✗"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24">3. core</div>
              <select
                value={answers.matching[2]}
                onChange={(e) => handleInputChange('matching', 2, e.target.value)}
                disabled={isSubmitted}
                className="flex-1 rounded-md border p-2"
              >
                <option value="">Select translation</option>
                <option value="地壳">地壳</option>
                <option value="地幔">地幔</option>
                <option value="地核">地核</option>
              </select>
              {isSubmitted && (
                <span className={answers.matching[2] === correctAnswers.matching[2] ? "text-green-500" : "text-red-500"}>
                  {answers.matching[2] === correctAnswers.matching[2] ? "✓" : "✗"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Fill in the blanks with the correct form:</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-2">1. The volcano <input
                type="text"
                value={answers.fillBlanks[0]}
                onChange={(e) => handleInputChange('fillBlanks', 0, e.target.value)}
                disabled={isSubmitted}
                className="w-24 px-2 py-1 border rounded mx-1 inline-block"
                placeholder="erupt"
              /> violently last night.</p>
              {isSubmitted && answers.fillBlanks[0] && (
                <div className={answers.fillBlanks[0].toLowerCase() === correctAnswers.fillBlanks[0] ? "text-green-500" : "text-red-500"}>
                  {answers.fillBlanks[0].toLowerCase() === correctAnswers.fillBlanks[0] ? "Correct" : `Incorrect. The answer is "${correctAnswers.fillBlanks[0]}"`}
                </div>
              )}
            </div>
            <div>
              <p className="mb-2">2. When <input
                type="text"
                value={answers.fillBlanks[1]}
                onChange={(e) => handleInputChange('fillBlanks', 1, e.target.value)}
                disabled={isSubmitted}
                className="w-24 px-2 py-1 border rounded mx-1 inline-block"
                placeholder="magma"
              /> reaches the surface, it becomes lava.</p>
              {isSubmitted && answers.fillBlanks[1] && (
                <div className={answers.fillBlanks[1].toLowerCase() === correctAnswers.fillBlanks[1] ? "text-green-500" : "text-red-500"}>
                  {answers.fillBlanks[1].toLowerCase() === correctAnswers.fillBlanks[1] ? "Correct" : `Incorrect. The answer is "${correctAnswers.fillBlanks[1]}"`}
                </div>
              )}
            </div>
            <div>
              <p className="mb-2">3. The Earth's <input
                type="text"
                value={answers.fillBlanks[2]}
                onChange={(e) => handleInputChange('fillBlanks', 2, e.target.value)}
                disabled={isSubmitted}
                className="w-24 px-2 py-1 border rounded mx-1 inline-block"
                placeholder="core"
              /> is mainly composed of iron and nickel.</p>
              {isSubmitted && answers.fillBlanks[2] && (
                <div className={answers.fillBlanks[2].toLowerCase() === correctAnswers.fillBlanks[2] ? "text-green-500" : "text-red-500"}>
                  {answers.fillBlanks[2].toLowerCase() === correctAnswers.fillBlanks[2] ? "Correct" : `Incorrect. The answer is "${correctAnswers.fillBlanks[2]}"`}
                </div>
              )}
            </div>
          </div>
        </div>

        {isSubmitted && (
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Your score: {score}/6</h3>
            <p>{score === 6 ? "Perfect! Great job!" : "Try again to improve your score!"}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {!isSubmitted ? (
          <Button onClick={handleSubmit}>Submit Answers</Button>
        ) : (
          <Button onClick={onClose}>Close</Button>
        )}
      </CardFooter>
    </Card>
  );
};

const EarthLayersPage = () => {
  const navigate = useNavigate();
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const earthLayersWords = ["crust", "mantle", "core", "erupt", "magma", "volcano"];

  useEffect(() => {
    const savedCompletedWords = localStorage.getItem('completedEarthLayersWords');
    if (savedCompletedWords) {
      setCompletedWords(JSON.parse(savedCompletedWords));
    }

    const quizStatus = localStorage.getItem('earthLayersQuizCompleted');
    if (quizStatus === 'true') {
      setQuizCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('completedEarthLayersWords', JSON.stringify(completedWords));
  }, [completedWords]);

  const markWordAsCompleted = (word: string) => {
    if (!completedWords.includes(word)) {
      const updatedCompletedWords = [...completedWords, word];
      setCompletedWords(updatedCompletedWords);
    }
  };

  const isQuizAvailable = areAllWordsCompleted(earthLayersWords, completedWords);

  const handleTakeQuiz = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    localStorage.setItem('earthLayersQuizCompleted', 'true');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-30 flex items-center justify-between bg-background/80 backdrop-blur-sm px-4 py-3 border-b">
        <Button variant="ghost" size="icon" onClick={handleGoBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-sm font-medium">Earth Layers Learning Path</div>
        <div className="flex items-center space-x-2">
          <div className="bg-secondary/80 px-2 py-1 rounded-full text-xs">
            {completedWords.length}/{earthLayersWords.length} Completed
          </div>
        </div>
      </div>

      <div className="w-full h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all" 
          style={{ width: `${(completedWords.length / earthLayersWords.length) * 100}%` }}
        ></div>
      </div>

      <div className="container max-w-md mx-auto px-4 py-6">
        {showQuiz ? (
          <EarthLayersQuiz 
            onComplete={handleQuizComplete}
            onClose={() => setShowQuiz(false)}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Earth Layers Vocabulary</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {earthLayersWords.map(word => {
                const wordData = wordLearningData[word];
                return wordData ? (
                  <VocabCard
                    key={word}
                    word={word}
                    imageUrl={wordData.imageUrl}
                    translation={wordData.translation}
                    isCompleted={completedWords.includes(word)}
                  />
                ) : null;
              })}
            </div>

            {isQuizAvailable && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <div>
                        <h3 className="font-medium">All words completed!</h3>
                        <p className="text-sm text-muted-foreground">Take the quiz to test your knowledge</p>
                      </div>
                    </div>
                    <Button 
                      variant={quizCompleted ? "outline" : "default"}
                      onClick={handleTakeQuiz}
                    >
                      {quizCompleted ? "Retake Quiz" : "Take Quiz"}
                      {quizCompleted && <CheckCircle2 className="h-3 w-3 ml-1" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EarthLayersPage;
