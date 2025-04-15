
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Copy } from "lucide-react";

interface StickerControlsProps {
  index: number;
  onScale: (index: number, change: number) => void;
  onDuplicate: (index: number) => void;
  onRemove: (index: number) => void;
}

const StickerControls = ({ index, onScale, onDuplicate, onRemove }: StickerControlsProps) => {
  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 flex space-x-1 bg-background/90 rounded-md p-1 shadow-md">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6" 
        onClick={() => onScale(index, 0.1)}
      >
        <ZoomIn className="h-3 w-3" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6" 
        onClick={() => onScale(index, -0.1)}
      >
        <ZoomOut className="h-3 w-3" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6" 
        onClick={() => onDuplicate(index)}
      >
        <Copy className="h-3 w-3" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 text-destructive" 
        onClick={() => onRemove(index)}
      >
        <span className="text-xs">×</span>
      </Button>
    </div>
  );
};

export default StickerControls;
