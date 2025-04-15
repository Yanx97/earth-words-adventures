
import { Info } from "lucide-react";
import { PlacedSticker } from "@/types/stickers";
import StickerControls from "./StickerControls";

interface StickerSceneProps {
  unit: string;
  placedStickers: PlacedSticker[];
  editingSticker: string | null;
  bgImage: string;
  isDragging: boolean;
  stickerBeingDragged: string | null;
  onDragStart: (e: React.MouseEvent, index: number) => void;
  onDragMove: (e: React.MouseEvent, index: number) => void;
  onDragEnd: () => void;
  onEditSticker: (key: string) => void;
  onScaleSticker: (index: number, scale: number) => void;
  onDuplicateSticker: (index: number) => void;
  onRemoveSticker: (index: number) => void;
}

const StickerScene = ({
  unit,
  placedStickers,
  editingSticker,
  bgImage,
  isDragging,
  stickerBeingDragged,
  onDragStart,
  onDragMove,
  onDragEnd,
  onEditSticker,
  onScaleSticker,
  onDuplicateSticker,
  onRemoveSticker,
}: StickerSceneProps) => {
  return (
    <div 
      className={`h-64 rounded-xl relative mb-6 overflow-hidden ${bgImage}`}
      style={{ cursor: isDragging ? 'grabbing' : 'default' }}
    >
      {placedStickers.map((sticker, index) => (
        <div 
          key={sticker.key}
          className={`absolute text-2xl ${editingSticker === sticker.key ? 'ring-2 ring-primary' : ''}`}
          style={{ 
            left: `${sticker.x}%`, 
            top: `${sticker.y}%`, 
            transform: `translate(-50%, -50%) scale(${sticker.scale})`,
            zIndex: editingSticker === sticker.key ? 30 : 20,
            cursor: isDragging && stickerBeingDragged === `${index}` ? 'grabbing' : 'grab'
          }}
          onMouseDown={(e) => {
            onDragStart(e, index);
            onEditSticker(sticker.key);
          }}
          onMouseMove={(e) => onDragMove(e, index)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
        >
          {sticker.image}
          
          {editingSticker === sticker.key && (
            <StickerControls
              index={index}
              onScale={onScaleSticker}
              onDuplicate={onDuplicateSticker}
              onRemove={onRemoveSticker}
            />
          )}
        </div>
      ))}
      
      {(!placedStickers || placedStickers.length === 0) && (
        <div className="absolute inset-0 flex items-center justify-center text-white/70">
          <div className="text-center px-4">
            <p className="text-sm font-medium mb-2">Select stickers below and click "Add to Scene" to create your collection!</p>
            <Info className="h-5 w-5 mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default StickerScene;
