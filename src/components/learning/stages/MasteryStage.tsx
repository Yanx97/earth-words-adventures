
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WordData } from "@/data/wordLearningData";

interface MasteryStageProps {
  wordInfo: WordData;
}

const MasteryStage = ({ wordInfo }: MasteryStageProps) => {
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
};

export default MasteryStage;
