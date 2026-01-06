
import React, { useState } from 'react';
import { Vocabulary } from '../types';
import { Button } from './Button';
import { generateTTS, decodeAudioData } from '../services/geminiService';

interface FlashcardProps {
  vocab: Vocabulary;
  onExplain: (vocab: Vocabulary) => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ vocab, onExplain }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;
    
    setIsPlaying(true);
    const audioData = await generateTTS(vocab.kanji);
    if (audioData) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const buffer = await decodeAudioData(audioData, audioCtx);
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.onended = () => setIsPlaying(false);
      source.start();
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <div 
        className="relative w-full aspect-[4/3] perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-700 preserve-3d shadow-2xl rounded-3xl ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-3xl flex flex-col items-center justify-center p-8 border-2 border-slate-100">
            <span className="text-sm text-slate-400 font-medium uppercase tracking-widest mb-4">Kanji</span>
            <h2 className="text-7xl font-bold text-slate-800 tracking-tight">{vocab.kanji}</h2>
            <div className="mt-12 text-slate-400 group-hover:text-red-500 transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span>Nhấn để lật</span>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-slate-800 rounded-3xl rotate-y-180 flex flex-col items-center justify-center p-8 text-white border-2 border-slate-700">
            <span className="text-sm text-slate-400 font-medium uppercase tracking-widest mb-2">Reading & Meaning</span>
            <h3 className="text-3xl font-bold mb-4">{vocab.reading}</h3>
            <p className="text-2xl text-red-400 font-medium text-center">{vocab.meaning}</p>
            
            <div className="mt-8 flex gap-3">
              <Button onClick={handleSpeak} variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                {isPlaying ? '...' : '🔊 Nghe'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={() => onExplain(vocab)} variant="secondary" className="w-full">
        ✨ AI Giải thích chi tiết
      </Button>
    </div>
  );
};
