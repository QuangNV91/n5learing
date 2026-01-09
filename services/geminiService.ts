
import { GoogleGenAI, Modality, Type } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

// Fix: Use process.env.API_KEY directly in fresh instances to follow SDK guidelines
export const explainWord = async (word: string, reading: string, meaning: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Giải thích chi tiết về từ vựng N5: "${word}" (${reading}). Nghĩa là "${meaning}". Hãy cho tôi ví dụ và cách dùng.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_PROMPT
    }
  });
  
  return response.text;
};

// Fix: Correct contents structure for image generation and use fresh instance
export const generateVocabImage = async (word: string, meaning: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `A clear, high-quality educational illustration or photo representing the Japanese word "${word}" which means "${meaning}". Cute, simple, and clean style suitable for language learning.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation error:", error);
    return null;
  }
};

// Fix: Use fresh GoogleGenAI instance for suggestions
export const suggestVocabDetails = async (kanji: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Cung cấp thông tin cho từ N5: "${kanji}". Phân loại là 'kanji', 'verb' hoặc 'general'. Gợi ý bài số (lesson) từ 1-25 dựa trên giáo trình Minna no Nihongo. Trả về JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reading: { type: Type.STRING },
          meaning: { type: Type.STRING },
          category: { 
            type: Type.STRING,
            enum: ['kanji', 'verb', 'general']
          },
          lesson: { type: Type.INTEGER }
        },
        required: ["reading", "meaning", "category", "lesson"]
      }
    }
  });
  
  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return null;
  }
};

// Fix: Correct contents structure for TTS and use fresh instance
export const generateTTS = async (text: string): Promise<string | undefined> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: { parts: [{ text: `Say clearly in Japanese: ${text}` }] },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS Error:", error);
    return undefined;
  }
};

// Fix: Manual implementation of base64 decoding for raw PCM audio as per guidelines
export const decodeAudioData = async (
  base64String: string,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> => {
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const dataInt16 = new Int16Array(bytes.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};
