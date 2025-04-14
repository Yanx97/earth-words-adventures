
import React from "react";
import VocabCard from "@/components/learning/VocabCard";
import QuizCard from "@/components/learning/QuizCard";
import { wordLearningData } from "@/data/wordLearningData";
import { quizSections } from "@/data/quizData";

interface VocabGridProps {
  words: string[];
  completedWords: string[];
}

const VocabGrid = ({ words, completedWords }: VocabGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {words.map(word => {
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
      <QuizCard 
        totalQuestions={quizSections.flatMap(section => section.questions).length}
        completedQuestions={0}
      />
    </div>
  );
};

export default VocabGrid;
