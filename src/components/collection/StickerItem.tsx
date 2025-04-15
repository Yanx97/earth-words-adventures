
import { Lock } from "lucide-react";

interface StickerItemProps {
  id: string;
  name: string;
  image: string;
  chapter: string;
  unlocked: boolean;
  selected: boolean;
  onClick: () => void;
}

const StickerItem = ({ 
  id, 
  name, 
  image, 
  chapter, 
  unlocked, 
  selected, 
  onClick 
}: StickerItemProps) => {
  return (
    <div 
      className={`sticker-item ${!unlocked ? 'opacity-50' : ''}`}
      onClick={unlocked ? onClick : undefined}
    >
      <div className={`aspect-square rounded-lg flex items-center justify-center border ${
        selected ? 'border-primary bg-primary/10' : 'border-border bg-card'
      } text-4xl ${unlocked ? 'cursor-pointer' : ''}`}>
        {image}
        {!unlocked && (
          <div className="absolute inset-0 bg-background/50 rounded-lg flex items-center justify-center">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="mt-1 text-xs font-medium text-center">
        {name}
      </div>
      <div className="text-[10px] text-center text-muted-foreground">
        {chapter === 'earth-layers' ? 'Earth Layers' : 
         chapter === 'earth-geography' ? 'Geography' : 'Animals'}
      </div>
    </div>
  );
};

export default StickerItem;
