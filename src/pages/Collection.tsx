
import { useState, useRef, useEffect } from "react";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, Lock, Save, Copy, ZoomIn, ZoomOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Combined unit stickers
const stickers = {
  "earth-unit": [
    // Earth Layers words
    { id: "crust", name: "Crust", chapter: "earth-layers", image: "🪨" },
    { id: "mantle", name: "Mantle", chapter: "earth-layers", image: "🔥" },
    { id: "core", name: "Core", chapter: "earth-layers", image: "⚪" },
    { id: "magma", name: "Magma", chapter: "earth-layers", image: "🌡️" },
    { id: "volcano", name: "Volcano", chapter: "earth-layers", image: "🌋" },
    { id: "erupt", name: "Eruption", chapter: "earth-layers", image: "💥" },
    
    // Earth Geography words
    { id: "hydrosphere", name: "Hydrosphere", chapter: "earth-geography", image: "💧" },
    { id: "atmosphere", name: "Atmosphere", chapter: "earth-geography", image: "☁️" },
    { id: "lithosphere", name: "Lithosphere", chapter: "earth-geography", image: "🏞️" },
    { id: "longitude", name: "Longitude", chapter: "earth-geography", image: "🧭" },
    { id: "latitude", name: "Latitude", chapter: "earth-geography", image: "🌐" },
    { id: "horizon", name: "Horizon", chapter: "earth-geography", image: "🌅" },
    { id: "altitude", name: "Altitude", chapter: "earth-geography", image: "⛰️" },
  ],
  "animals-unit": [
    { id: "mammal", name: "Mammal", chapter: "animals", image: "🐘" },
    { id: "reptile", name: "Reptile", chapter: "animals", image: "🦎" },
    { id: "bird", name: "Bird", chapter: "animals", image: "🦜" },
    { id: "fish", name: "Fish", chapter: "animals", image: "🐠" },
  ],
};

const bgImages = {
  "earth-unit": "bg-gradient-to-b from-earth-sky via-earth-crust to-earth-core",
  "animals-unit": "bg-gradient-to-b from-sky-300 via-emerald-200 to-amber-100",
};

interface PlacedSticker {
  id: string;
  x: number;
  y: number;
  image: string;
  scale: number;
  key: string; // Unique identifier for duplicated stickers
}

const Collection = () => {
  const [selectedTab, setSelectedTab] = useState("earth-unit");
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [stickerBeingDragged, setStickerBeingDragged] = useState<string | null>(null);
  const [placedStickers, setPlacedStickers] = useState<{ [key: string]: PlacedSticker[] }>({});
  const [unlockedStickers, setUnlockedStickers] = useState<string[]>([]);
  const [editingSticker, setEditingSticker] = useState<string | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load saved placed stickers and unlocked status
  useEffect(() => {
    const savedPlacedStickers = localStorage.getItem('placedStickers');
    if (savedPlacedStickers) {
      setPlacedStickers(JSON.parse(savedPlacedStickers));
    } else {
      // Initialize empty arrays for each unit
      const initialPlacedStickers: { [key: string]: PlacedSticker[] } = {};
      Object.keys(stickers).forEach(unit => {
        initialPlacedStickers[unit] = [];
      });
      setPlacedStickers(initialPlacedStickers);
    }

    // Load unlocked stickers based on completed words
    const completedEarthLayersWords = JSON.parse(localStorage.getItem('completedEarthLayersWords') || '[]');
    const completedEarthGeographyWords = JSON.parse(localStorage.getItem('completedEarthGeographyWords') || '[]');
    
    // Combine all unlocked stickers
    setUnlockedStickers([...completedEarthLayersWords, ...completedEarthGeographyWords]);
  }, []);

  // Save placed stickers to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(placedStickers).length > 0) {
      localStorage.setItem('placedStickers', JSON.stringify(placedStickers));
    }
  }, [placedStickers]);

  const isUnlocked = (stickerId: string): boolean => {
    return unlockedStickers.includes(stickerId);
  };

  const handleStickerClick = (id: string) => {
    if (isUnlocked(id)) {
      setSelectedSticker(selectedSticker === id ? null : id);
    }
  };

  const handlePlaceStickerClick = () => {
    if (selectedSticker && sceneRef.current) {
      const sticker = stickers[selectedTab as keyof typeof stickers].find(s => s.id === selectedSticker);
      if (sticker) {
        const newSticker: PlacedSticker = {
          id: sticker.id,
          x: 50, // Place in center by default
          y: 50,
          image: sticker.image,
          scale: 1,
          key: `${sticker.id}-${Date.now()}` // Unique key for each placed sticker
        };

        setPlacedStickers(prev => ({
          ...prev,
          [selectedTab]: [...(prev[selectedTab] || []), newSticker]
        }));

        toast({
          title: "Sticker placed!",
          description: `${sticker.name} sticker has been added to your scene.`,
        });
      }
    }
  };

  const handleDragStart = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setIsDragging(true);
    setStickerBeingDragged(`${index}`);
  };

  const handleDragMove = (e: React.MouseEvent, index: number) => {
    if (isDragging && stickerBeingDragged === `${index}` && sceneRef.current) {
      e.preventDefault();
      const rect = sceneRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Update the sticker position
      setPlacedStickers(prev => {
        const updatedStickers = [...prev[selectedTab]];
        updatedStickers[index] = { ...updatedStickers[index], x, y };
        return { ...prev, [selectedTab]: updatedStickers };
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setStickerBeingDragged(null);
  };

  const handleScaleSticker = (index: number, scaleChange: number) => {
    setPlacedStickers(prev => {
      const updatedStickers = [...prev[selectedTab]];
      const currentScale = updatedStickers[index].scale;
      const newScale = Math.max(0.5, Math.min(3, currentScale + scaleChange));
      updatedStickers[index] = { ...updatedStickers[index], scale: newScale };
      return { ...prev, [selectedTab]: updatedStickers };
    });
  };

  const handleDuplicateSticker = (index: number) => {
    setPlacedStickers(prev => {
      const stickerToDuplicate = prev[selectedTab][index];
      const duplicatedSticker: PlacedSticker = {
        ...stickerToDuplicate,
        x: stickerToDuplicate.x + 5,
        y: stickerToDuplicate.y + 5,
        key: `${stickerToDuplicate.id}-${Date.now()}`
      };
      return { 
        ...prev, 
        [selectedTab]: [...prev[selectedTab], duplicatedSticker]
      };
    });
    
    toast({
      title: "Sticker duplicated",
      description: "A copy of the sticker has been created.",
    });
  };

  const handleRemoveSticker = (index: number) => {
    setPlacedStickers(prev => {
      const updatedStickers = [...prev[selectedTab]];
      updatedStickers.splice(index, 1);
      return { ...prev, [selectedTab]: updatedStickers };
    });
  };

  const handleSaveScene = () => {
    localStorage.setItem('placedStickers', JSON.stringify(placedStickers));
    toast({
      title: "Scene saved!",
      description: "Your sticker scene has been saved successfully.",
    });
  };

  // Count total unlocked stickers across all units
  const totalUnlockedStickers = Object.values(stickers).flat()
    .filter(sticker => isUnlocked(sticker.id)).length;
  
  // Count total stickers across all units
  const totalStickers = Object.values(stickers).flat().length;

  return (
    <div className="pb-20">
      {/* Top header */}
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

      {/* Tabs */}
      <div className="container max-w-md mx-auto px-4 pt-4">
        <Tabs 
          defaultValue="earth-unit" 
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
              <div 
                ref={unit === selectedTab ? sceneRef : null}
                className={`h-64 rounded-xl relative mb-6 overflow-hidden ${bgImages[unit as keyof typeof bgImages]}`}
                style={{ cursor: isDragging ? 'grabbing' : 'default' }}
              >                
                {/* Placed stickers */}
                {placedStickers[unit]?.map((sticker, index) => (
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
                      handleDragStart(e, index);
                      setEditingSticker(sticker.key);
                    }}
                    onMouseMove={(e) => handleDragMove(e, index)}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                  >
                    {sticker.image}
                    
                    {/* Sticker controls - only show for currently editing sticker */}
                    {editingSticker === sticker.key && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 flex space-x-1 bg-background/90 rounded-md p-1 shadow-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => handleScaleSticker(index, 0.1)}
                        >
                          <ZoomIn className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => handleScaleSticker(index, -0.1)}
                        >
                          <ZoomOut className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => handleDuplicateSticker(index)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-destructive" 
                          onClick={() => handleRemoveSticker(index)}
                        >
                          <span className="text-xs">×</span>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Empty state */}
                {(!placedStickers[unit] || placedStickers[unit].length === 0) && (
                  <div className="absolute inset-0 flex items-center justify-center text-white/70">
                    <div className="text-center px-4">
                      <p className="text-sm font-medium mb-2">Select stickers below and click "Add to Scene" to create your collection!</p>
                      <Info className="h-5 w-5 mx-auto" />
                    </div>
                  </div>
                )}
              </div>
              
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
                {unitStickers.map((sticker) => {
                  const unlocked = isUnlocked(sticker.id);
                  return (
                    <div 
                      key={sticker.id} 
                      className={`sticker-item ${!unlocked ? 'opacity-50' : ''}`}
                      onClick={() => unlocked && handleStickerClick(sticker.id)}
                    >
                      <div className={`aspect-square rounded-lg flex items-center justify-center border ${
                        selectedSticker === sticker.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border bg-card'
                      } text-4xl ${unlocked ? 'cursor-pointer' : ''}`}>
                        {sticker.image}
                        {!unlocked && (
                          <div className="absolute inset-0 bg-background/50 rounded-lg flex items-center justify-center">
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="mt-1 text-xs font-medium text-center">
                        {sticker.name}
                      </div>
                      <div className="text-[10px] text-center text-muted-foreground">
                        {sticker.chapter === 'earth-layers' ? 'Earth Layers' : 
                         sticker.chapter === 'earth-geography' ? 'Geography' : 'Animals'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Bottom navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Collection;
