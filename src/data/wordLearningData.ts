
interface MediaExample {
  type: string;
  source: string;
  description: string;
  url: string;
}

export interface WordStage {
  title: string;
  description: string;
}

export interface WordData {
  word: string;
  translation: string;
  partOfSpeech: string;
  phonetic: string;
  meaning: string;
  example?: string;
  imageUrl: string;
  stages: WordStage[];
  relatedWords: string[];
  sentences: string[];
  mediaExamples?: MediaExample[];
}

export const wordLearningData: Record<string, WordData> = {
  "crust": {
    word: "crust",
    translation: "地壳",
    partOfSpeech: "noun",
    phonetic: "/krʌst/",
    meaning: "The outermost layer of the Earth.",
    example: "The Earth's crust is the outermost layer.",
    imageUrl: "🪨",
    stages: [
      {
        title: "Recognition",
        description: "Learn the meaning and pronunciation",
      },
      {
        title: "Understanding",
        description: "Understand the word in context",
      },
      {
        title: "Practice",
        description: "Practice using the word",
      },
      {
        title: "Mastery",
        description: "Master complex expressions",
      }
    ],
    relatedWords: ["mantle", "core", "lithosphere"],
    sentences: [
      "The Earth's crust varies in thickness.",
      "Continental crust is thicker than oceanic crust.",
      "Earthquakes occur when there's movement in the crust."
    ],
    mediaExamples: [
      {
        type: "video",
        source: "National Geographic",
        description: "Clip from 'Inside Earth' documentary",
        url: "https://example.com/earth-crust-video"
      },
      {
        type: "audio",
        source: "Earth Science Audiobook",
        description: "Chapter on Earth's Structure",
        url: "https://example.com/earth-layers-audio"
      }
    ]
  },
  "mantle": {
    word: "mantle",
    translation: "地幔",
    partOfSpeech: "noun",
    phonetic: "/ˈmæn.təl/",
    meaning: "The layer of the Earth between the crust and the core.",
    example: "The mantle makes up about 84% of Earth's volume.",
    imageUrl: "🔥",
    stages: [
      {
        title: "Recognition",
        description: "Learn the meaning and pronunciation",
      },
      {
        title: "Understanding",
        description: "Understand the word in context",
      },
      {
        title: "Practice",
        description: "Practice using the word",
      },
      {
        title: "Mastery",
        description: "Master complex expressions",
      }
    ],
    relatedWords: ["crust", "core", "magma"],
    sentences: [
      "The mantle is mostly solid rock.",
      "Heat from the mantle causes plate movement.",
      "Scientists study the mantle to understand Earth's formation."
    ],
    mediaExamples: [
      {
        type: "video",
        source: "Discovery Channel",
        description: "From 'Planet Earth' series",
        url: "https://example.com/earth-mantle-video"
      },
      {
        type: "audio",
        source: "Geology Podcast",
        description: "Episode on Earth's Interior",
        url: "https://example.com/mantle-podcast"
      }
    ]
  },
  "core": {
    word: "core",
    translation: "地核",
    partOfSpeech: "noun",
    phonetic: "/kɔːr/",
    meaning: "The central part of the Earth, beneath the mantle.",
    example: "The Earth's core is divided into an outer liquid core and an inner solid core.",
    imageUrl: "⚪",
    stages: [
      {
        title: "Recognition",
        description: "Learn the meaning and pronunciation",
      },
      {
        title: "Understanding",
        description: "Understand the word in context",
      },
      {
        title: "Practice",
        description: "Practice using the word",
      },
      {
        title: "Mastery",
        description: "Master complex expressions",
      }
    ],
    relatedWords: ["crust", "mantle", "iron"],
    sentences: [
      "The core is mainly composed of iron and nickel.",
      "The Earth's magnetic field is generated in the core.",
      "The temperature at the core is as hot as the surface of the Sun."
    ]
  },
  "erupt": {
    word: "erupt",
    translation: "爆发",
    partOfSpeech: "verb",
    phonetic: "/ɪˈrʌpt/",
    meaning: "To suddenly burst out or break open, especially of a volcano sending out rocks, ash, lava, etc.",
    example: "The volcano could erupt at any moment.",
    imageUrl: "💥",
    stages: [
      {
        title: "Recognition",
        description: "Learn the meaning and pronunciation",
      },
      {
        title: "Understanding",
        description: "Understand the word in context",
      },
      {
        title: "Practice",
        description: "Practice using the word",
      },
      {
        title: "Mastery",
        description: "Master complex expressions",
      }
    ],
    relatedWords: ["volcano", "lava", "magma"],
    sentences: [
      "The volcano erupted violently last year.",
      "Scientists can predict when some volcanoes might erupt.",
      "When tensions erupt, conflict may follow."
    ]
  },
  "magma": {
    word: "magma",
    translation: "岩浆",
    partOfSpeech: "noun",
    phonetic: "/ˈmæɡ.mə/",
    meaning: "Hot fluid or semi-fluid material below or within the earth's crust from which lava is formed.",
    example: "Magma forms deep within the Earth.",
    imageUrl: "🌡️",
    stages: [
      {
        title: "Recognition",
        description: "Learn the meaning and pronunciation",
      },
      {
        title: "Understanding",
        description: "Understand the word in context",
      },
      {
        title: "Practice",
        description: "Practice using the word",
      },
      {
        title: "Mastery",
        description: "Master complex expressions",
      }
    ],
    relatedWords: ["volcano", "lava", "erupt"],
    sentences: [
      "Magma comes from deep inside the Earth.",
      "When magma reaches the surface, it becomes lava.",
      "The composition of magma affects the type of eruption."
    ]
  },
  "volcano": {
    word: "volcano",
    translation: "火山",
    partOfSpeech: "noun",
    phonetic: "/vɒlˈkeɪnoʊ/",
    meaning: "A mountain or hill with a crater or vent through which lava, rock fragments, hot vapor, and gas are or have been erupted from the earth's crust.",
    example: "Mount Vesuvius is an active volcano.",
    imageUrl: "🌋",
    stages: [
      {
        title: "Recognition",
        description: "Learn the meaning and pronunciation",
      },
      {
        title: "Understanding",
        description: "Understand the word in context",
      },
      {
        title: "Practice",
        description: "Practice using the word",
      },
      {
        title: "Mastery",
        description: "Master complex expressions",
      }
    ],
    relatedWords: ["erupt", "lava", "magma"],
    sentences: [
      "There are over 1,500 active volcanoes worldwide.",
      "The volcano has been dormant for centuries.",
      "Living near an active volcano can be dangerous."
    ],
    mediaExamples: [
      {
        type: "video",
        source: "National Geographic",
        description: "Eruption footage from Kilauea",
        url: "https://example.com/volcano-video"
      },
      {
        type: "audio",
        source: "Volcanic Activity Podcast",
        description: "Episode on Famous Eruptions",
        url: "https://example.com/volcano-podcast"
      }
    ]
  }
};
