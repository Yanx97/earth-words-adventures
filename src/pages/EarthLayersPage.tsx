
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle2, ChevronLeft, Award, X, BookOpen, MessageSquare, CheckSquare } from "lucide-react";
import { wordLearningData } from "@/data/wordLearningData";
import VocabCard from "@/components/learning/VocabCard";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { pronunciationService } from "@/services/pronunciationService";
import { Progress } from "@/components/ui/progress";

const areAllWordsCompleted = (words: string[], completedWords: string[]): boolean => {
  return words.every(word => completedWords.includes(word));
};

// Interface for quiz questions
interface QuizQuestion {
  id: number;
  type: 'multiple-choice' | 'sentence-selection' | 'grammar' | 'fill-blank' | 'relative-clause' | 'speaking' | 'writing';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  explanation?: string;
  relatedWord: string;
}

const EarthLayersQuiz = ({ onComplete, onClose }: { onComplete: () => void, onClose: () => void }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [writingInput, setWritingInput] = useState("");
  const [speakingFeedback, setSpeakingFeedback] = useState("");
  const [writingFeedback, setWritingFeedback] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  const quizSections = [
    {
      title: "Part 1: Basic Recognition",
      description: "Test your knowledge of word meanings",
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "What does the word 'erupt' mean?",
          options: ["to freeze", "to explode", "to fall", "to shine"],
          correctAnswer: 1,
          relatedWord: "erupt"
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "What is the Earth's crust?",
          options: ["The inner core", "The molten layer", "The outermost layer", "The atmosphere"],
          correctAnswer: 2,
          relatedWord: "crust"
        }
      ]
    },
    {
      title: "Part 2: Contextual Understanding",
      description: "Choose the sentence that uses the word correctly",
      questions: [
        {
          id: 3,
          type: "sentence-selection",
          question: "Which sentence uses the word 'magma' correctly?",
          options: [
            "The magma is falling from the sky.",
            "Magma is the gas in the atmosphere.",
            "Magma flows under the Earth's crust.",
            "Magma is a type of cloud."
          ],
          correctAnswer: 2,
          relatedWord: "magma"
        },
        {
          id: 4,
          type: "sentence-selection",
          question: "Which sentence uses the word 'core' correctly?",
          options: [
            "The core is the outermost layer of the Earth.",
            "The Earth's core is mainly composed of iron and nickel.",
            "Core is another name for a volcano.",
            "The core is made of water and ice."
          ],
          correctAnswer: 1,
          relatedWord: "core"
        }
      ]
    },
    {
      title: "Part 3: Grammar Structure",
      description: "Identify the correct sentence structure",
      questions: [
        {
          id: 5,
          type: "grammar",
          question: "Choose the correct sentence structure:",
          options: [
            "The volcano erupts → Simple Present",
            "Erupt volcano the → Incorrect",
            "Volcanos to erupted → Incorrect"
          ],
          correctAnswer: 0,
          relatedWord: "erupt"
        },
        {
          id: 6,
          type: "grammar",
          question: "Which is the correct structure?",
          options: [
            "The mantle surrounds the core → Correct",
            "The mantle surrounding core the → Incorrect",
            "Mantle the surrounds → Incorrect"
          ],
          correctAnswer: 0,
          relatedWord: "mantle"
        }
      ]
    },
    {
      title: "Part 4: Sentence Completion",
      description: "Complete sentences with the correct word forms",
      questions: [
        {
          id: 7,
          type: "fill-blank",
          question: "Complete the sentence: After the volcano ______, the village was covered in ash.",
          correctAnswer: "erupted",
          relatedWord: "erupt"
        },
        {
          id: 8,
          type: "relative-clause",
          question: "Choose the correct sentence with a relative clause:",
          options: [
            "The volcano, which had not erupted in years, suddenly exploded.",
            "The volcano exploded had not erupted years.",
            "Which volcano exploded?"
          ],
          correctAnswer: 0,
          relatedWord: "volcano"
        }
      ]
    },
    {
      title: "Part 5: Expression Practice",
      description: "Demonstrate your ability to use these words",
      questions: [
        {
          id: 9,
          type: "speaking",
          question: "Say a sentence using the word 'volcano'.",
          relatedWord: "volcano"
        },
        {
          id: 10,
          type: "writing",
          question: "Write 1-2 sentences about Earth's layers. Use at least two words from the lesson.",
          relatedWord: "crust"
        }
      ]
    }
  ];

  const currentSectionData = quizSections[currentSection];
  const currentQuestion = currentSectionData.questions[currentQuestionIndex];
  const totalQuestions = quizSections.reduce((total, section) => total + section.questions.length, 0);

  // Simulate speech recognition for speaking questions
  const handleSpeaking = () => {
    // This would normally connect to a speech recognition API
    // For the demonstration, we'll simulate a spoken response
    setTimeout(() => {
      const simulatedSpokenText = "The volcano erupted and spewed magma everywhere.";
      
      // Simulate API feedback
      setSpeakingFeedback("Good job! Your pronunciation was clear. You used 'volcano' correctly in the sentence.");
      
      // Play success sound and show confetti
      playSuccessEffects();
      
      // Increment score
      setScore(prev => prev + 1);
      setIsAnswerSubmitted(true);
    }, 1500);

    // In a real implementation, you would use the Web Speech API:
    /*
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        // Process transcript and provide feedback
      };
      
      recognition.start();
    }
    */
  };

  // Function to handle writing input
  const handleWritingSubmit = () => {
    if (writingInput.trim() === "") {
      toast({
        title: "Please write something",
        description: "You need to write at least one sentence",
        variant: "default"
      });
      return;
    }

    // Check if the writing contains at least two vocabulary words
    const vocabWords = ["crust", "mantle", "core", "erupt", "magma", "volcano"];
    const wordsUsed = vocabWords.filter(word => 
      writingInput.toLowerCase().includes(word.toLowerCase())
    );
    
    if (wordsUsed.length >= 2) {
      setWritingFeedback(`Great job! You used ${wordsUsed.join(", ")} correctly in your sentences.`);
      playSuccessEffects();
      setScore(prev => prev + 1);
    } else {
      setWritingFeedback(`Please include at least two vocabulary words from the lesson: crust, mantle, core, erupt, magma, volcano.`);
    }
    
    setIsAnswerSubmitted(true);
  };

  // Function to play success effects (confetti and sound)
  const playSuccessEffects = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");
    audio.play().catch(err => console.error("Could not play audio:", err));
  };

  // Handle answer selection for multiple choice questions
  const handleAnswerSelect = (answer: string | number) => {
    setSelectedAnswer(String(answer));
  };

  // Handle submitting an answer
  const handleAnswerSubmit = () => {
    if (!selectedAnswer && currentQuestion.type !== "speaking" && currentQuestion.type !== "writing" && currentQuestion.type !== "fill-blank") {
      toast({
        title: "Please select an answer",
        description: "You need to choose an option before submitting",
        variant: "default"
      });
      return;
    }
    
    if (currentQuestion.type === "fill-blank" && !selectedAnswer) {
      toast({
        title: "Please enter your answer",
        description: "You need to fill in the blank before submitting",
        variant: "default"
      });
      return;
    }

    let isCorrect = false;

    if (currentQuestion.type !== "speaking" && currentQuestion.type !== "writing") {
      isCorrect = String(selectedAnswer) === String(currentQuestion.correctAnswer);
      
      if (isCorrect) {
        setScore(prev => prev + 1);
        playSuccessEffects();
      }
    }

    setIsAnswerSubmitted(true);

    // Pronounce the word after submitting answer
    pronunciationService.playAudio(currentQuestion.relatedWord);
  };

  // Move to the next question or section
  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setSpeakingFeedback("");
    setWritingFeedback("");
    
    // If there are more questions in this section
    if (currentQuestionIndex < currentSectionData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } 
    // If this was the last question in the section but there are more sections
    else if (currentSection < quizSections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestionIndex(0);
    } 
    // If this was the last question in the last section
    else {
      // Complete the quiz
      setQuizCompleted(true);
      onComplete();
      
      // Calculate final score percentage
      const scorePercentage = Math.round((score / totalQuestions) * 100);
      
      // Show completion message
      toast({
        title: "Quiz Completed!",
        description: `Your score: ${score}/${totalQuestions} (${scorePercentage}%)`,
        variant: "default"
      });
      
      // Big confetti for completion
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
        colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']
      });
    }
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    let questionsCompleted = 0;
    
    // Count questions in previous sections
    for (let i = 0; i < currentSection; i++) {
      questionsCompleted += quizSections[i].questions.length;
    }
    
    // Add current section questions completed
    questionsCompleted += currentQuestionIndex;
    
    return Math.round((questionsCompleted / totalQuestions) * 100);
  };

  // Render the current question
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "multiple-choice":
      case "sentence-selection":
      case "grammar":
      case "relative-clause":
        return (
          <RadioGroup 
            value={selectedAnswer || ""} 
            onValueChange={handleAnswerSelect}
            className="space-y-3"
            disabled={isAnswerSubmitted}
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className={cn(
                "flex items-center border rounded-md p-3 transition-colors",
                isAnswerSubmitted && index === currentQuestion.correctAnswer && "bg-green-50 border-green-300",
                isAnswerSubmitted && selectedAnswer === String(index) && index !== currentQuestion.correctAnswer && "bg-red-50 border-red-300",
                !isAnswerSubmitted && "hover:bg-muted/50"
              )}>
                <RadioGroupItem 
                  value={String(index)} 
                  id={`option-${index}`}
                  className="mr-2"
                  disabled={isAnswerSubmitted}
                />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
                {isAnswerSubmitted && index === currentQuestion.correctAnswer && (
                  <CheckCircle2 className="h-5 w-5 text-green-600 ml-2" />
                )}
              </div>
            ))}
          </RadioGroup>
        );
        
      case "fill-blank":
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span>{currentQuestion.question.split("______")[0]}</span>
              <Input 
                value={selectedAnswer || ""}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className={cn(
                  "w-32 inline",
                  isAnswerSubmitted && selectedAnswer?.toLowerCase() === currentQuestion.correctAnswer?.toLowerCase() && "bg-green-50 border-green-500 text-green-700",
                  isAnswerSubmitted && selectedAnswer?.toLowerCase() !== currentQuestion.correctAnswer?.toLowerCase() && "bg-red-50 border-red-500 text-red-700"
                )}
                disabled={isAnswerSubmitted}
              />
              <span>{currentQuestion.question.split("______")[1] || ""}</span>
            </div>
            {isAnswerSubmitted && (
              <div className={cn(
                "p-3 rounded",
                selectedAnswer?.toLowerCase() === currentQuestion.correctAnswer?.toLowerCase() ? "bg-green-100" : "bg-red-100"
              )}>
                <p>
                  {selectedAnswer?.toLowerCase() === currentQuestion.correctAnswer?.toLowerCase()
                    ? "Correct! "
                    : `Incorrect. The correct answer is "${currentQuestion.correctAnswer}". `}
                </p>
              </div>
            )}
          </div>
        );
        
      case "speaking":
        return (
          <div className="space-y-4">
            <p>{currentQuestion.question}</p>
            <Button 
              onClick={handleSpeaking} 
              className="bg-blue-500 hover:bg-blue-600"
              disabled={isAnswerSubmitted}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Start Speaking
            </Button>
            {speakingFeedback && (
              <div className="p-3 bg-green-100 rounded">
                <p>{speakingFeedback}</p>
              </div>
            )}
          </div>
        );
        
      case "writing":
        return (
          <div className="space-y-3">
            <p>{currentQuestion.question}</p>
            <Textarea
              value={writingInput}
              onChange={(e) => setWritingInput(e.target.value)}
              rows={3}
              placeholder="Write your sentences here..."
              className="w-full"
              disabled={isAnswerSubmitted}
            />
            <Button 
              onClick={handleWritingSubmit}
              className="bg-blue-500 hover:bg-blue-600"
              disabled={isAnswerSubmitted}
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Submit Writing
            </Button>
            {writingFeedback && (
              <div className={cn(
                "p-3 rounded",
                writingFeedback.includes("Great") ? "bg-green-100" : "bg-amber-100"
              )}>
                <p>{writingFeedback}</p>
              </div>
            )}
          </div>
        );
        
      default:
        return <p>Question type not supported</p>;
    }
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
        <div className="flex items-center">
          <Award className="mr-2 h-6 w-6 text-yellow-500" />
          <div>
            <CardTitle>Earth Layers Quiz</CardTitle>
            <CardDescription>Test your knowledge of Earth Layers vocabulary</CardDescription>
          </div>
        </div>
        
        <div className="mt-2 space-y-1">
          <div className="flex justify-between text-sm">
            <span>{currentSectionData.title}</span>
            <span>
              Question {currentQuestionIndex + 1}/{currentSectionData.questions.length}
            </span>
          </div>
          <Progress value={calculateProgress()} className="h-1" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <BookOpen className="h-5 w-5 mr-2 mt-1 text-primary" />
            <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
          </div>
          
          {renderQuestion()}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Score: {score}/{totalQuestions}
          </p>
        </div>
        <div>
          {currentQuestion.type !== "speaking" && currentQuestion.type !== "writing" && !isAnswerSubmitted && (
            <Button onClick={handleAnswerSubmit}>Submit Answer</Button>
          )}
          {isAnswerSubmitted && (
            <Button onClick={handleNext}>
              {currentSection === quizSections.length - 1 && currentQuestionIndex === currentSectionData.questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          )}
        </div>
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
