import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Volume2, Mic, Check, AlertCircle, Film, Music, ImageIcon } from "lucide-react";
import { pronunciationService } from "@/services/pronunciationService";
import { Progress } from "@/components/ui/progress";
import WordCard from "@/components/WordCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const wordLearningData = {
  "crust": {
    word: "crust",
    translation: "地壳",
    partOfSpeech: "noun",
    phonetic: "/krʌst/",
    meaning: "The outermost layer of the Earth.",
    example: "The Earth's crust is the outermost layer.",
    imageUrl: "🪨",
    stages: [
      {
        title: "Recognition",
        description: "Learn the meaning and pronunciation",
      },
      {
        title: "Understanding",
        description: "Understand the word in context",
      },
      {
        title: "Practice",
        description: "Practice using the word",
      },
      {
        title: "Mastery",
        description: "Master complex expressions",
      }
    ],
    relatedWords: ["mantle", "core", "lithosphere"],
    sentences: [
      "The Earth's crust varies in thickness.",
      "Continental crust is thicker than oceanic crust.",
      "Earthquakes occur when there's movement in the crust."
    ],
    mediaExamples: [
      {
        type: "video",
        source: "National Geographic",
        description: "Clip from 'Inside Earth' documentary",
        url: "https://example.com/earth-crust-video"
      },
      {
        type: "audio",
        source: "Earth Science Audiobook",
        description: "Chapter on Earth's Structure",
        url: "https://example.com/earth-layers-audio"
      }
    ]
  },
  "mantle": {
    word: "mantle",
    translation: "地幔",
    partOfSpeech: "noun",
    phonetic: "/ˈmæn.təl/",
    meaning: "The layer of the Earth between the crust and the core.",
    example: "The mantle makes up about 84% of Earth's volume.",
    imageUrl: "🔥",
    stages: [
      {
        title: "Recognition",
        description: "Learn the meaning and pronunciation",
      },
      {
        title: "Understanding",
        description: "Understand the word in context",
      },
      {
        title: "Practice",
        description: "Practice using the word",
      },
      {
        title: "Mastery",
        description: "Master complex expressions",
      }
    ],
    relatedWords: ["crust", "core", "magma"],
    sentences: [
      "The mantle is mostly solid rock.",
      "Heat from the mantle causes plate movement.",
      "Scientists study the mantle to understand Earth's formation."
    ],
    mediaExamples: [
      {
        type: "video",
        source: "Discovery Channel",
        description: "From 'Planet Earth' series",
        url: "https://example.com/earth-mantle-video"
      },
      {
        type: "audio",
        source: "Geology Podcast",
        description: "Episode on Earth's Interior",
        url: "https://example.com/mantle-podcast"
      }
    ]
  },
  "core": {
    word: "core",
    translation: "地核",
    partOfSpeech: "noun",
    phonetic: "/kɔːr/",
    meaning: "The central part of the Earth, beneath the mantle.",
    example: "The Earth's core is divided into an outer liquid core and an inner solid core.",
    imageUrl: "⚪",
    stages: [
      {
        title: "Recognition",
        description: "Learn the meaning and pronunciation",
      },
      {
        title: "Understanding",
        description: "Understand the word in context",
      },
      {
        title: "Practice",
        description: "Practice using the word",
      },
      {
        title: "Mastery",
        description: "Master complex expressions",
      }
    ],
    relatedWords: ["crust", "mantle", "iron"],
    sentences: [
      "The core is mainly composed of iron and nickel.",
      "The Earth's magnetic field is generated in the core.",
      "The temperature at the core is as hot as the surface of the Sun."
    ]
  },
  "erupt": {
    word: "erupt",
    translation: "爆发",
    partOfSpeech: "verb",
    phonetic: "/ɪˈrʌpt/",
    meaning: "To suddenly burst out or break open, especially of a volcano sending out rocks, ash, lava, etc.",
    example: "The volcano could erupt at any moment.",
    imageUrl: "💥",
    stages: [
      {
        title: "Recognition",
        description: "Learn the meaning and pronunciation",
      },
      {
        title: "Understanding",
        description: "Understand the word in context",
      },
      {
        title: "Practice",
        description: "Practice using the word",
      },
      {
        title: "Mastery",
        description: "Master complex expressions",
      }
    ],
    relatedWords: ["volcano", "lava", "magma"],
    sentences: [
      "The volcano erupted violently last year.",
      "Scientists can predict when some volcanoes might erupt.",
      "When tensions erupt, conflict may follow."
    ]
  },
  "magma": {
    word: "magma",
    translation: "岩浆",
    partOfSpeech: "noun",
    phonetic: "/ˈmæɡ.mə/",
    meaning: "Hot fluid or semi-fluid material below or within the earth's crust from which lava is formed.",
    example: "Magma forms deep within the Earth.",
    imageUrl: "🌡️",
    stages: [
      {
        title: "Recognition",
        description: "Learn the meaning and pronunciation",
      },
      {
        title: "Understanding",
        description: "Understand the word in context",
      },
      {
        title: "Practice",
        description: "Practice using the word",
      },
      {
        title: "Mastery",
        description: "Master complex expressions",
      }
    ],
    relatedWords: ["volcano", "lava", "erupt"],
    sentences: [
      "Magma comes from deep inside the Earth.",
      "When magma reaches the surface, it becomes lava.",
      "The composition of magma affects the type of eruption."
    ]
  }
};

interface SentenceWordProps {
  word: string;
  isHighlighted?: boolean;
  onClick?: () => void;
}

const SentenceWord = ({ word, isHighlighted, onClick }: SentenceWordProps) => {
  return (
    <span 
      className={`inline-block px-1 py-0.5 rounded cursor-pointer transition-colors ${
        isHighlighted ? 'bg-primary/20 text-primary' : 'hover:bg-muted'
      }`}
      onClick={onClick}
    >
      {word}
    </span>
  );
};

interface SentenceBreakdownProps {
  sentence: string;
  onWordClick: (word: string) => void;
  highlightedWord: string | null;
}

const SentenceBreakdown = ({ sentence, onWordClick, highlightedWord }: SentenceBreakdownProps) => {
  const words = sentence.split(/\b/).filter(word => word.trim());
  
  return (
    <div className="p-4 bg-muted/30 rounded-lg my-4">
      <div className="mb-3 text-sm text-muted-foreground">
        Click on any word to see its definition:
      </div>
      <div className="leading-loose">
        {words.map((word, idx) => {
          const cleanWord = word.replace(/[,.!?;:]/g, "");
          return (
            <SentenceWord 
              key={idx}
              word={word}
              isHighlighted={highlightedWord === cleanWord}
              onClick={() => onWordClick(cleanWord)}
            />
          );
        })}
      </div>
    </div>
  );
};

const WordLearningPage = () => {
  const { wordId } = useParams<{ wordId: string }>();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [highlightedWord, setHighlightedWord] = useState<string | null>(null);
  const [wordInfo, setWordInfo] = useState<any | null>(null);
  const [speechResult, setSpeechResult] = useState<null | {
    text: string;
    accuracy: Record<string, boolean>;
  }>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const generateImageForSentence = (sentenceIndex: number) => {
    setIsGeneratingImage(true);
    
    setTimeout(() => {
      const placeholderImages: Record<string, string> = {
        'crust': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
        'mantle': 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
        'core': 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
        'erupt': 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
        'magma': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
      };
      
      const imageUrl = placeholderImages[wordInfo?.word || ''] || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5';
      
      setGeneratedImage(imageUrl);
      setIsGeneratingImage(false);
    }, 1500);
  };

  useEffect(() => {
    if (wordId && wordLearningData[wordId as keyof typeof wordLearningData]) {
      setWordInfo(wordLearningData[wordId as keyof typeof wordLearningData]);
      generateImageForSentence(0);
    } else {
      navigate("/");
    }
  }, [wordId, navigate]);

  if (!wordInfo) return <div>Loading...</div>;

  const handlePlayAudio = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    await pronunciationService.playAudio(wordInfo.word);
    setIsPlaying(false);
  };

  const handlePlaySentence = async (sentence: string) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(false);
    }
  };

  const handleWordClick = (word: string) => {
    setHighlightedWord(word === highlightedWord ? null : word);
    
    if (word !== highlightedWord) {
      pronunciationService.playAudio(word);
    }
  };

  const handleMicClick = () => {
    setIsRecording(true);
    
    setTimeout(() => {
      setIsRecording(false);
      
      const exampleSentence = wordInfo.sentences[0];
      const words = exampleSentence.toLowerCase().split(/\s+/).map(w => w.replace(/[,.!?;:]/g, ""));
      
      const accuracy: Record<string, boolean> = {};
      words.forEach(word => {
        accuracy[word] = Math.random() > 0.2;
      });
      
      setSpeechResult({
        text: exampleSentence,
        accuracy
      });
    }, 2000);
  };

  const handleNextStage = () => {
    if (currentStage < wordInfo.stages.length - 1) {
      setCurrentStage(currentStage + 1);
      setSpeechResult(null);
      setHighlightedWord(null);
    } else {
      navigate("/");
    }
  };

  const handlePrevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
      setSpeechResult(null);
      setHighlightedWord(null);
    } else {
      navigate("/");
    }
  };

  const renderStageContent = () => {
    switch (currentStage) {
      case 0: // Recognition
        return (
          <div className="space-y-6">
            <div className="flex justify-center my-6">
              <div className="text-8xl">{wordInfo.imageUrl}</div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold mb-1">{wordInfo.word}</h2>
              <div className="text-muted-foreground mb-2">{wordInfo.phonetic}</div>
              <div className="text-sm font-medium text-muted-foreground mb-4">
                {wordInfo.partOfSpeech}
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="mb-6"
                onClick={handlePlayAudio}
                disabled={isPlaying}
              >
                <Volume2 className={`h-4 w-4 mr-1 ${isPlaying ? 'text-primary' : ''}`} />
                Play Pronunciation
              </Button>
              
              <div className="text-lg mb-4">{wordInfo.translation}</div>
              <div className="text-sm text-muted-foreground max-w-md">
                {wordInfo.meaning}
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-medium mb-2">Related Words</h3>
              <div className="flex flex-wrap gap-2">
                {wordInfo.relatedWords.map((relWord: string) => (
                  <div 
                    key={relWord} 
                    className="px-3 py-1 bg-background rounded-full text-sm border cursor-pointer"
                    onClick={() => navigate(`/learn/${relWord}`)}
                  >
                    {relWord}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 1: // Understanding
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Understanding "{wordInfo.word}" in Context</h2>
            
            {wordInfo.mediaExamples && wordInfo.mediaExamples.length > 0 && (
              <Card className="mb-6">
                <div className="p-4">
                  <h3 className="font-medium mb-3">Media Examples</h3>
                  
                  <div className="flex gap-2 mb-4">
                    {wordInfo.mediaExamples.map((media: any, idx: number) => (
                      <Button
                        key={idx}
                        variant={selectedMediaIndex === idx ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMediaIndex(idx)}
                      >
                        {media.type === "video" ? <Film className="h-4 w-4 mr-1" /> : <Music className="h-4 w-4 mr-1" />}
                        {media.type === "video" ? "Video" : "Audio"}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4 mb-2">
                    <div className="flex items-center text-sm mb-2">
                      {wordInfo.mediaExamples[selectedMediaIndex].type === "video" ? (
                        <Film className="h-4 w-4 mr-2 text-primary" />
                      ) : (
                        <Music className="h-4 w-4 mr-2 text-primary" />
                      )}
                      <span className="font-medium">
                        {wordInfo.mediaExamples[selectedMediaIndex].description}
                      </span>
                    </div>
                    
                    <div className="bg-gray-800 h-40 rounded flex items-center justify-center text-white">
                      {wordInfo.mediaExamples[selectedMediaIndex].type === "video" ? (
                        <div className="text-center">
                          <Film className="h-10 w-10 mx-auto mb-2" />
                          <div>Video Player Placeholder</div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Music className="h-10 w-10 mx-auto mb-2" />
                          <div>Audio Player Placeholder</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Source: {wordInfo.mediaExamples[selectedMediaIndex].source}
                  </div>
                </div>
              </Card>
            )}
            
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-3">Visualization</h3>
              
              <div className="mb-4">
                <p className="text-sm mb-2">{wordInfo.sentences[0]}</p>
                
                {isGeneratingImage ? (
                  <div className="bg-gray-100 h-60 rounded-md flex items-center justify-center animate-pulse">
                    <div className="text-center">
                      <ImageIcon className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                      <div className="text-muted-foreground">Generating image...</div>
                    </div>
                  </div>
                ) : generatedImage ? (
                  <div className="relative">
                    <img 
                      src={generatedImage} 
                      alt={`Visualization of: ${wordInfo.sentences[0]}`}
                      className="w-full h-60 object-cover rounded-md"
                    />
                    <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
                      AI-generated visualization
                    </div>
                  </div>
                ) : null}
              </div>
              
              {!isGeneratingImage && (
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => generateImageForSentence(0)}
                    className="text-xs"
                  >
                    <ImageIcon className="h-3 w-3 mr-1" /> Regenerate Image
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              {wordInfo.sentences.map((sentence: string, idx: number) => (
                <Card key={idx} className="mb-3">
                  <div className="p-4">
                    <SentenceBreakdown 
                      sentence={sentence}
                      onWordClick={handleWordClick}
                      highlightedWord={highlightedWord}
                    />
                    
                    {highlightedWord && (
                      <div className="bg-muted p-3 rounded-md text-sm mt-2">
                        <div className="font-medium">{highlightedWord}</div>
                        <div>Definition would appear here...</div>
                      </div>
                    )}
                    
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePlaySentence(sentence)}
                        disabled={isPlaying}
                      >
                        <Volume2 className={`h-4 w-4 mr-1 ${isPlaying ? 'text-primary' : ''}`} />
                        Play Sentence
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full">
                  Show Grammar Notes
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 mt-3 bg-muted/30 rounded-lg">
                  <h3 className="font-medium mb-2">Grammar Structure</h3>
                  <p className="text-sm text-muted-foreground">
                    The sentence "{wordInfo.sentences[0]}" uses a simple subject-verb structure.
                    The word "{wordInfo.word}" acts as {wordInfo.partOfSpeech === "noun" ? "a noun" : "a verb"} in this context.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        );
        
      case 2: // Practice
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Practice Pronunciation</h2>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-center text-lg mb-4">
                {wordInfo.sentences[0]}
              </p>
              
              <div className="flex justify-center mb-4">
                <Button 
                  variant={isRecording ? "destructive" : "default"}
                  onClick={handleMicClick}
                  disabled={isRecording}
                  className="h-16 w-16 rounded-full"
                >
                  <Mic className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="text-sm text-center text-muted-foreground">
                {isRecording ? "Listening..." : "Click the microphone and read the sentence"}
              </div>
            </div>
            
            {speechResult && (
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Your Pronunciation</h3>
                <div className="mb-3 text-sm">
                  {speechResult.text.split(/\s+/).map((word: string, idx: number) => {
                    const cleanWord = word.toLowerCase().replace(/[,.!?;:]/g, "");
                    const isCorrect = speechResult.accuracy[cleanWord];
                    
                    return (
                      <span 
                        key={idx} 
                        className={`inline-block px-1 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}
                      >
                        {word} {isCorrect ? 
                          <Check className="inline h-4 w-4" /> : 
                          <AlertCircle className="inline h-4 w-4" />
                        }
                      </span>
                    );
                  })}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {Object.values(speechResult.accuracy).filter(Boolean).length} out of {Object.values(speechResult.accuracy).length} words pronounced correctly.
                </div>
              </div>
            )}
          </div>
        );
        
      case 3: // Mastery
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Mastery Exercises</h2>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-medium mb-3">Fill in the blank</h3>
              <p className="mb-4">
                The _____ {wordInfo.partOfSpeech === "noun" ? "is" : wordInfo.partOfSpeech === "verb" ? "" : "is"} {wordInfo.meaning.split(" ").slice(3).join(" ")}
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">
                  {wordInfo.word}
                </Button>
                <Button variant="outline">
                  {wordInfo.relatedWords[0]}
                </Button>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-medium mb-3">Advanced Sentence Formation</h3>
              <p className="text-sm mb-3">
                Create a complex sentence using "{wordInfo.word}" with the given structure:
              </p>
              <div className="mb-4 text-sm bg-muted p-3 rounded">
                Although [subject] [verb], [subject] [verb] {wordInfo.word}.
              </div>
              
              <Button variant="outline" className="w-full">
                See Example
              </Button>
            </div>
            
            <Card>
              <div className="p-4">
                <h3 className="font-medium mb-2">IELTS Speaking Practice</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Use this template to answer an IELTS speaking question:
                </p>
                <div className="bg-muted p-3 rounded mb-3">
                  <p className="italic">
                    "I believe {wordInfo.word} is {wordInfo.meaning.toLowerCase()}, which is fascinating because it reveals how {wordInfo.relatedWords[0]} and {wordInfo.relatedWords[1]} are interconnected in nature."
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );
        
      default:
        return <div>Unknown stage</div>;
    }
  };

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-30 flex items-center justify-between bg-background/80 backdrop-blur-sm px-4 py-3 border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-sm font-medium">Learning: {wordInfo.word}</div>
        <div className="flex items-center space-x-2">
          <div className="bg-secondary/80 px-2 py-1 rounded-full text-xs">
            Stage {currentStage + 1}/{wordInfo.stages.length}
          </div>
        </div>
      </div>

      <div className="w-full h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all" 
          style={{ width: `${((currentStage + 1) / wordInfo.stages.length) * 100}%` }}
        ></div>
      </div>

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
            <TabsContent key={idx} value={String(idx)} className="hidden">
              <div className="space-y-6">
                {renderStageContent()}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="fixed bottom-16 left-0 right-0 flex justify-between px-4 py-3 bg-background/80 backdrop-blur-sm border-t">
        <Button 
          variant="outline"
          onClick={handlePrevStage}
          disabled={currentStage === 0}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Previous
        </Button>
        
        <Button
          onClick={handleNextStage}
        >
          {currentStage < wordInfo.stages.length - 1 ? 'Next' : 'Finish'}
          <ChevronRight className="h-5 w-5 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default WordLearningPage;
