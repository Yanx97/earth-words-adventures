
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavigation from "@/components/layout/BottomNavigation";
import StickerItem from "@/components/collection/StickerItem";
import StickerScene from "@/components/collection/StickerScene";
import { stickers, bgImages } from "@/data/stickerData";
import { useStickers } from "@/hooks/use-stickers";

const Collection = () => {
  const {
    selectedTab,
    setSelectedTab,
    selectedSticker,
    isDragging,
    stickerBeingDragged,
    placedStickers,
    editingSticker,
    setEditingSticker,
    isUnlocked,
    handleStickerClick,
    handlePlaceStickerClick,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleScaleSticker,
    handleDuplicateSticker,
    handleRemoveSticker,
    handleSaveScene,
  } = useStickers("earth-unit");

  const totalUnlockedStickers = Object.values(stickers).flat()
    .filter(sticker => isUnlocked(sticker.id)).length;
  
  const totalStickers = Object.values(stickers).flat().length;

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-30 flex items-center justify-between bg-background/80 backdrop-blur-sm px-4 py-3 border-b">
        <div className="flex items-center">
          <div className="text-sm font-medium">Sticker Collection</div>
        </div>
        <div>
          <Badge variant="secondary" className="text-xs">
            {totalUnlockedStickers}/{totalStickers} Collected
          </Badge>
        </div>
      </div>

      <div className="container max-w-md mx-auto px-4 pt-4">
        <Tabs 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="earth-unit">Earth & Geography</TabsTrigger>
            <TabsTrigger value="animals-unit">Animals</TabsTrigger>
          </TabsList>
          
          {Object.entries(stickers).map(([unit, unitStickers]) => (
            <TabsContent key={unit} value={unit} className="mt-4">
              <StickerScene
                unit={unit}
                placedStickers={placedStickers[unit] || []}
                editingSticker={editingSticker}
                bgImage={bgImages[unit as keyof typeof bgImages]}
                isDragging={isDragging}
                stickerBeingDragged={stickerBeingDragged}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                onEditSticker={setEditingSticker}
                onScaleSticker={handleScaleSticker}
                onDuplicateSticker={handleDuplicateSticker}
                onRemoveSticker={handleRemoveSticker}
              />
              
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">Available Stickers</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveScene}
                  className="flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  Save Scene
                </Button>
              </div>

              {selectedSticker && (
                <Button 
                  className="w-full mb-4" 
                  onClick={handlePlaceStickerClick}
                >
                  Add Selected Sticker to Scene
                </Button>
              )}
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {unitStickers.map((sticker) => (
                  <StickerItem
                    key={sticker.id}
                    {...sticker}
                    unlocked={isUnlocked(sticker.id)}
                    selected={selectedSticker === sticker.id}
                    onClick={() => handleStickerClick(sticker.id)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Collection;
