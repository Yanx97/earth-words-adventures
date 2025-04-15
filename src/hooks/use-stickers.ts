import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { PlacedSticker } from '@/types/stickers';
import { stickers } from '@/data/stickerData';

export const useStickers = (initialUnit: string) => {
  const [selectedTab, setSelectedTab] = useState(initialUnit);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [stickerBeingDragged, setStickerBeingDragged] = useState<string | null>(null);
  const [placedStickers, setPlacedStickers] = useState<{ [key: string]: PlacedSticker[] }>({});
  const [unlockedStickers, setUnlockedStickers] = useState<string[]>([]);
  const [editingSticker, setEditingSticker] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedPlacedStickers = localStorage.getItem('placedStickers');
    if (savedPlacedStickers) {
      setPlacedStickers(JSON.parse(savedPlacedStickers));
    } else {
      const initialPlacedStickers: { [key: string]: PlacedSticker[] } = {};
      Object.keys(stickers).forEach(unit => {
        initialPlacedStickers[unit] = [];
      });
      setPlacedStickers(initialPlacedStickers);
    }

    const completedEarthLayersWords = JSON.parse(localStorage.getItem('completedEarthLayersWords') || '[]');
    const completedEarthGeographyWords = JSON.parse(localStorage.getItem('completedEarthGeographyWords') || '[]');
    
    setUnlockedStickers([...completedEarthLayersWords, ...completedEarthGeographyWords]);
  }, []);

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
    if (selectedSticker) {
      const sticker = stickers[selectedTab as keyof typeof stickers].find(s => s.id === selectedSticker);
      if (sticker) {
        const newSticker: PlacedSticker = {
          id: sticker.id,
          x: 50,
          y: 50,
          image: sticker.image,
          scale: 1,
          key: `${sticker.id}-${Date.now()}`
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
    if (isDragging && stickerBeingDragged === `${index}`) {
      e.preventDefault();
      const sceneRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
      const x = ((e.clientX - sceneRect.left) / sceneRect.width) * 100;
      const y = ((e.clientY - sceneRect.top) / sceneRect.height) * 100;
      
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

  return {
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
  };
};
