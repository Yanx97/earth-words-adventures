export const stickers = {
  "earth-unit": [
    { id: "crust", name: "Crust", chapter: "earth-layers", image: "🪨" },
    { id: "mantle", name: "Mantle", chapter: "earth-layers", image: "🔥" },
    { id: "core", name: "Core", chapter: "earth-layers", image: "⚪" },
    { id: "magma", name: "Magma", chapter: "earth-layers", image: "🌡️" },
    { id: "volcano", name: "Volcano", chapter: "earth-layers", image: "🌋" },
    { id: "erupt", name: "Eruption", chapter: "earth-layers", image: "💥" },
    
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
} as const;

export const bgImages = {
  "earth-unit": "bg-gradient-to-b from-earth-sky via-earth-crust to-earth-core",
  "animals-unit": "bg-gradient-to-b from-sky-300 via-emerald-200 to-amber-100",
} as const;

// Add a function to check if a sticker is unlocked
export const isWordSticker = (stickerId: string): boolean => {
  return Object.values(stickers).flat().some(s => s.id === stickerId);
};
