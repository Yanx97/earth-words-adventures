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

// Update the QuizQuestion interface
interface QuizQuestion {
  id: number;
  type: "multiple-choice" | "sentence-selection" | "grammar" | "fill-blank" | "relative-clause" | "speaking" | "writing";
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  explanation?: string;
  relatedWord: string;
}

// Update quiz sections with correct type annotations
const quizSections = [
  {
    title: "Part 1: Basic Recognition",
    description: "Test your knowledge of word meanings",
    questions: [
      {
        id: 1,
        type: "multiple-choice" as const,
        question: "What does the word 'erupt' mean?",
        options: ["to freeze", "to explode", "to fall", "to shine"],
        correctAnswer: 1,
        relatedWord: "erupt"
      },
      {
        id: 2,
        type: "multiple-choice" as const,
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
        type: "sentence-selection" as const,
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
        type: "sentence-selection" as const,
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
        type: "grammar" as const,
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
        type: "grammar" as const,
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
        type: "fill-blank" as const,
        question: "Complete the sentence: After the volcano ______, the village was covered in ash.",
        correctAnswer: "erupted",
        relatedWord: "erupt"
      },
      {
        id: 8,
        type: "relative-clause" as const,
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
        type: "speaking" as const,
        question: "Say a sentence using the word 'volcano'.",
        relatedWord: "volcano"
      },
      {
        id: 10,
        type: "writing" as const,
        question: "Write 1-2 sentences about Earth's layers. Use at least two words from the lesson.",
        relatedWord: "crust"
      }
    ]
  }
];

// ... keep existing code (rest of the file)
