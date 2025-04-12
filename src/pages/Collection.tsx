
import { useState, useRef } from "react";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Info, Lock } from "lucide-react";

// Mock data
const stickers = {
  "earth-layers": [
    { id: "crust", name: "Crust", unlocked: true, image: "🪨" },
    { id: "mantle", name: "Mantle", unlocked: true, image: "🔥" },
    { id: "core", name: "Core", unlocked: true, image: "⚪" },
    { id: "lithosphere", name: "Lithosphere", unlocked: false, image: "🏞️" },
  ],
  "volcanoes": [
    { id: "volcano", name: "Volcano", unlocked: true, image: "🌋" },
    { id: "erupt", name: "Eruption", unlocked: true, image: "💥" },
    { id: "magma", name: "Magma", unlocked: false, image: "🌡️" },
    { id: "lava", name: "Lava", unlocked: false, image: "🔥" },
  ],
  "atmosphere": [
    { id: "atmosphere", name: "Atmosphere", unlocked: true, image: "☁️" },
    { id: "oxygen", name: "Oxygen", unlocked: false, image: "⚗️" },
    { id: "carbon-dioxide", name: "Carbon Dioxide", unlocked: false, image: "🔬" },
  ]
};

const bgImages = {
  "earth-layers": "bg-gradient-to-b from-earth-sky via-earth-crust to-earth-core",
  "volcanoes": "bg-gradient-to-b from-earth-sky via-earth-land to-earth-core",
  "atmosphere": "bg-gradient-to-b from-earth-atmosphere to-earth-sky",
};

// Placeholder SVG paths for the different layers
const layerPaths = {
  "earth-layers": {
    "crust": { color: "#8B4513", top: "0%", height: "20%" },
    "mantle": { color: "#FF4500", top: "20%", height: "60%" },
    "core": { color: "#FFD700", top: "80%", height: "20%" },
    "lithosphere": { color: "#556B2F", top: "0%", height: "10%" },
  },
  "volcanoes": {
    "volcano": { color: "#A52A2A", top: "40%", height: "60%" },
    "erupt": { color: "#FF4500", top: "0%", height: "50%" },
    "magma": { color: "#FF8C00", top: "50%", height: "30%" },
    "lava": { color: "#FF0000", top: "80%", height: "20%" },
  },
  "atmosphere": {
    "atmosphere": { color: "#87CEEB", top: "0%", height: "100%" },
    "oxygen": { color: "#00BFFF", top: "20%", height: "40%" },
    "carbon-dioxide": { color: "#4682B4", top: "60%", height: "40%" },
  }
};

interface PlacedSticker {
  id: string;
  x: number;
  y: number;
  image: string;
}

const Collection = () => {
  const [selectedTab, setSelectedTab] = useState("earth-layers");
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [draggedSticker, setDraggedSticker] = useState<string | null>(null);
  const [placedStickers, setPlacedStickers] = useState<{ [key: string]: PlacedSticker[] }>({
    "earth-layers": [],
    "volcanoes": [],
    "atmosphere": [],
  });
  const [activeLayers, setActiveLayers] = useState<{ [key: string]: { [key: string]: boolean } }>({
    "earth-layers": {},
    "volcanoes": {},
    "atmosphere": {},
  });
  const sceneRef = useRef<HTMLDivElement>(null);

  const handleStickerClick = (id: string) => {
    setSelectedSticker(selectedSticker === id ? null : id);
  };

  const handleDragStart = (e: React.DragEvent, stickerId: string, image: string) => {
    e.dataTransfer.setData("stickerId", stickerId);
    e.dataTransfer.setData("image", image);
    setDraggedSticker(stickerId);
  };

  const handleDragEnd = () => {
    setDraggedSticker(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const stickerId = e.dataTransfer.getData("stickerId");
    const image = e.dataTransfer.getData("image");
    
    if (!stickerId || !sceneRef.current) return;
    
    const rect = sceneRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Update placed stickers
    setPlacedStickers(prev => ({
      ...prev,
      [selectedTab]: [
        ...prev[selectedTab],
        { id: stickerId, x, y, image }
      ]
    }));

    // Activate this layer
    setActiveLayers(prev => ({
      ...prev,
      [selectedTab]: {
        ...prev[selectedTab],
        [stickerId]: true
      }
    }));
  };

  return (
    <div className="pb-20">
      {/* Top header */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-background/80 backdrop-blur-sm px-4 py-3 border-b">
        <div className="flex items-center">
          <div className="text-sm font-medium">Sticker Collection</div>
        </div>
        <div>
          <Badge variant="secondary" className="text-xs">
            {Object.values(stickers).flat().filter(s => s.unlocked).length}/
            {Object.values(stickers).flat().length} Collected
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="container max-w-md mx-auto px-4 pt-4">
        <Tabs 
          defaultValue="earth-layers" 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="earth-layers">Earth Layers</TabsTrigger>
            <TabsTrigger value="volcanoes">Volcanoes</TabsTrigger>
            <TabsTrigger value="atmosphere">Atmosphere</TabsTrigger>
          </TabsList>
          
          {Object.entries(stickers).map(([category, categoryStickers]) => (
            <TabsContent key={category} value={category} className="mt-4">
              <div 
                ref={category === selectedTab ? sceneRef : null}
                className={`h-64 rounded-xl relative mb-6 overflow-hidden ${bgImages[category as keyof typeof bgImages]}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {/* Layer visualization */}
                {categoryStickers.map((sticker) => {
                  const isActive = activeLayers[category]?.[sticker.id] || false;
                  const layerStyle = layerPaths[category as keyof typeof layerPaths][sticker.id];
                  
                  return (
                    <div 
                      key={sticker.id}
                      className={`absolute transition-opacity duration-300 w-full ${isActive ? 'opacity-70' : 'opacity-0'}`}
                      style={{
                        top: layerStyle.top,
                        height: layerStyle.height,
                        backgroundColor: layerStyle.color
                      }}
                    >
                      {isActive && (
                        <div className="absolute right-2 top-2 bg-white/80 px-2 py-1 rounded-md text-xs font-medium">
                          {sticker.name}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Placed stickers */}
                {placedStickers[category].map((sticker, index) => (
                  <div 
                    key={`${sticker.id}-${index}`}
                    className="absolute text-2xl"
                    style={{ 
                      left: `${sticker.x}%`, 
                      top: `${sticker.y}%`, 
                      transform: 'translate(-50%, -50%)',
                      zIndex: 20
                    }}
                  >
                    {sticker.image}
                  </div>
                ))}
                
                {/* Empty state */}
                {placedStickers[category].length === 0 && !activeLayers[category] && (
                  <div className="absolute inset-0 flex items-center justify-center text-white/70">
                    <div className="text-center px-4">
                      <p className="text-sm font-medium mb-2">Drag stickers here to create your scene!</p>
                      <Info className="h-5 w-5 inline-block" />
                    </div>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-medium mb-4">Available Stickers</h3>
              <div className="grid grid-cols-3 gap-4">
                {categoryStickers.map((sticker) => (
                  <div 
                    key={sticker.id} 
                    className={`sticker-item ${!sticker.unlocked ? 'opacity-50' : ''}`}
                    onClick={() => sticker.unlocked && handleStickerClick(sticker.id)}
                    draggable={sticker.unlocked}
                    onDragStart={(e) => sticker.unlocked && handleDragStart(e, sticker.id, sticker.image)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className={`aspect-square rounded-lg flex items-center justify-center border ${
                      draggedSticker === sticker.id 
                        ? 'border-accent' 
                        : selectedSticker === sticker.id 
                          ? 'border-primary' 
                          : 'border-border'
                    } bg-card text-4xl ${sticker.unlocked ? 'cursor-grab active:cursor-grabbing' : ''}`}>
                      {sticker.image}
                      {!sticker.unlocked && (
                        <div className="absolute inset-0 bg-background/50 rounded-lg flex items-center justify-center">
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="mt-1 text-xs font-medium text-center">
                      {sticker.name}
                    </div>
                  </div>
                ))}
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
