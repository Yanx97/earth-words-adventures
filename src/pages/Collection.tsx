
import { useState } from "react";
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

const Collection = () => {
  const [selectedTab, setSelectedTab] = useState("earth-layers");
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  const handleStickerClick = (id: string) => {
    setSelectedSticker(selectedSticker === id ? null : id);
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
              <div className={`h-64 rounded-xl ${bgImages[category as keyof typeof bgImages]} relative mb-6`}>
                {/* Placeholder for sticker scene */}
                <div className="absolute inset-0 flex items-center justify-center text-white/70">
                  <div className="text-center px-4">
                    <p className="text-sm font-medium mb-2">Drag stickers here to create your scene!</p>
                    <Info className="h-5 w-5 inline-block" />
                  </div>
                </div>
                
                {/* This is where the stickers would be positioned */}
              </div>
              
              <h3 className="text-lg font-medium mb-4">Available Stickers</h3>
              <div className="grid grid-cols-3 gap-4">
                {categoryStickers.map((sticker) => (
                  <div 
                    key={sticker.id} 
                    className={`sticker-item ${!sticker.unlocked ? 'opacity-50' : ''}`}
                    onClick={() => sticker.unlocked && handleStickerClick(sticker.id)}
                  >
                    <div className={`aspect-square rounded-lg flex items-center justify-center border ${selectedSticker === sticker.id ? 'border-primary' : 'border-border'} bg-card text-4xl`}>
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
