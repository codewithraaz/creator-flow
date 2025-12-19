
import { GoogleGenAI, Type } from "@google/genai";
import { VideoIdea, ScriptSection } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateVideoIdeas = async (niche: string, audience: string): Promise<VideoIdea[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 5 viral YouTube video ideas for a channel in the ${niche} niche, targeting ${audience}. Provide specific titles, hooks, and tags.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            hook: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            potential: { type: Type.STRING, enum: ['Viral', 'Niche', 'Search-Focused'] }
          },
          required: ['title', 'description', 'hook', 'tags', 'potential']
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return [];
  }
};

export const generateScriptOutline = async (topic: string): Promise<ScriptSection[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a high-retention script outline for a YouTube video about: ${topic}. Break it down into timed sections with specific content descriptions.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            time: { type: Type.STRING },
            part: { type: Type.STRING },
            content: { type: Type.STRING }
          },
          required: ['time', 'part', 'content']
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    console.error("Failed to parse script response", e);
    return [];
  }
};

export const optimizeMetadata = async (roughTitle: string): Promise<{ titles: string[], description: string, tags: string[] }> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Optimize this YouTube video title for high CTR: "${roughTitle}". Provide 5 better titles, a search-optimized description, and 15 viral tags.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          titles: { type: Type.ARRAY, items: { type: Type.STRING } },
          description: { type: Type.STRING },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['titles', 'description', 'tags']
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse SEO response", e);
    return { titles: [], description: '', tags: [] };
  }
};
