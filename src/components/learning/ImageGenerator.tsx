
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

interface ImageGeneratorProps {
  sentence: string;
  word: string;
}

const ImageGenerator = ({ sentence, word }: ImageGeneratorProps) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const generateImageForSentence = () => {
    setIsGeneratingImage(true);
    
    setTimeout(() => {
      const placeholderImages: Record<string, string> = {
        'crust': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
        'mantle': 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
        'core': 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
        'erupt': 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
        'magma': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
      };
      
      const imageUrl = placeholderImages[word || ''] || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5';
      
      setGeneratedImage(imageUrl);
      setIsGeneratingImage(false);
    }, 1500);
  };

  React.useEffect(() => {
    generateImageForSentence();
  }, [word]);

  return (
    <div className="mb-4">
      <p className="text-sm mb-2">{sentence}</p>
      
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
            alt={`Visualization of: ${sentence}`}
            className="w-full h-60 object-cover rounded-md"
          />
          <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
            AI-generated visualization
          </div>
        </div>
      ) : null}

      {!isGeneratingImage && generatedImage && (
        <div className="flex justify-end mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={generateImageForSentence}
            className="text-xs"
          >
            <ImageIcon className="h-3 w-3 mr-1" /> Regenerate Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
