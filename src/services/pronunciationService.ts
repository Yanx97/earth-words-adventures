
// A service to handle pronunciation audio using ElevenLabs API
// You'll need to provide your own ElevenLabs API key
// https://docs.elevenlabs.io/api-reference/text-to-speech

interface PronunciationOptions {
  voiceId?: string;
  modelId?: string;
}

// Create a map to track audio playback state
const audioPlaybackMap: Record<string, boolean> = {};

export const pronunciationService = {
  // Using the ElevenLabs API for high quality pronunciation
  async getAudio(word: string, options: PronunciationOptions = {}): Promise<string | null> {
    console.log(`Getting pronunciation for ${word}`);
    
    // For development, simulate audio playback
    // In production, you would make an actual API call to ElevenLabs
    
    // Simulated audio for demonstration purposes
    const simulatedAudio = new Audio();
    simulatedAudio.src = `https://api.dictionaryapi.dev/media/pronunciations/en/${encodeURIComponent(word)}-us.mp3`;
    
    return simulatedAudio.src;
  },
  
  async playAudio(word: string, options: PronunciationOptions = {}): Promise<void> {
    // Check if audio is already playing for this word
    if (audioPlaybackMap[word]) {
      console.log(`Audio already playing for ${word}, skipping`);
      return;
    }
    
    try {
      console.log(`Playing audio for ${word}`);
      audioPlaybackMap[word] = true;
      
      // Free dictionary API has some common words with pronunciation
      const audio = new Audio();
      audio.src = `https://api.dictionaryapi.dev/media/pronunciations/en/${encodeURIComponent(word)}-us.mp3`;
      
      // Add error handling to fallback to browser TTS if the audio file is not found
      audio.onerror = () => {
        console.log(`Using browser TTS fallback for ${word}`);
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(word);
          utterance.lang = 'en-US';
          speechSynthesis.speak(utterance);
        }
        audioPlaybackMap[word] = false;
      };
      
      // Clear playback lock when audio ends
      audio.onended = () => {
        audioPlaybackMap[word] = false;
      };
      
      await audio.play();
    } catch (error) {
      console.error(`Error playing audio for ${word}:`, error);
      
      // Fallback to browser's built-in speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
      }
      
      audioPlaybackMap[word] = false;
    }
  }
};
